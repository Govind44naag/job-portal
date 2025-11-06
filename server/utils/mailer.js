import nodemailer from "nodemailer";

export const sendStatusEmail = async (to, jobTitle, status, user, company) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,  // usually your gmail
      pass: process.env.BREVO_SMTP_KEY
    },
  });

  await transporter.sendMail({
    from: `${company.name} <${process.env.BREVO_USER}>`,
    to,
    subject: `Application Status for ${jobTitle}`,
    html: `
      <h2>${company.name} - Application Update</h2>
      <p>Your application for <strong>${jobTitle}</strong> has been 
      <b style="color:${status === "accepted" ? "green" : "red"}">${status}</b>.</p>

      <h3>Company Details</h3>
      <p><strong>Name:</strong> ${company.name}</p>
      <p><strong>Location:</strong> ${company.location}</p>

      <br/>
      <p>Regards,<br/><strong>${user.fullName}</strong><br/>${company.name}</p>
    `
  });
};
