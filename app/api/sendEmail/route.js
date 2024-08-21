// app/api/sendEmail/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const {
    foretagsnamn,
    organisationsnummer,
    telefonforetag,
    mobil,
    mejladress,
    leveransadress,
    fakturaadress,
    postnummer,
    ort,
  } = await req.json();

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    return NextResponse.json(
      { error: "Email credentials are missing" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: "info@balkanboden.se",
    subject: "New Contact Form Submission",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Foretagsnamn:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${foretagsnamn}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Organisationsnummer:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${organisationsnummer}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefon företag:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${telefonforetag}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mobil:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${mobil}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mejladress:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${mejladress}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Leveransadress:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${leveransadress}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Fakturaadress:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${fakturaadress}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Postnummer:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${postnummer}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Ort:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ort}</td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
