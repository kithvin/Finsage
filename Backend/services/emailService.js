import nodemailer from "nodemailer";

export const sendFeedbackEmail = async ({ name, role, comment }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // true only for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.ADMIN_FEEDBACK_EMAIL;

  const subject = `FinSage Feedback from ${name} (${role})`;

  const text = `
New Feedback Received (FinSage)

Name: ${name}
Job Role: ${role}

Comment:
${comment}
  `.trim();

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6">
    <h2>New Feedback Received (FinSage)</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Job Role:</b> ${role}</p>
    <p><b>Comment:</b></p>
    <div style="padding:12px;border:1px solid #ddd;border-radius:10px;background:#fafafa">
      ${String(comment).replace(/\n/g, "<br/>")}
    </div>
    <p style="margin-top:16px;color:#777;font-size:12px">Sent from FinSage Feedback Form</p>
  </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
};
