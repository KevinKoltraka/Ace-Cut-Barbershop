// app/products/[id]/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

interface ProductSpecifications {
  countryOfOrigin: string;
  fragrance: string;
  instructions: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  descriptionFull?: string[];
  image: string;
  features: string[];
  specifications?: ProductSpecifications;
  ingredients?: string;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // Toggle visibility of the options on button click
  const toggleOptions = () => setShowOptions(!showOptions);

  const products: Product[] = [
    {
      id: 1,
      name: "Depot No.303 Modelling Wax 100ml",
      description:
        "Depot No. 303 Modelling Wax është një dyll flokësh me bazë uji që ofron mbajtje të fortë me pak shkëlqim, ideal për stilime klasike dhe të rregullta pa ngurtësi.",
      descriptionFull: [
        "Dyll flokësh me bazë uji nga Depot – The Male Tools & Co.",
        "Të gjitha produktet e serisë 300 janë për stilimin e flokëve",
        "No. 303 ofron mbajtje të fortë me pak shkëlqim, pa e ngurtësuar flokun",
        "Ideale për stilime klasike dhe të rregullta. Mbajtje e fortë.",
        "Përmban: Vaj kokosi, ekstrakte bimore, ekstrakt gjethe çaji, vaj luledielli, glicerinë",
      ],
      image: "/products/wax-303.webp",
      features: ["75 ml", "Mbajtje 24 orësh", "Për të gjitha llojet e flokëve"],
      specifications: {
        countryOfOrigin: "Italy",
        fragrance: "Mild",
        instructions: [
          "Nise me flokë të thatë ose pak të lagur me peshqir para se të vësh pomadën.",
          "Merr pak me gisht dhe fërkoje mirë mes duarve.",
          "Hape në flokë nga rrënja deri te majat, sa më njëtrajtshëm.",
          "Rregulloje me gishta ose me krehër siç ta do qejfi.",
        ],
      },
      ingredients: `Aqua (Water), Ceteareth-25, PEG-7 Glyceryl Cocoate, Propylene Glycol, Glycerin, PEG-40 Hydrogenated Castor Oil, Camellia Sinensis Leaf Extract, Helianthus Annuus (Sunflower) Seed Oil, Aloe Barbadensis Leaf Juice, Commiphora Myrrha Resin Extract, Angelica Archangelica Root Extract, Acorus Calamus Root Extract, Eugenia Caryophyllus (Clove) Bud Extract, Myristica Fragrans (Nutmeg) Fruit Extract, Piper Nigrum (Pepper) Fruit Extract, Curcuma Zedoaria Root Extract, Zingiber Officinale (Ginger) Rhizome Extract, Elettaria Cardamomum Seed Extract, Alcohol, PVP, Phenoxyethanol, Caprylyl Glycol, Caramel, Parfum (Fragrance), Cinnamal, Eugenol, Hexyl Cinnamal, Limonene, Linalool.`,
    },
    {
      id: 2,
      name: "Depot No.301 Matt Paste 100ml",
      description:
        "Depot No. 301 Matt Paste është një pomadë me efekt mat që jep mbajtje mesatare dhe volum të lehtë, perfekte për stilime natyrale me përfundim të butë e të mat.",
      descriptionFull: [
        "Pomadë me efekt mat nga Depot – The Male Tools & Co.",
        "Të gjitha produktet e serisë 300 janë për stilimin e flokëve",
        "No. 301 është ideale për stilime me pak volum dhe përfundim të butë, mat",
        "Mbajtje mesatare. E përshtatshme për një pamje natyrale dhe të kontrolluar.",
        "Përmban: Dyll natyral, ekstrakte bimore, ekstrakt gjethe çaji, vaj luledielli",
      ],
      image: "/products/paste-301.webp",
      features: ["100 ml", "Mbajtje mesatare", "Efekt mat dhe volum i lehtë"],
      specifications: {
        countryOfOrigin: "Italy",
        fragrance: "Mild",
        instructions: [
          "Fillo me flokë të thatë ose të tharë me peshqir para se të aplikosh pastën.",
          "Merr një sasi të vogël me majat e gishtave dhe fërkoje mes pëllëmbëve për ta zbutur.",
          "Aplikoje në flokë nga rrënjët te majat, në mënyrë të njëtrajtshme. Shto më shumë nëse duhet.",
          "Stiloni flokët me gishta ose krehër për të formuar dhe përcaktuar stilin.",
        ],
      },
      ingredients: `Aqua (Water), Petrolatum, Cera Alba (Beeswax), Vinyl Caprolactam/VP/Dimethylaminoethyl Methacrylate Copolymer, Paraffinum Liquidum (Mineral Oil), Cetoleth-10, Ozokerite, Stearic Acid, Ceteareth-30, PEG-7 Glyceryl Cocoate, Copernicia Cerifera Cera (Carnauba Wax), Palmitic Acid, Helianthus Annuus (Sunflower) Seed Oil, Camellia Sinensis Leaf Extract, Aloe Barbadensis Leaf Juice, Commiphora Myrrha Resin Extract, Angelica Archangelica Root Extract, Acorus Calamus Root Extract, Eugenia Caryophyllus (Clove) Bud Extract, Myristica Fragrans (Nutmeg) Fruit Extract, Piper Nigrum (Pepper) Fruit Extract, Curcuma Zedoaria Root Extract, Zingiber Officinale (Ginger) Rhizome Extract, Elettaria Cardamomum Seed Extract, Alcohol, Hamamelis Virginiana (Witch Hazel) Leaf Extract, Titanium Dioxide, Kaolin, Parfum (Fragrance), Myristic Acid, BHT, Cinnamal, Citral, Citronellol, Eugenol, Hexyl Cinnamal, Limonene, Linalool, Phenoxyethanol, Chlorphenesin, Glycerin, Decylene Glycol.`,
    },
    {
      id: 3,
      name: "Depot No.314 Shiny Hair Wax 75ml",
      description:
        "Depot No. 314 është një dyll flokësh semi-kompakt me mbajtje mesatare që jep shkëlqim të mrekullueshëm. Përdor polimerë antistatike që sigurojnë mbajtje dhe mbledhin flokët e dredhur, si dhe aloe vera që zbut dhe mbron flokët.",
      descriptionFull: [
        "Dyll flokësh me shkëlqim nga Depot – The Male Tools & Co.",
        "Të gjitha produktet e serisë 300 janë për stilimin e flokëve",
        "No. 314 ofron mbajtje mesatare dhe shkëlqim të lartë për flokët",
        "Ideal për flokët më të errët dhe për stilime të forta ose si përfundim për pamje natyrale",
        "Përmban: Polimerë antistatike, aloe vera",
      ],
      image: "/products/wax-314.webp",
      features: [
        "75 ml",
        "Mbajtje mesatare",
        "Shkëlqim i mrekullueshëm",
        "Për flokë të errët",
      ],
      specifications: {
        countryOfOrigin: "Italy",
        fragrance: "Mild",
        instructions: [
          "Fillo me flokë të thatë ose të tharë me peshqir para se të aplikosh pomadën.",
          "Merr një sasi të vogël me majat e gishtave dhe fërkoje mes pëllëmbëve për ta zbutur.",
          "Aplikoje në flokë nga rrënjët te majat, në mënyrë të njëtrajtshme. Shto më shumë nëse duhet.",
          "Stiloni flokët me gishta ose krehër për të formuar dhe përcaktuar stilin.",
        ],
      },
      ingredients: `Aqua (Water), Ceteareth-25, PEG-7 Glyceryl Cocoate, Propylene Glycol, Glycerin, Aloe Barbadensis Leaf Juice, Polymethyl Methacrylate, Ceteareth-30, Stearic Acid, Copernicia Cerifera Cera (Carnauba Wax), Helianthus Annuus (Sunflower) Seed Oil, Camellia Sinensis Leaf Extract, PVP, Phenoxyethanol, Parfum (Fragrance), Limonene, Linalool, Hexyl Cinnamal, Cinnamal.`,
    },

    {
      id: 4,
      name: "Depot No.315 Fixing Pomade 75ml",
      description:
        "Depot No. 315 Fixing Pomade është një pomadë me mbajtje të fortë, e cila ka një konsistencë të butë që e bën të lehtë aplikimin, duke i dhënë flokëve teksturë dhe volum që zgjat gjatë.",
      descriptionFull: [
        "Pomadë me mbajtje të fortë nga Depot – The Male Tools & Co.",
        "Të gjitha produktet e serisë 300 janë për stilimin e flokëve",
        "No. 315 ka një konsistencë të butë që e bën të lehtë aplikimin dhe siguron volum dhe teksturë për flokët",
        "Mbrojtje nga rrezet UV: Mbron flokët nga rrezet e dëmshme të diellit.",
        "Përmban: Ekstrakt gjethe çaji, vaj luledielli, dhe mbrojtje nga UV.",
      ],
      image: "/products/pomade-315.webp",
      features: [
        "75 ml",
        "Mbajtje e fortë",
        "Teksturë dhe volum që zgjat",
        "Mbrojtje nga rrezet UV",
      ],
      specifications: {
        countryOfOrigin: "Italy",
        fragrance: "Mild",
        instructions: [
          "Fillo me flokë të thatë ose të tharë me peshqir para se të aplikosh pomadën.",
          "Merr një sasi të vogël me majat e gishtave dhe fërkoje mes pëllëmbëve për ta zbutur.",
          "Aplikoje në flokë nga rrënjët te majat, në mënyrë të njëtrajtshme. Shto më shumë nëse duhet.",
          "Stiloni flokët me gishta ose krehër për të formuar dhe përcaktuar stilin.",
        ],
      },
      ingredients: `Aqua (Water), Ceteareth-25, PEG-7 Glyceryl Cocoate, Propylene Glycol, Glycerin, PEG- 40 Hydrogenated Castor Oil, Camellia Sinensis Leaf Extract, Helianthus Annuus (Sunflower) Seed Oil, Alcohol, PVP, Phenoxyethanol, Caprylyl Glycol, Parfum (Fragrance), Titanium Dioxide, UV Filters.`,
    },
    {
      id: 5,
      name: "Depot No.302 Clay Pomade 75ml",
      description:
        "Depot No. 302 Clay Pomade është një pomadë me argjilë që ofron mbajtje të fortë dhe teksturë me përfundim mat. Përshtatshme për stilime me volum, duke ofruar një mbajtje të fortë dhe lehtësi përdorimi.",
      descriptionFull: [
        "Pomadë me argjilë nga Depot – The Male Tools & Co.",
        "Të gjitha produktet e serisë 300 janë për stilimin e flokëve",
        "No. 302 përmban argjilë natyrale që siguron mbajtje dhe teksturë me përfundim mat",
        "Përshtatshme për stilime voluminoze me mbajtje të fortë dhe lehtësi përdorimi",
        "Përmban: Argjilë Kaolin, glicerinë, ekstrakte bimore dhe filtra UV për mbrojtje nga dielli",
      ],
      image: "/products/clay-302.webp",
      features: [
        "75 ml",
        "Mbajtje e fortë",
        "Efekt mat dhe volum i lehtë",
        "Përmban argjilë Kaolin",
      ],
      specifications: {
        countryOfOrigin: "Italy",
        fragrance: "Mild",
        instructions: [
          "Pastro dhe thaj flokët para se të aplikosh pomadën.",
          "Merr një sasi të vogël të argjilës dhe e shkrin mes duarve.",
          "Aplikoje në flokë dhe stiloni sipas dëshirës.",
          "Nëse është e nevojshme, përdor një krehër për të shpërndarë pomadën dhe arritur pamjen që dëshiron.",
        ],
      },
      ingredients: `Petrolatum, Kaolin, Cera Alba (Beeswax), PEG-7 Glyceryl Cocoate, Paraffinum Liquidum (Mineral Oil), Parfum (Fragrance), Ethylhexyl Methoxycinnamate, Tocopheryl Acetate, Glycerin, Hamamelis Virginiana (Witch Hazel) Leaf Extract, Vitis Vinifera (Grape) Seed Extract, Aloe Barbadensis Leaf Juice, Commiphora Myrrha Resin Extract, Angelica Archangelica Root Extract, Acorus Calamus Root Extract, Eugenia Caryophyllus (Clove) Bud Extract, Myristica Fragrans (Nutmeg) Fruit Extract, Piper Nigrum (Pepper) Fruit Extract, Curcuma Zedoaria Root Extract, Zingiber Officinale (Ginger) Rhizome Extract, Elettaria Cardamomum Seed Extract, Alcohol, Aqua (Water), Sodium Benzoate, Potassium Sorbate, Lactic Acid, BHT, CI 77891 (Titanium Dioxide), Cinnamal, Citral, Eugenol, Hexyl Cinnamal, Limonene, Linalool.`,
    },
  ];

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-24 md:pt-28 pb-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Produkti nuk u gjet
        </h1>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          ← Kthehu te Produktet
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 md:pt-28 pb-12">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 relative group">
          <div className="aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={600} // Add explicit dimensions
              height={400}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              quality={85}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 lg:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>

