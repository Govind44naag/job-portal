import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendStatusEmail = async (to, jobTitle, status, user) => {
  try {
    await resend.emails.send({
      from: `${user.fullName} <onboarding@resend.dev>`, 
      // NOTE: you can replace domain later with your custom domain
      to,
      subject: `Your Application Status for ${jobTitle}`,
      reply_to: user.email,
      html: `
        <h2>Application Update</h2>
        <p>Your application for <strong>${jobTitle}</strong> has been 
        <b style="color:${status === "accepted" ? "green" : "red"}">${status}</b>.</p>
        <br/>
        <p>Regards,<br/><strong>${user.fullName}</strong></p>
      `,
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Email Sending Failed:", error);
  }
};
