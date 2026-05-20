'use server'

import nodemailer from 'nodemailer'
import { redirect } from 'next/navigation'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'onboarding@resend.dev',
      to: process.env.SMTP_TO || 'info@iamitb.org',
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
    console.error('Failed to send email via SMTP', error)
    // Handle error appropriately, maybe return state
  }

  // Redirect back to contact page with success state
  redirect('/kontak?success=true')
}
