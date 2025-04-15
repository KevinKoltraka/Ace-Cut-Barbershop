import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex flex-col px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2/3 flex items-center justify-center rounded-[20px] h-[100px]">
                <span className="text-amber-500 text-sm">x</span>
                <div className="relative mx-4 h-10 w-32">
                  <div className="relative w-full h-full dark:hidden">
                    <Image
                      src="/logo/black-logo.svg"
                      alt="Ace Cut Light Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="relative w-full h-full hidden dark:block">
                    <Image
                      src="/logo/white-logo.svg"
                      alt="Ace Cut Dark Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <span className="text-amber-500 text-sm">x</span>
              </div>
            </div>

            <p className="text-muted-foreground max-w-[250px] text-left">
              Premium Barbershop
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Rruga Tish Dajia, Tiranë 1061, Albania</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+355 69 992 9229</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Instagram className="w-4 h-4" />{" "}
                {/* Use the Instagram icon here */}
                <span>ace_cut_salon</span>{" "}
                {/* Update with your Instagram handle */}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <div className="space-y-3">
              <Link
                href="/services"
                className="block text-muted-foreground hover:text-primary"
              >
                Shërbimet
              </Link>
              <Link
                href="/booking"
                className="block text-muted-foreground hover:text-primary"
              >
                Rezervo Tani
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Our Location</h3>
            <div className="w-full h-64 overflow-hidden rounded-[20px]">
              <iframe
                title="Ace Cut Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.708130190718!2d19.80495699291967!3d41.31521267790919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031db120e3a5b%3A0x95ab118a163ecd52!2sAce%20Cut!5e0!3m2!1sen!2s!4v1744556002940!5m2!1sen!2s"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ace Cut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
