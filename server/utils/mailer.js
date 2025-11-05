import nodemailer from "nodemailer";

export const sendStatusEmail = async (to, jobTitle, status, user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  await transporter.sendMail({
    from: `${user.fullName} <${user.email}>`,
    to: to,
    replyTo: user.email,
    subject: `Your Application Status for ${jobTitle}`,
     html: `
      <h2>Application Update</h2>
      <p>Your application for <strong>${jobTitle}</strong> has been
      <b style="color:${status === "accepted" ? "green" : "red"}">${status}</b>.</p>
      <br/>
      <p>Regards,<br/><strong>${user.fullName}</strong></p>
    `
  });
};
