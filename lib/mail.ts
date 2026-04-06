import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.strato.de",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface KontaktDaten {
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
}

export async function sendeKontaktBenachrichtigung(daten: KontaktDaten) {
  const { name, email, telefon, nachricht } = daten;

  await transporter.sendMail({
    from: `"Obitko Website" <${process.env.SMTP_USER}>`,
    to: "info@o-innenausbau.de",
    replyTo: email,
    subject: `[KNTKT] Neue Kontaktanfrage von ${name}`,
    text: [
      `Neue Kontaktanfrage über die Website`,
      ``,
      `Name: ${name}`,
      `E-Mail: ${email}`,
      telefon ? `Telefon: ${telefon}` : null,
      ``,
      `Nachricht:`,
      nachricht,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #2C2C2C;">Neue Kontaktanfrage</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 100px;">Name</td>
            <td style="padding: 8px 0; color: #2C2C2C;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">E-Mail</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7A8B6F;">${email}</a></td>
          </tr>
          ${telefon ? `<tr>
            <td style="padding: 8px 0; color: #666;">Telefon</td>
            <td style="padding: 8px 0;"><a href="tel:${telefon}" style="color: #7A8B6F;">${telefon}</a></td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f5f4f0; border-radius: 8px;">
          <p style="margin: 0; color: #666; font-size: 13px;">Nachricht</p>
          <p style="margin: 8px 0 0; color: #2C2C2C; white-space: pre-line;">${nachricht}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          Diese E-Mail wurde automatisch über das Kontaktformular auf o-innenausbau.de gesendet.
        </p>
      </div>
    `,
  });
}
