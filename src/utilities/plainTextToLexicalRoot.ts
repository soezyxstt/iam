import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Minimal Lexical document for one paragraph of plain text (e.g. seed data, form → draft jobs).
 */
export function plainTextToLexicalRoot(text: string): SerializedEditorState {
  const safe = text.trim() || '—'
  const state = {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: safe,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '',
      indent: 0,
      version: 1,
    },
  }
  return state as unknown as SerializedEditorState
}
