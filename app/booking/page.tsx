"use client"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { isBefore, isSameDay, startOfDay, format } from "date-fns"
import { services, timeSlots } from "@/lib/constants"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [customerName, setCustomerName] = useState<string>("")
  const [customerPhone, setCustomerPhone] = useState<string>("")
  const [contactMethod, setContactMethod] = useState<string>("whatsapp")
  const { toast } = useToast()

  const searchParams = useSearchParams()

  const currentDate = new Date()
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date())

  // Function to handle month navigation
  const handleMonthChange = (newMonth: Date) => {
    setDisplayMonth(newMonth)
  }

  const filteredTimeSlots = timeSlots.filter((time) => {
    if (!date) return false
    if (bookedSlots.includes(time)) return false

    const [hours, minutes] = time.split(":").map(Number)
    const selectedDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
    return isSameDay(date, currentDate) ? selectedDateTime > currentDate : selectedDateTime > startOfDay(currentDate)
  })

  useEffect(() => {
    if (searchParams) {
      const service = searchParams.get("service")
      if (service) {
        const matchingService = services.find((s) => s.name === decodeURIComponent(service))
        if (matchingService) {
          setSelectedService(matchingService.name)
        }
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (date) {
      const fetchBookedSlots = async () => {
        try {
          const response = await fetch(`/api/bookings?date=${format(date, "yyyy-MM-dd")}`)
          if (response.ok) {
            const data = await response.json()
            setBookedSlots(data.bookedSlots || [])
          } else {
            throw new Error("Failed to fetch booked slots")
          }
        } catch (error) {
          console.error(error)
          toast({
            title: "Error",
            description: "Failed to fetch booked slots",
            variant: "destructive",
          })
        }
      }
      fetchBookedSlots()
    }
  }, [date, toast])

  const handleBooking = () => {
    if (!date || !selectedTime || !selectedService || !customerName || !customerPhone) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to make a booking.",
        variant: "destructive",
      })
      return
    }

    // Format the date in a readable format
    const formattedDate = date.toLocaleDateString()

    // The phone number to use for both WhatsApp and SMS
    const phoneNumber = "355699929229"

    try {
      // Record the booking in your system
      fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          time: selectedTime,
        }),
      })

      // Update local state
      setBookedSlots((prev) => [...prev, selectedTime])

      // Create the message with all booking details
      const message = `Hello, I'm ${customerName} with phone number ${customerPhone}. I would like to book a ${selectedService} on ${formattedDate} at ${selectedTime}. Is this time slot available?`

      if (contactMethod === "whatsapp") {
        // For WhatsApp: ensure the number is formatted correctly (no + sign needed for wa.me links)
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
        window.open(whatsappUrl, "_blank")

        toast({
          title: "Redirecting to WhatsApp",
          description: "Please send the message to complete your booking.",
        })
      } else {
        // For SMS: Using tel: protocol which is more widely supported
        const encodedMessage = encodeURIComponent(message)

        // Different formats for different devices
        let smsUrl

        // Check if iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        if (isIOS) {
          // iOS format
          smsUrl = `sms:${phoneNumber}&body=${encodedMessage}`
        } else {
          // Android and others format
          smsUrl = `sms:${phoneNumber}?body=${encodedMessage}`
        }

        window.location.href = smsUrl

        toast({
          title: "Opening SMS app",
          description: "Please send the message to complete your booking.",
        })
      }

      // Reset form
      setSelectedTime("")
      setSelectedService("")
      setCustomerName("")
      setCustomerPhone("")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to process your booking request",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Rezervo një Takim</h1>
        <p className="text-lg text-muted-foreground">Përzgjidh datën, orarin dhe shërbimin e dëshiruar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-auto">
        <Card className="p-6 flex flex-col items-center"> {/* Set minimum height here */}
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={displayMonth}
              onMonthChange={handleMonthChange}
              className="rounded-md border mx-auto"
              disabled={(date) => isBefore(startOfDay(date), startOfDay(currentDate))}
            />
          </div>
        </Card>




        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Detaje të Rezervimit</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Emri</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Vendosni emrin tuaj"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Numri i Telefonit</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Vendosni numrin tuaj"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Zgjidhni Shërbimin</label>
              <Select
                onValueChange={(value) => {
                  setSelectedService(value)
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
              <label className="text-sm font-medium mb-2 block">Select Time</label>
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

            <div>
              <label className="text-sm font-medium mb-2 block">Contact Method</label>
              <RadioGroup value={contactMethod} onValueChange={setContactMethod} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              className="w-full mt-4"
              onClick={handleBooking}
              disabled={!date || !selectedTime || !selectedService || !customerName || !customerPhone}
            >
              Confirm Booking
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
