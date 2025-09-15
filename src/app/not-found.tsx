import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F9F5F0] pt-32 pb-16 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-semibold mb-6 text-coffee-brown">
            Coming Soon
          </h2>
          <div className="relative w-32 h-32 mx-auto my-8">
            <Image 
              src="/coffee-bean.webp" 
              alt="Coffee Bean" 
              fill
              className="object-contain"
            />
          </div>
          <p className="text-2xl mb-4 text-gray-700">
            We&apos;re brewing something special for you
          </p>
          <p className="text-xl mb-8 text-gray-600">
            This page is currently under development. Please check back later.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#61714D] text-white px-8 py-3 rounded-full hover:bg-[#4D5A3E] transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}