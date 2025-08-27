import Link from "next/link";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { IoIosMailOpen } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-coffee-brown text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Tagline */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-white font-bold text-2xl mb-2 flex flex-row justify-center items-center">
              <Image
                src="/logo.webp"
                alt="Gaina Overseas Logo"
                width={200}
                height={200}
                className="w-48 h-20 rounded-2xl p-2 bg-white mb-6"
              />
              {/* <Image
                src="/slogo.webp"
                alt="Gaina Overseas Logo"
                width={200}
                height={200}
                className="e"
              /> */}
              {/* Gaina Overseas */}
            </Link>
            {/* <p className="text-sm my-4">
              In breath, find peace; in stillness, grow,
              <br />
              Through ancient roots and modern glow,
              <br />
              Let wisdom guide, let happiness flow.
            </p> */}
            <div className="flex space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold mb-4 text-2xl">Quick Links</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/" className="hover:text-coffee-gold">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/about" className="hover:text-coffee-gold">
                  About Us
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/contact" className="hover:text-coffee-gold">
                  Contact
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/product" className="hover:text-coffee-gold">
                  Product
                </Link>
              </li>
              
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/trade-enquire" className="hover:text-coffee-gold">
                  Trade enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer and Other Links */}
          <div className="mb-6 md:mb-0">
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/disclaimer" className="hover:text-coffee-gold">
                  Disclaimer / Privacy Policy
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/contact" className="hover:text-coffee-gold">
                  Contact
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/trade-enquire" className="hover:text-coffee-gold">
                  Trade enquiry
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/careers" className="hover:text-coffee-gold">
                  Careers (Work with us)
                </Link>
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link
                  href="/coffee-suppliers"
                  className="hover:text-coffee-gold"
                >
                  For coffee suppliers
                  <br /> (Become a coffee supplier with us)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="">
            <div className="flex justify-start items-center flex-row mb-3">
              <IoIosMailOpen className="mr-2 text-4xl" />
             <div className="flex flex-col">
                <h3 className="font-medium  text-2xl">Mail Us</h3>
              <p className="flex items-center">
                
               info@gajnaoverseas.com
              </p>
              </div>
            </div>
            <div className="flex justify-start items-center flex-row mb-3">
              <IoCall className="mr-2 text-4xl" />
              <div className="flex flex-col">
                <h3 className="font-medium mb-2 text-2xl">Call Us</h3>
                <p className="flex items-center">+91 9811789665</p>
              </div>
            </div>
            <div className="flex justify-start items-center flex-row">
              <FaLocationDot className="mr-2 text-4xl" />
              <div className="flex flex-col">
                <h3 className="font-medium mb-2 text-2xl">Address</h3>
                <p className="">505, Park Royal Apartments, <br/>GH-80, Sector -56, <br/>Gurugram, Haryana, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
