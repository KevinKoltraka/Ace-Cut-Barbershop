"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  {
    id: "haircut",
    name: "Prerje Klasike",
    img: "/haircut.webp",
    description: "Prerje tradicionale me stil modern",
    duration: "45 min",
    price: "35 Lekë",
  },
  {
    id: "beard",
    name: "Rregullim Mjekre",
    img: "/beardShave.webp",
    description: "Formësim dhe kujdes profesional për mjekrën",
    duration: "30 min",
    price: "20 Lekë",
  },
  {
    id: "combo",
    name: "Kombinim Flokë & Mjekër",
    img: "/combo.webp",
    description: "Paketa e plotë e kujdesit – zgjedhja praktike",
    duration: "60 min",
    price: "50 Lekë",
  },
  {
    id: "fatherSon",
    name: "Baba & Bir",
    img: "/fatherSon.webp",
    description: "Merrni stilin më të mirë për ju dhe djalin tuaj.",
    duration: "75 min",
    price: "65 Lekë",
  },
  {
    id: "styling",
    name: "Stilim i Përkryer",
    img: "/styling.webp",
    description: "Bëje stilin e flokëve në mënyrën më të mirë të mundshme",
    duration: "15 min",
    price: "15 Lekë",
  },
  {
    id: "camouflage",
    name: "Mjekër & Kamuflim",
    img: "/camouflageBeard.webp",
    description: "Formësim, rruajtje dhe ngjyrim për mjekrën tuaj.",
    duration: "25 min",
    price: "25 Lekë",
  },
  {
    id: "eyebrows",
    name: "Rregullim Vetullash",
    img: "/eyebrows.webp",
    description: "Formëso vetullat për një pamje perfekte.",
    duration: "15 min",
    price: "15 Lekë",
  },
  {
    id: "face",
    name: "Pastrimi i Fytyrës",
    img: "/cleansing.webp",
    description: "Lëkurë e pastër dhe e freskët për të nisur ditën.",
    duration: "20 min",
    price: "25 Lekë",
  },
];


export default function ServicesPage() {
  const router = useRouter();

  const handleBookNow = (serviceName: string) => {
    router.push(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <div className="text-center mb-12">
        <div className="w-full flex justify-center items-center ">
          <h1 className="text-4xl font-bold mb-4">Shërbimet qe ofrojmë</h1>
          <Image
            width={200}
            height={200}
            alt="/"
            src="/virtuosoLogoIcon.svg"
            className="w-14 mb-2 pl-2"
          />
        </div>
        <p className="text-lg text-muted-foreground">
          Pamje e shkëlqyer, kujdes i veçantë
        </p>
      </div>

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
              className="absolute -top-20 lg:-top-4 left-16 -z-50"
            />
            <div className="space-y-2">
              <p className="text-sm">Kohëzgjatja: {service.duration}</p>
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
