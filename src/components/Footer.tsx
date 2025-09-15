import Link from "next/link";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { IoIosMailOpen } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Linkedin } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
// Removed framer-motion import to fix createContext error

export default function Footer() {
  return (
    <footer className="bg-coffee-brown text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-white font-bold text-xl md:text-2xl mb-4 flex justify-center md:justify-start items-center">
              <Image
                src="/logo.webp"
                alt="Gaina Overseas Logo"
                width={180}
                height={80}
                className="w-40 md:w-48 h-auto rounded-2xl p-2 bg-white mb-4"
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
            
            {/* Newsletter Section */}
            {/* <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Newsletter</h3>
              <p className="text-sm text-gray-200 mb-3">
                Sign up with your email to join our mailing list
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-3 py-2 text-sm text-gray-800 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coffee-gold focus:border-transparent"
                />
                <button className="px-4 py-2 text-sm bg-coffee-gold text-coffee-brown font-medium rounded hover:bg-amber-400 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div> */}
            
           <div className="flex justify-center md:justify-start space-x-4">
  <div className="text-center mb-16">
    <div className="flex justify-center space-x-2 flex-wrap gap-2">
      {[
        { icon: 'linkedin', component: Linkedin, href: 'https://www.linkedin.com/in/priyaviratsingh/' },
        { icon: 'whatsapp', component: BsWhatsapp, href: 'https://wa.me/9811789665' },
      ].map((social, index) => {
        const IconComponent = social.component;
        return (
          <a
            key={social.icon}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-coffee-brown hover:bg-amber-700 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
          >
            <IconComponent className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  </div>
</div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-xl md:text-2xl text-center md:text-left">Quick Links</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/" className="hover:text-coffee-gold">
                  Home
                </Link>
              </li>
              {/* <li className="flex items-center">
                <FaCheck className="mr-2" />
                <Link href="/about" className="hover:text-coffee-gold">
                  About Us
                </Link>
              </li> */}
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
              
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="font-bold mb-4 text-xl md:text-2xl text-center md:text-left">Services</h3>
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
          <div>
            <h3 className="font-bold mb-4 text-xl md:text-2xl text-center md:text-left">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <IoIosMailOpen className="text-2xl md:text-3xl text-coffee-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Mail Us</h4>
                  <p className="text-sm md:text-base text-gray-200">
                    info@gajnaoverseas.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <IoCall className="text-2xl md:text-3xl text-coffee-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Call Us</h4>
                  <p className="text-sm md:text-base text-gray-200">+91 9811789665</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaLocationDot className="text-2xl md:text-3xl text-coffee-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Address</h4>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    505, Park Royal Apartments,<br/>
                    GH-80, Sector -56,<br/>
                    Gurugram, Haryana, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
