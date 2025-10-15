import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
  // expects SMTP config in env: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  return info;
};