          {/* Full Description */}
          {product.descriptionFull && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Përshkrimi i Plotë</h2>
              <ul className="list-disc pl-6 space-y-2">
                {product.descriptionFull.map((desc: string, index: number) => (
                  <li key={index} className="text-muted-foreground">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Specifikimet</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Vendi i Origjinës:</p>
                  <p className="text-muted-foreground">
                    {product.specifications.countryOfOrigin}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Aroma:</p>
                  <p className="text-muted-foreground">
                    {product.specifications.fragrance}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-medium mb-2">Udhëzimet e Përdorimit:</p>
                  <ul className="list-decimal pl-6 space-y-1">
                    {product.specifications.instructions.map(
                      (step: string, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {step}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Përbërësit</h2>
              <pre className="text-muted-foreground whitespace-pre-wrap font-sans">
                {product.ingredients}
              </pre>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start sm:justify-start items-center justify-center">
            <Link
              href="/products"
              className="inline-block px-4 py-3 md:px-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center whitespace-nowrap w-60 sm:w-auto"
            >
              ← Kthehu te Produktet
            </Link>

            <button
              className="px-4 py-3 md:px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap w-36 sm:w-auto"
              onClick={toggleOptions} // Trigger the display or hide of options
            >
              Blej Tani
            </button>
          </div>

          {/* Conditional rendering of WhatsApp and SMS options with smoother animations */}
          <div
            className={`flex flex-r sm:justify-start items-center justify-center gap-2 mt-4 transition-all duration-300 ease-in-out ${
              showOptions
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {showOptions && (
              <>
                <a
                  href="https://wa.me/355699929229?text=Pershendetje,%20dua%20te%20blej%20produktin."
                  className="px-2 py-1 sm:py-3 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition-colors w-40 sm:w-auto text-sm"
                >
                  Kontakto ne WhatsApp
                </a>
                <a
                  href="sms:+355699929229?body=Pershendetje,%20dua%20te%20blej%20produktin."
                  className="px-2 py-3 sm:py-3 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition-colors w-36 sm:w-auto text-sm"
                >
                  Kontakto me SMS
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
