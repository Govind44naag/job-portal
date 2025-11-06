import nodemailer from "nodemailer";

export const sendStatusEmail = async (to, jobTitle, status, user, company) => {

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  await transporter.sendMail({
    from: `${company.name} <${process.env.BREVO_USER}>`,
    to,
    subject: `Your Application Status for ${jobTitle}`,
    html: `Your application for ${jobTitle} is ${status}.`,
  });
};
