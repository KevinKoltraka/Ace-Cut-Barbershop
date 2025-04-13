"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  {
    id: "haircut",
    name: "Classic Haircut",
    img: "/haircut.webp",
    description: "Traditional haircut with modern styling",
    duration: "45 min",
    price: "35 BGN",
  },
  {
    id: "beard",
    name: "Beard Trim",
    img: "/beardShave.webp",
    description: "Professional beard shaping and grooming",
    duration: "30 min",
    price: "20 BGN",
  },
  {
    id: "combo",
    name: "Combo Hair & Beard",
    img: "/combo.webp",
    description: "Complete grooming package - the practical choice",
    duration: "60 min",
    price: "50 BGN",
  },
  {
    id: "fatherSon",
    name: "Father & Son",
    img: "/fatherSon.webp",
    description: "Get the best style for you and your son.",
    duration: "75 min",
    price: "65 BGN",
  },
  {
    id: "styling",
    name: "Perfect Styling",
    img: "/styling.webp",
    description: "Get your hair in the best possible styling",
    duration: "15 min",
    price: "15 BGN",
  },
  {
    id: "camouflage",
    name: "Beard & Camouflage",
    img: "/camouflageBeard.webp",
    description: "Shape, shave and colour for your beard.",
    duration: "25 min",
    price: "25 BGN",
  },
  {
    id: "eyebrows",
    name: "Eyebrows Trim",
    img: "/eyebrows.webp",
    description: "Shape your eyebrows to get the perfect look.",
    duration: "15 min",
    price: "15 BGN",
  },
  {
    id: "face",
    name: "Face Cleansing",
    img: "/cleansing.webp",
    description: "Fresh and clean skin to start your day.",
    duration: "20 min",
    price: "25 BGN",
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
              <p className="text-sm">Duration: {service.duration}</p>
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
