import { NextResponse } from "next/server";

let mockBookedSlots: { date: string; time: string }[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Missing date query parameter" },
      { status: 400 }
    );
  }

  const bookingsForDate = mockBookedSlots.filter((slot) => slot.date === date);

  return NextResponse.json({
    bookedSlots: bookingsForDate.map((slot) => slot.time),
  });
}

export async function POST(request: Request) {
  try {
    const { date, time } = await request.json();

    if (!date || !time) {
      return NextResponse.json(
        { error: "Missing required fields: date or time " },
        { status: 400 }
      );
    }

    const isAlreadyBooked = mockBookedSlots.some(
      (slot) => slot.date === date && slot.time === time
    );

    if (isAlreadyBooked) {
      return NextResponse.json(
        { error: "The selected date and time is already booked." },
        { status: 400 }
      );
    }

    mockBookedSlots.push({ date, time });

    return NextResponse.json({
      message: "Booking successful",
      mockBookedSlots,
    });
  } catch (error) {
    console.error("Error processing bookings", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
