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
        "505, Park Royal Apartments, GH-80, Sector-56, Gurugram, Haryana, India",
      action: "Get Directions",
      href: "https://www.google.com/maps/dir/?api=1&destination=Sector+56,+Gurugram,+Haryana,+India",
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
      description: "info@gajnaoverseas.com",
      action: "Send Email",
      href: "mailto:info@gajnaoverseas.com",
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
      href: "mailto:info@gajnaoverseas.com?subject=Video Call Request",
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
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Clean Contact Us Layout */}
      <section className="py-16 mt-40 bg-white">
        <main className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center ">
          {/* column 1 */}
          <div className="flex flex-col ">
            <Link
              href="/location"
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
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
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
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
                className="p-6 h-[150px] md:h-[20vh] w-full md:w-[20vw] bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
              >
                <Phone className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
                <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                  Phone
                </span>
              </Link>

              <Link
                href="/email"
                className="p-6 h-[150px] md:h-[20vh] w-full md:w-[20vw] bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
              >
                <Mail className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
                <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                  Email
                </span>
              </Link>
            </div>

            <Link
              href="/contact"
              className="p-6 h-[150px] md:h-[20vh] w-full md:w-[40vw]  bg-green-700 border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <h1 className="text-4xl md:text-7xl leading-tight font-bold text-white text-center font-serif">
                Contact Us
              </h1>
            </Link>

            <Link
              href="/video-conferencing"
              className="h-[150px] md:h-[20vh] w-full bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
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
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <MessageCircle className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                Enquiry Form
              </span>
            </Link>

            <Link
              href="/whatsapp"
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <BsWhatsapp className="w-[32px] h-[32px] md:w-[2vw] md:h-[2vw] text-[#6F4E37]" />
              <span className="mt-3 block text-sm md:text-[1.2vw] font-medium text-[#6F4E37] text-center">
                WhatsApp
              </span>
            </Link>
          </div>
        </main>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-[url('/blog-bg.webp')] bg-cover bg-no-repeat">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Contact With Us
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Details */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Details
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coffee-brown rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Company Name
                      </h4>
                      <p className="text-gray-600">Gajna Overseas Private Limited</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coffee-brown rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Registered Address
                      </h4>
                      <p className="text-gray-600">
                        505, Park Royal Apartments, GH-80, Sector-56, Gurugram,
                        Haryana, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coffee-brown rounded-lg flex items-center justify-center">
                      <Map className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Pin Code</h4>
                      <p className="text-gray-600">122011.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coffee-brown rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@gajnaoverseas.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coffee-brown rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Mobile No</h4>
                      <p className="text-gray-600">+91 9811789665</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-coffee-brown rounded-lg flex items-center justify-center">
                      <BsWhatsapp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Website</h4>
                      <p className="text-gray-600">www.gajnaoverseas.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg font-semibold text-xl">
                Corporate Identity Number (CIN): 
              </div>

              {/* Connect With Us */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Connect With Us
                </h3>
                <div className="grid gap-4">
                  <Link
                    href="mailto:info@gajnaoverseas.com"
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
                    href="mailto:info@gajnaoverseas.com?subject=Video Call Request"
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
              className="bg-white rounded-2xl p-8 shadow-lg"
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
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
                    className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-coffee-brown text-white"
                        : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
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
              href="https://www.linkedin.com/in/priyaviratsingh/"
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
