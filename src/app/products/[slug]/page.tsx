import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, allProducts, type Product } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

// Generate static params for static site generation
export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product: Product | undefined = products[params.slug];
  if (!product) return notFound();

  const related = (product.related || []).map((slug) => products[slug]).filter(Boolean);

  return (
    <main className="bg-white  ">
      {/* Hero + breadcrumb-like heading */}
      <section className="bg-[#F7F2EE] py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-black mb-6">Home › Products › {product.category} › {product.variety} › {product.subtitle || product.name}</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-[#562F23]">{product.name}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 pt-10 lg:py-24 py-12">
        <ProductDetailClient product={product} />
      </section>

      {/* Related products */}
      {related.length ? (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <h3 className="text-4xl font-semibold  text-[#562F23] mb-6">{product.groupTitle || 'Related Products'}</h3>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {related.map((rp) => (
              <Link key={rp!.slug} href={`/products/${rp!.slug}`} className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
                <div className="relative aspect-square ">
                  <Image src={rp!.heroImage} alt={rp!.name} fill className="object-contain p-6" />
                </div>
                <div className="p-4">
                  <h4 className="text-2xl  text-[#562F23]">{rp!.name}</h4>
                  <p className="text-lg text-gray-600">{rp!.subtitle }</p>
                  <p className="text-lg  text-gray-600">{rp!.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}