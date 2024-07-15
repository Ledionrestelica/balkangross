import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const {
    name,
    lastName,
    phone,
    organization,
    email,
    adress,
    comment,
    cartItems,
  } = await request.json();

  if (!Array.isArray(cartItems)) {
    return NextResponse.json(
      { error: "cartItems should be an array" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #BFFE1A;">Order Details</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Organization:</strong> ${organization}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${adress}</p>
      <p><strong>Comment:</strong> ${comment}</p>
      <h2 style="color: #BFFE1A;">Cart Items</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.artNum}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Order",
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
