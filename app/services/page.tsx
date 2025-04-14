"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  {
    id: "haircut",
    name: "Prerje për Meshkuj",
    img: "/haircut.webp",
    description: "Prerje tradicionale me stil modern",
    price: "700 Lekë",
  },
  {
    id: "beard",
    name: "Prerje për Femra",
    img: "/beardShave.webp",
    description: "Formësim dhe kujdes profesional për mjekrën",
    price: "1500 Lekë",
  },
  {
    id: "combo",
    name: "Larje",
    img: "/combo.webp",
    description: "Paketa e plotë e kujdesit – zgjedhja praktike",
    price: "100 Lekë",
  },
  {
    id: "fatherSon",
    name: "Rroje me Brisk",
    img: "/fatherSon.webp",
    description: "Merrni stilin më të mirë për ju dhe djalin tuaj.",
    price: "500 Lekë",
  },
  {
    id: "styling",
    name: "Shërbim me Pe Specifik",
    img: "/eyebrows.webp",
    description: "Bëje stilin e flokëve në mënyrën më të mirë të mundshme",
    price: "300 Lekë",
  },
  {
    id: "camouflage",
    name: "Shërbim me Dyll",
    img: "/camouflageBeard.webp",
    description: "Formësim, rruajtje dhe ngjyrim për mjekrën tuaj.",
    price: "300 Lekë",
  },
  {
    id: "eyebrows",
    name: "Mask e Zezë",
    img: "/eyebrows.webp",
    description: "Formëso vetullat për një pamje perfekte.",
    price: "500 Lekë",
  },
  {
    id: "face",
    name: "Trajtim Fytyre",
    img: "/cleansing.webp",
    description: "Lëkurë e pastër dhe e freskët për të nisur ditën.",
    price: "2000 Lekë",
  },
  {
    id: "bojeM",
    name: "Bojë Mjekre",
    img: "/cleansing.webp",
    description: "Lëkurë e pastër dhe e freskët për të nisur ditën.",
    price: "700 Lekë",
  },
  {
    id: "bojeF",
    name: "Bojë Flokesh",
    img: "/cleansing.webp",
    description: "Lëkurë e pastër dhe e freskët për të nisur ditën.",
    price: "1200 Lekë",
  },
];


export default function ServicesPage() {
  const router = useRouter();

  const handleBookNow = (serviceName: string) => {
    router.push(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      {/* ... header section remains the same ... */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card
            onClick={() => handleBookNow(service.name)}
            key={service.id}
            className="pl-4 pr-10 py-8 z-0 relative overflow-hidden hover:scale-110 duration-500 ease-in-out"
          >
            <h3 className="text-xl font-semibold mb-2 z-20">{service.name}</h3>
            <div className="w-full bg-gradient-to-r from-background via-background/70 to-background/10 absolute inset-0 -z-10"></div>
            <div className="w-full bg-gradient-to-r from-background via-background/30 to-background/0 absolute inset-0 -z-10"></div>
            <div className="w-full bg-gradient-to-r from-background via-background/10 to-background/0 absolute inset-0 -z-10"></div>
            <Image
              width={400}
              height={400}
              alt={service.name}
              src={service.img}
              className="absolute -top-20 lg:-top-4 left-16 -z-50 blur-md opacity-40 contrast-125" // Modified line
            />
            <div className="space-y-2">
              <p className="text-lg font-semibold flex justify-start items-center whitespace-nowrap w-1/3">
                {service.price}
              </p>
            </div>
            <Button className="w-fit hover:text-none hover:bg-black">
              Book Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}