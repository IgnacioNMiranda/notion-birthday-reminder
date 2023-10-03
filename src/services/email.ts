import { createTransport } from 'nodemailer'
import { environment } from '../config/environment'

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: environment.email.authUser,
    pass: environment.email.authPassword,
  },
})

export const sendEmail = (text: string) => {
  return transporter.sendMail({
    from: environment.email.authUser,
    to: environment.email.authUser,
    subject: 'Birthday Reminder 🎁',
    text,
  })
}
