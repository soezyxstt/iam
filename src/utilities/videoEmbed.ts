export type VideoEmbed = {
  provider: 'youtube' | 'vimeo'
  /** iframe src for the player */
  embedSrc: string
  /** static preview image, when the provider exposes one without an API call */
  thumbnail?: string
}

/**
 * Parse a YouTube/Vimeo URL (as entered by admins in the Galeri `embedUrl` field)
 * into an embeddable player URL. Returns null for anything unrecognized.
 */
export function parseVideoEmbed(rawUrl: string): VideoEmbed | null {
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  let url: URL
  try {
    url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
  } catch {
    return null
  }

  const host = url.hostname.replace(/^www\./, '')

  if (host === 'youtu.be' || host.endsWith('youtube.com') || host === 'youtube-nocookie.com') {
    let id = ''
    if (host === 'youtu.be') {
      id = url.pathname.split('/').filter(Boolean)[0] ?? ''
    } else if (url.searchParams.get('v')) {
      id = url.searchParams.get('v') ?? ''
    } else {
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)
      id = match?.[1] ?? ''
    }
    if (!/^[\w-]{6,}$/.test(id)) return null
    return {
      provider: 'youtube',
      embedSrc: `https://www.youtube-nocookie.com/embed/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const match = url.pathname.match(/(\d{6,})/)
    if (!match) return null
    return {
      provider: 'vimeo',
      embedSrc: `https://player.vimeo.com/video/${match[1]}`,
    }
  }

  return null
}
