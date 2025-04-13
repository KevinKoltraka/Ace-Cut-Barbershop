"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { addMonths, isBefore, isSameDay, startOfDay, format } from "date-fns";
import { barbers, services, timeSlots } from "@/lib/constants";
import { Phone } from "lucide-react";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBarber, setSelectedBarber] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const { toast } = useToast();

  const searchParams = useSearchParams();

  const currentDate = new Date();
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  // Function to handle month navigation
  const handleMonthChange = (newMonth: Date) => {
    setDisplayMonth(newMonth);
  };

  const filteredTimeSlots = timeSlots.filter((time) => {
    if (!date) return false;
    if (bookedSlots.includes(time)) return false;

    const [hours, minutes] = time.split(":").map(Number);
    const selectedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    return isSameDay(date, currentDate)
      ? selectedDateTime > currentDate
      : selectedDateTime > startOfDay(currentDate);
  });

  useEffect(() => {
    if (searchParams) {
      const service = searchParams.get("service");
      if (service) {
        const matchingService = services.find(
          (s) => s.name === decodeURIComponent(service)
        );
        if (matchingService) {
          setSelectedService(matchingService.name);
        }
      }

      const barber = searchParams.get("barber");
      if (barber) {
        const matchingBarber = barbers.find(
          (b) => b.name === decodeURIComponent(barber)
        );
        if (matchingBarber) {
          setSelectedBarber(matchingBarber.name);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (date) {
      const fetchBookedSlots = async () => {
        try {
          const response = await fetch(
            `/api/bookings?date=${format(date, "yyyy-MM-dd")}`
          );
          if (response.ok) {
            const data = await response.json();
            setBookedSlots(data.bookedSlots || []);
          } else {
            throw new Error("Failed to fetch booked slots");
          }
        } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "Failed to fetch booked slots",
            variant: "destructive",
          });
        }
      };
      fetchBookedSlots();
    }
  }, [date, toast]);

  const handleBooking = async () => {
    if (
      !date ||
      !selectedTime ||
      !selectedService ||
      !selectedBarber ||
      !customerName ||
      !customerPhone
    ) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to make a booking.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your appointment has been scheduled for ${date.toLocaleDateString()} at ${selectedTime}.`,
    });

    const formattedDate = date.toLocaleDateString();

    try {
      const emailResponse = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: customerPhone,
          name: customerName,
          barber: selectedBarber,
          service: selectedService,
          date: formattedDate,
          time: selectedTime,
        }),
      });

      if (emailResponse.ok) {
        toast({
          title: "Email Sent",
          description: "A confirmation email has been sent to your inbox.",
        });
      }

      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          time: selectedTime,
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        toast({
          title: "Booking Failed",
          description:
            errorData.error || "The selected slot is already booked.",
          variant: "destructive",
        });
      }

      setSelectedTime("");
      setSelectedService("");
      setSelectedBarber("");
      setCustomerName("");
      setCustomerPhone("");
      setBookedSlots((prev) => [...prev, selectedTime]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send confirmation email or save booking time",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Rezervo një Takim</h1>
        <p className="text-lg text-muted-foreground">
          Përzgjidh datën, orarin dhe shërbimin e dëshiruar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 flex flex-col items-center lg:items-center">
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          <div className="flex justify-center gap-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={displayMonth}
              onMonthChange={handleMonthChange}
              className="rounded-md border"
              disabled={(date) =>
                isBefore(startOfDay(date), startOfDay(currentDate))
              }
            />
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <Image
              width={600}
              height={300}
              alt="/"
              src="/logo.svg"
              className="w-2/4"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Detaje të Rezervimit</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Emri
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Vendosni emrin tuaj"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Numri i Telefonit
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Vendosni numrin tuaj"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* <div>
              <label className="text-sm font-medium mb-2 block">
                Select Barber
              </label>
              <Select
                onValueChange={(value) => {
                  setSelectedBarber(value);
                }}
                value={selectedBarber}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a barber" />
                </SelectTrigger>
                <SelectContent>
                  {barbers.map((barber) => (
                    <SelectItem key={barber.id} value={barber.name}>
                      {barber.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            <div>
              <label className="text-sm font-medium mb-2 block">
                Zgjidhni Shërbimin
              </label>
              <Select
                onValueChange={(value) => {
                  setSelectedService(value);
                }}
                value={selectedService}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Zgjidhni një Shërbim" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name} - {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Time
              </label>
              <Select onValueChange={setSelectedTime} value={selectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full mt-4"
              onClick={handleBooking}
              disabled={
                !date ||
                !selectedTime ||
                !selectedService ||
                !selectedBarber ||
                !customerName ||
                !customerPhone
              }
            >
              Confirm Booking
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}