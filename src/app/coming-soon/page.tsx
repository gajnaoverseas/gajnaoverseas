import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Coming Soon | Gajna Overseas Private Limited",
  description:
    "We’re brewing something special. New features and pages are coming soon to Gajna Overseas.",
};

export default function ComingSoonPage() {
  return (
    <section className="min-h-screen pt-36 pb-24 bg-[#F9F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-coffee-brown">
            Coming Soon
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            We’re brewing something special for you.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative w-36 h-36">
            <Image
              src="/coffee-bean.webp"
              alt="Coffee Bean"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-10 w-full max-w-2xl rounded-2xl border border-coffee-brown/20 bg-white shadow-md">
            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg md:text-xl">
                Our next page will feature curated content about our coffee grades
                and sourcing - designed with the same care as our beans.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/"
                  className="inline-flex justify-center items-center rounded-full px-6 py-3 bg-coffee-brown text-white hover:bg-coffee-brown/90 transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  href="/products"
                  className="inline-flex justify-center items-center rounded-full px-6 py-3 bg-coffee-gold text-coffee-brown hover:bg-amber-300 transition-colors"
                >
                  Explore Products
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center rounded-full px-6 py-3 bg-coffee-green text-white hover:bg-coffee-green/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="px-6 md:px-8 py-4 bg-gradient-to-r from-coffee-beige via-coffee-lightGreen to-coffee-gold rounded-b-2xl"></div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Want to be notified? Send us a note at
              {" "}
              <a
                href="mailto:priyavirat@zohomail.in?subject=Notify%20me%20about%20new%20pages"
                className="text-coffee-brown hover:underline"
              >
                priyavirat@zohomail.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}