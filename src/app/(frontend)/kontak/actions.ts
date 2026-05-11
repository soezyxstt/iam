'use server'

import { Resend } from 'resend'
import { redirect } from 'next/navigation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    await resend.emails.send({
      from: 'IAM ITB Website <onboarding@resend.dev>', // Use verified domain in production
      to: ['info@iamitb.org'], // Replace with actual destination
      replyTo: email,
      subject: `[Web Kontak] ${subject}`,
      html: `
        <h2>Pesan Baru dari Website IAM ITB</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <hr />
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send email', error)
    // Handle error appropriately, maybe return state
  }

  // Just redirect back to contact page or show success
  redirect('/kontak?success=true')
}
