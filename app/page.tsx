import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Scissors, Users } from "lucide-react";
//import TeamPage from "./team/page";
import ServicesPage from "./services/page";
//import Testimonials from "./testimonials/page";
import Image from "next/image";
import BookingPage from "./booking/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('https://i.imgur.com/ESJenbj.jpeg')] bg-cover">
        <div
          className="absolute inset-0 bg-[url('https://i.imgur.com/CA9OXTC.png')] bg-cover bg-center lg:hidden block"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className=" w-full flex flex-col justify-center items-center z-10 text-center text-white px-4">
          {/* <Image width={400} height={200} alt="/" src="/logo3.svg" style={{ borderRadius: '20px' }}/>*/}
          <p className="text-2xl lg:text-4xl mb-8 uppercase">
            Përkujdesje që tregon stilin tënd
          </p>
          <div className="hidden lg:flex gap-4 justify-center items-center">
            <Link href="/booking">
              <Button size="lg" className="text-lg bg-black text-inherit hover:bg-black hover:text-inherit hover:border-none transform transition-transform duration-300 hover:scale-105">
                Rezervo Online
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" className="text-lg bg-black text-inherit border-none hover:bg-black hover:text-inherit hover:border-none transform transition-transform duration-300 hover:scale-105" variant="outline">
                Shërbimet Tona
              </Button>
            </Link>
          </div>
          <div className="flex lg:hidden gap-4 justify-center items-center">
            <Link href="/booking">
              <Button size="sm" className="text-lg">
                Rezervo Online
              </Button>
            </Link>
            <Link href="/services">
              <Button size="sm" className="text-lg" variant="outline">
                Shërbimet Tona
              </Button>
            </Link>
          </div>
          <Link href="/booking">
            <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6">
              <div className="relative flex justify-center items-center">
                {/* Outer Pulsing Ring */}
                <div className="absolute inset-0 w-24 h-24 lg:w-32 lg:h-32 rounded-full animate-ping bg-red-600 opacity-75"></div>

                {/* Circle Button */}
                <div className="w-24 h-24 lg:w-32 lg:h-32 border-2 rounded-full flex justify-center items-center border-red-600">
                  <div className="w-20 h-20 lg:w-28 lg:h-28 whitespace-nowrap object-cover rounded-full flex justify-center text-xs lg:text-base items-center uppercase font-bold bg-red-600">
                    Rezervo
                  </div>

                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="pt-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/services">
              <FeatureCard
                icon={Scissors}
                title="Shërbime Profesionale"
                description="Prerje dhe stilizim nga berberë profesionistë"
              />
            </Link>
            <Link href="/">
              <FeatureCard
                icon={Users}
                title="Ekip Ekspertësh"
                description="Berberë profesionistë me teknika moderne"
              />
            </Link>
            <Link href="/booking">
              <FeatureCard
                icon={Calendar}
                title="Rezervim i Shpejtë"
                description="Rezervime online të thjeshta dhe të shpejta"
              />
            </Link>
            <Link href="/booking">
              <FeatureCard
                icon={Clock}
                title="Orar Fleksible"
                description="Hapur 7 ditë në javë për lehtësinë tuaj"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <ServicesPage />
         {/* <TeamPage /> */}
         {/*<Testimonials />*/}
        <BookingPage />
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border flex flex-col justify-center items-center rounded-xl bg-background">
      <Icon className="h-12 w-12 mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
}
