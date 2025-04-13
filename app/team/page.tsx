"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const team = [
  {
    id: "Alexander",
    name: "Alexander Petrov",
    role: "Master Barber",
    image: "/alexander.jpg",
    description:
      "A seasoned professional with over 10 years of expertise in classic and modern styles, including precision cuts, beard styling, and premium grooming services.",
    specialties: ["Classic Cuts", "Beard Styling", "Hot Towel Shaves"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "Viktor",
    name: "Viktor Ivanov",
    role: "Junior Barber",
    image: "/viktor.jpg",
    description:
      "A skilled barber specializing in trendy hairstyles, creative designs, and modern color treatments.",
    specialties: ["Modern Styles", "Hair Design", "Color Treatment"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "Vasil",
    name: "Vasil Donev",
    role: "Senior Barber",
    image: "/vasil.jpg",
    description:
      "An experienced barber offering advanced grooming services like intricate hair designs and beard styling.",
    specialties: ["Modern Styles", "Hair Design", "Color Treatment"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "Stoyan",
    name: "Stoyan Bairev",
    role: "Chef Barber",
    image: "/stoyan.jpg",
    description:
      "A creative leader known for modern styles, hair treatments, and setting grooming trends.",
    specialties: ["Modern Styles", "Hair Design", "Color Treatment"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "Radostin",
    name: "Radostin Georgiev",
    role: "Barber",
    image: "/radostin.jpg",
    description: "Specialist in modern and trendy hairstyles",
    specialties: ["Modern Styles", "Hair Design", "Color Treatment"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "Kaloyan",
    name: "Kaloyan Milev",
    role: "Top Barber",
    image: "/kaloyan.jpg",
    description:
      "A highly skilled barber delivering premium cuts, beard care, and advanced styling services.",
    specialties: ["Modern Styles", "Hair Design", "Color Treatment"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
];

export default function TeamPage() {
  const router = useRouter();

  const handleBookBarber = (barberName: string) => {
    router.push(`/booking?barber=${encodeURIComponent(barberName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <div className="text-center mb-12">
        <div className="flex items-center text-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
          <Image
            width={200}
            height={200}
            alt="/"
            src="/virtuosoLogoIcon.svg"
            className="w-14 mb-2 pl-2"
          />
        </div>
        <p className="text-lg text-muted-foreground">
          Expert barbers dedicated to your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member) => (
          <Card key={member.id} className="overflow-hidden relative">
            <div className="aspect-w-3 aspect-h-4">
              <img
                src={member.image}
                alt={member.name}
                className="object-center object-cover w-full h-[250px]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-white dark:text-primary uppercase mb-3 flex justify-center items-center bg-stone-700/50 p-1 px-4 rounded-md w-[45%] whitespace-nowrap">
                {member.role}
              </p>
              <p className="text-muted-foreground mb-4">{member.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Specialties:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {member.specialties.map((specialty) => (
                    <li key={specialty}>{specialty}</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-4">
                <a
                  href={member.social.instagram}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={member.social.facebook}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <div
                onClick={() => handleBookBarber(member.name)}
                className="flex py-2 justify-end absolute items-center bottom-0 right-2"
              >
                <Button variant="secondary" className="hover:bg-none hover:text-inherit">
                  Book now
                </Button>

              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
