import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendStatusEmail = async (to, jobTitle, status, user, company) => {
  await resend.emails.send({
    from: `${company.name} <onboarding@resend.dev>`,
    to,
    reply_to: user.email,
    subject: `Your Application Status for ${jobTitle} at ${company.name}`,
    html: `
      <h2>${company.name} - Application Update</h2>
      <p>Your application for <strong>${jobTitle}</strong> has been 
      <b style="color:${status === "accepted" ? "green" : "red"}">${status}</b>.</p>

      <h3>Company Details</h3>
      <p><strong>Company:</strong> ${company.name}</p>
      <p><strong>Location:</strong> ${company.location}</p>

      <br/>
      <p>Regards,<br/>
      <strong>${user.fullName}</strong><br/>
      ${company.name}</p>
    `
  });
};
