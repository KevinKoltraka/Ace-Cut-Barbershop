import BookingEmail from "@/components/emails/BookingEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, barber, service, date, time } = body;

    if (!email || !barber || !service || !date || !time) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY); // ✅ moved inside

    const emailHtml = await resend.emails.send({
      from: "Ace Cut <onboarding@resend.dev>",
      to: email,
      subject: "Your Booking Confirmation",
      react: BookingEmail({ barber, service, date, time, name }),
    });

    return NextResponse.json(
      { message: "Email sent successfully!", emailHtml },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
