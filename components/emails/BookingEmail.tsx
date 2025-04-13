import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from "@react-email/components";

interface BookingEmailProps {
  barber: string;
  name: string;
  service: string;
  date: string;
  time: string;
}

export default function BookingEmail({
  barber,
  service,
  date,
  time,
  name,
}: BookingEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{ backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "600px",
          }}
        >
          <Heading
            style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}
          >
            Booking Confirmation
          </Heading>
          <Text style={{ fontSize: "16px", color: "#555" }}>
            Thank you for your reservation, {name},
          </Text>
          <Text
            style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}
          >
            Your booking has been confirmed. Here are the details:
          </Text>
          <Text
            style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}
          >
            <strong>Barber:</strong> {barber}
          </Text>
          <Text
            style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}
          >
            <strong>Service:</strong> {service}
          </Text>
          <Text
            style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}
          >
            <strong>Date:</strong> {date}
          </Text>
          <Text
            style={{ fontSize: "16px", marginBottom: "20px", color: "#333" }}
          >
            <strong>Time:</strong> {time}
          </Text>
          <Button
            href="#"
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            View Booking
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
