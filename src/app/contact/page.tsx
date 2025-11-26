"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Map,
  MessageCircle,
  Send,
  Video,
  Smartphone,
  Building2,
  Globe,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";
import GeneralContactForm from "@/components/GeneralContactForm";
import Link from "next/link";

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const contactMethods = [
    {
      icon: MapPin,
      title: "Location",
      subtitle: "Visit Us",
      description:
        "505, Park Royal Apartments, GH-80, Block E, Sector-56, Gurugram, Haryana, India",
      action: "Get Directions",
      href: "https://www.google.com/maps/dir/?api=1&destination=Gajna+Overseas+(OPC)+Private+Limited,+505,+Park+Royal+Apartments,+GH-80,+Block+E,+Sector-56,+Gurugram,+Haryana,+India+122011",
    },
    {
      icon: Phone,
      title: "Phone",
      subtitle: "Call Us",
      description: "+91 9811789665",
      action: "Call Now",
      href: "tel:+919811789665",
    },
    {
      icon: Mail,
      title: "Email",
      subtitle: "Email Us",
      description: "priyavirat@zohomail.in",
      action: "Send Email",
      href: "mailto:priyavirat@zohomail.in",
    },
    {
      icon: MessageCircle,
      title: "Enquiry Form",
      subtitle: "Quick Contact",
      description: "Fill out our contact form for detailed inquiries",
      action: "Fill Form",
      href: "#contact-form",
    },
    {
      icon: Smartphone,
      title: "SMS",
      subtitle: "Text Us",
      description: "Send us a text message for quick queries",
      action: "Send SMS",
      href: "sms:+919811789665",
    },
    {
      icon: Video,
      title: "Video Conferencing",
      subtitle: "Meet Online",
      description: "Schedule a video call for detailed discussions",
      action: "Schedule Call",
      href: "mailto:priyavirat@zohomail.in?subject=Video Call Request",
    },
    {
      icon: BsWhatsapp,
      title: "WhatsApp",
      subtitle: "Chat With Us",
      description: "Connect with us on WhatsApp for instant support",
      action: "Chat Now",
      href: "https://wa.me/919811789665",
    },
  ];

  const faqs = [

    {
      question: "How do I request samples?",
      answer:
        "You can request samples by filling out our contact form or calling us directly. We provide samples for serious buyers to evaluate quality before placing orders.",
    },
    {
      question: "What coffee grades do you export?",
      answer:
        "We export various grades including Arabica (Plantation PB, A, B, C) and Robusta (Cherry, Parchment) varieties. Check our product catalog for complete details.",
    },


    {
      question: "Do you provide quality certificates?",
      answer:
        "Yes, we provide all necessary quality certificates including ICO certificates, phytosanitary certificates, and third-party quality analysis reports.",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Clean Contact Us Layout */}
      <section className="py-16 mt-40 bg-white lg:block hidden ">
        <main className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center ">
          {/* column 1 */}
          <div className="flex flex-col ">
            <Link
              href="/location"
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col hover:scale-110 justify-center items-center hover:shadow-lg transition "
            >
              <div className="flex items-center justify-center text-[#6F4E37] ">
                <MapPin className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw]" />
              </div>
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                Location
              </span>
            </Link>

            <Link
              href="/sms"
              className="w-full md:w-[15vw] hover:scale-110 h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <div className="flex items-center justify-center text-[#6F4E37] ">
                <Smartphone className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw]" />
              </div>
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                SMS
              </span>
            </Link>
          </div>

          {/* column 2 */}
          <div className="flex flex-col ">
            <div className="flex flex-col md:flex-row ">
              <Link
                href="/phone"
                className="p-6 h-[150px] hover:scale-110 md:h-[20vh] w-full md:w-[20vw] bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
              >
                <Phone className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
                <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                  Phone
                </span>
              </Link>

              <Link
                href="/email"
                className="p-6 h-[150px] hover:scale-110 md:h-[20vh] w-full md:w-[20vw] bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
              >
                <Mail className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
                <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                  Email
                </span>
              </Link>
            </div>


            <h1 className="text-4xl hover:scale-110 md:text-7xl leading-tight font-bold text-white text-center font-serif p-6 h-[150px] md:h-[20vh] w-full md:w-[40vw]  bg-green-700 border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition">
              Contact Us
            </h1>


            <Link
              href="/video-conferencing"
              className="h-[150px] hover:scale-110 md:h-[20vh] w-full bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <Video className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                Video Conferencing
              </span>
            </Link>
          </div>

          {/* column 3 */}
          <div className="flex flex-col ">
            <Link
              href="/enquiry"
              className="w-full hover:scale-110 md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <MessageCircle className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                Enquiry Form
              </span>
            </Link>

            <Link
              href="/whatsapp"
              className="w-full hover:scale-110 md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <BsWhatsapp className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                WhatsApp
              </span>
            </Link>
          </div>
        </main>
      </section>

      {/* Mobile Layout (sm and below) - 3-column grid mirroring tablet */}
      <div className="block sm:hidden mt-36 px-4 py-6">
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
          {/* Row 1 */}
          <Link
            href="/location"
            className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-2 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
              <MapPin className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">Location</span>
          </Link>
          <Link
            href="/phone"
            className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-2 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
              <Phone className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">Phone</span>
          </Link>
          <Link
            href="/email"
            className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-2 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
              <Mail className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">Email</span>
          </Link>

          {/* Full-width title card */}
          <div className="col-span-3 bg-gradient-to-r from-green-700 to-green-800 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 h-32 w-full">
            <h1 className="text-2xl font-bold text-white font-serif text-center leading-tight">Contact Us</h1>
          </div>

          {/* Row 2 */}
          <Link
            href="/video-conferencing"
            className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-2 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300">
              <Video className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">Video Call</span>
          </Link>
          <Link
            href="/whatsapp"
            className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-2 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
              <BsWhatsapp className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">WhatsApp</span>
          </Link>
          <Link
            href="/enquiry"
            className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-2 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
              <MessageCircle className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">Enquiry Form</span>
          </Link>
        </div>
        {/* SMS card below the grid to match tablet layout structure */}
        <div className="mt-6 w-full max-w-md mx-auto">
          <Link
            href="/sms"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-32"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mb-2 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all duration-300">
              <Smartphone className="w-6 h-6 text-[#6F4E37]" />
            </div>
            <span className="text-sm font-medium text-[#6F4E37] text-center">SMS</span>
          </Link>
        </div>
      </div>

      {/* Tablet Layout (sm to lg) - 2x3 Grid */}
      <div className="hidden sm:block lg:hidden mt-28 px-4 py-10">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Full-width title card on tablet */}

          {/* Cards below the full-width title */}
          <Link
            href="/location"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-3 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
              <MapPin className="w-7 h-7 text-[#6F4E37]" />
            </div>
            <span className="text-base font-medium text-[#6F4E37] text-center">
              Location
            </span>
          </Link>



          <Link
            href="/phone"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
              <Phone className="w-7 h-7 text-[#6F4E37]" />
            </div>
            <span className="text-base font-medium text-[#6F4E37] text-center">
              Phone
            </span>
          </Link>

          <Link
            href="/email"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-3 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
              <Mail className="w-7 h-7 text-[#6F4E37]" />
            </div>
            <span className="text-base font-medium text-[#6F4E37] text-center">
              Email
            </span>
          </Link>
          <div className="col-span-3 bg-gradient-to-r from-green-700 to-green-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 h-40">
            <h1 className="text-4xl font-bold text-white font-serif text-center leading-tight">
              Contact Us
            </h1>
            {/* <p className="text-green-100 mt-2 text-sm">Get in touch</p> */}
          </div>
          <Link
            href="/video-conferencing"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-3 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300">
              <Video className="w-7 h-7 text-[#6F4E37]" />
            </div>
            <span className="text-base font-medium text-[#6F4E37] text-center">
              Video Call
            </span>
          </Link>

          <Link
            href="/whatsapp"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-3 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
              <BsWhatsapp className="w-7 h-7 text-[#6F4E37]" />
            </div>
            <span className="text-base font-medium text-[#6F4E37] text-center">
              WhatsApp
            </span>
          </Link>

          {/* Row 3 - Centered */}
          <Link
            href="/enquiry"
            className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-3 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
              <MessageCircle className="w-7 h-7 text-[#6F4E37]" />
            </div>
            <span className="text-base font-medium text-[#6F4E37] text-center">
              Enquiry Form
            </span>
          </Link>



          {/* <Link
            href="/trade-enquiry"
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6 flex flex-col items-center justify-center h-40 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-base font-medium text-amber-700 text-center">
              Trade Enquiry
            </span>
          </Link> */}
        </div>
        <div className="mt-6">
            <Link
              href="/sms"
              className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:shadow-xl hover:border-green-300 transition-all duration-300 group h-40"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mb-3 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all duration-300">
                <Smartphone className="w-7 h-7 text-[#6F4E37]" />
              </div>
              <span className="text-base font-medium text-[#6F4E37] text-center">
                SMS
              </span>
            </Link>
          </div>
      </div>

      {/* Main Contact Section */}
      <section className="py-16 bg-[url('/blog-bg.webp')] bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto px-4">


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Details */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-coffee-brown">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Details
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-brown rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800">
                        Company Name
                      </h4>
                      <p className="text-gray-600 break-words">Gajna Overseas Private Limited</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-brown rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800">
                        Registered Address
                      </h4>
                      <p className="text-gray-600 break-words">
                        505, Park Royal Apartments, GH-80, Sector-56, Gurugram,
                        Haryana, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-brown rounded-lg flex items-center justify-center flex-shrink-0">
                      <Map className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800">PIN Code</h4>
                      <p className="text-gray-600 break-words">122011.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-brown rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600 break-words">priyavirat@zohomail.in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-brown rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800">Mobile No</h4>
                      <p className="text-gray-600 break-words">+91 9811789665</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-brown rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800">Website</h4>
                      <p className="text-gray-600 break-words">www.gajnaoverseas.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg font-semibold text-xl border border-coffee-brown">
                Corporate Identity Number (CIN): <span className="text-gray-600 font-medium text-lg">U51909HR2021OPC098737</span>
              </div>

              {/* Connect With Us */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-coffee-brown">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Connect With Us
                </h3>
                <div className="grid gap-4">
                  <Link
                    href="mailto:priyavirat@zohomail.in"
                    className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Send className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Send Us Email
                    </span>
                  </Link>

                  <Link
                    href="tel:+919811789665"
                    className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Call Us
                    </span>
                  </Link>

                  <Link
                    href="sms:+919811789665"
                    className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Smartphone className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Send Us SMS
                    </span>
                  </Link>

                  <Link
                    href="mailto:priyavirat@zohomail.in?subject=Video Call Request"
                    className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <Video className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Video Conferencing
                    </span>
                  </Link>

                  <Link
                    href="https://wa.me/919811789665"
                    target="_blank"
                    className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <BsWhatsapp className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Chat With Us
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              id="contact-form"
              className="bg-white rounded-2xl p-8 shadow-lg  border border-coffee-brown"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us Your Queries
              </h3>
              <motion.p
                className="text-base text-gray-600 max-w-3xl mx-auto pb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                For any queries related to Indian Origin Green Coffee Beans.
                Please connect with us.
              </motion.p>
              <GeneralContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Find Us Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our office located in the heart of Gurugram, Haryana. We&apos;re easily accessible and ready to welcome you.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Map Container */}
            <div className="relative h-96 md:h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps?q=Gajna+Overseas+(OPC)+Private+Limited,+505,+Park+Royal+Apartments,+GH-80,+Block+C,+Sector-56,+Gurugram,+Haryana,+India+122011&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gajna Overseas Office Location"
                className="rounded-t-2xl"
              ></iframe>
            </div>

            {/* Map Info Card */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">Our Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        505, Park Royal Apartments, GH-80, Block E,<br />
                        Sector-56, Gurugram, Haryana, India<br />
                        PIN Code: 122011
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">Contact Info</h3>
                      <p className="text-gray-600">
                        Phone: +91 9811789665<br />
                        Email: priyavirat@zohomail.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Gajna+Overseas+(OPC)+Private+Limited,+505,+Park+Royal+Apartments,+GH-80,+Block+C,+Sector-56,+Gurugram,+Haryana,+India+122011"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href="tel:+919811789665"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="frequently-asked-questions" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our coffee export services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-300 ${isOpen
                      ? "bg-coffee-brown text-white"
                      : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                      }`}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {isOpen && (
                      <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-16 bg-gradient-to-r from-coffee-brown to-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Follow Us On Social Media</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/company/gajna-overseas-private-limited/about/?viewAsMember=true"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://wa.me/919811789665"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <BsWhatsapp className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
