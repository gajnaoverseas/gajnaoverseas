import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const dynamic = "force-static";

export default function ProductsIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F2EE] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-[#562F23] mb-2">Our Coffee Grades</h1>
          <p className="text-gray-700">Uniform layout. Choose a grade to see its details.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-[#FFF7F2]">
                <Image src={p.heroImage} alt={p.name} fill className="object-contain p-8" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-serif text-[#562F23]">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.subtitle || p.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}