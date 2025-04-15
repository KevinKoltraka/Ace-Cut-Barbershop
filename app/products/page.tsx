// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";

const ProductsPage = () => {
  const products = [
    { 
      id: 1, 
      name: "Depot No.303 Modelling Wax 100ml",
      image: "/products/wax-303.webp" 
    },
    { 
      id: 2, 
      name: "Depot 301 Matt Paste 75 ml",
      image: "/products/paste-301.webp" 
    },
    { 
      id: 3, 
      name: "Depot No. 314 Shiny Hair Wax",
      image: "/products/wax-314.webp" 
    },
    { 
      id: 4, 
      name: "Depot No. 315 Fixing Pomade",
      image: "/products/pomade-315.webp" 
    },
    { 
      id: 5, 
      name: "Depot No. 302 Clay Pomade",
      image: "/products/clay-302.webp" 
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-24 md:pt-28 pb-12">
      <h1 className="text-4xl font-bold mb-8">Produktet Tona</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex flex-col p-6 border rounded-lg hover:shadow-lg transition-shadow relative"
          >
            {/* Entire card is now a clickable Link */}
            <div className="relative w-full aspect-square mb-4 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <div className="mt-auto text-primary hover:underline">
              Shiko Detajet →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;