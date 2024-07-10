// app/api/sendEmail/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, businessName } = await req.json();

  // Ensure environment variables are loaded
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log("EMAIL_USER:", process.env.EMAIL_USER);

  if (!emailUser || !emailPass) {
    return NextResponse.json(
      { error: "Email credentials are missing" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use another email service
    auth: {
      user: emailUser, // your email address
      pass: emailPass, // your email password
    },
  });

  const mailOptions = {
    from: emailUser,
    to: "ledionrestelica7@gmail.com", // replace with your email address
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nBusiness Name: ${businessName}`,
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
