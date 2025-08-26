"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, MessageCircle, Send, Youtube } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-br from-coffee-brown to-amber-900 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/contactbg.webp"
            alt="Coffee beans background"
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl  font-bold mb-4">
            Let&apos;s Talk Coffee
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a roaster, trader, or importer, we&apos;d love to hear from you
          </p>
          <motion.button
            className="bg-white text-coffee-brown px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Sample
          </motion.button>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-orange-100 to-pink-100 ">
        <div className="max-w-7xl gap-10 mx-auto px-4 flex justify-center items-center lg:flex-row flex-col">
           {/* Left Side - Quote Card */}
            <motion.div 
              className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-8 text-white relative overflow-hidden h-[100vh] lg:w-[40%] w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 ">
                <Image
                  src="/contactform.webp"
                  alt="Coffee plants pattern"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-4">
                  Get Your Instant Free Quote Now
                </h2>
                <p className="text-sm mb-6 opacity-90">
                  Get our worry-related to Indian origin green coffee beans delivered with us.
                </p>
                
   
                
              </div>
            </motion.div>
            {/* Right Side - Form */}
          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-xl lg:w-[40%] w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-3">
                  <div className="w-6 h-6 mr-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-orange-300 text-sm"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-3">
                  <div className="w-6 h-6 mr-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-orange-300 text-sm"
                    placeholder="Mobile No."
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-3">
                  <div className="w-6 h-6 mr-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-orange-300 text-sm"
                    placeholder="Email ID"
                    required
                  />
                </div>
              </div>

              {/* Country Field */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-3">
                  <div className="w-6 h-6 mr-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="country"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-orange-300 text-sm"
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* LinkedIn Profile Field */}
              <div className="relative">
                <div className="flex items-center border-b border-gray-200 pb-3">
                  <div className="w-6 h-6 mr-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="linkedin"
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-orange-300 text-sm"
                    placeholder="Your LinkedIn profile link"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  placeholder="Type your message here"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="catalog"
                  className="w-4 h-4 mt-1 text-orange-400 bg-gray-100 border-gray-300 rounded focus:ring-orange-300 focus:ring-2"
                />
                <label htmlFor="catalog" className="text-sm text-gray-700 leading-relaxed">
                  I&apos;d like to receive your product catalog via email.
                </label>
              </div>

              {/* Captcha */}
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-xs"
                />
                <div className="flex items-center space-x-2">
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="bg-amber-700 text-white px-4 py-2 rounded font-mono text-sm">
                    Kp0p56
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-white border-2 border-amber-700 text-amber-700 py-4 rounded-full font-semibold text-sm hover:bg-amber-50 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Sourcing Section */}
      <section className="py-10 bg-gradient-to-r from-[#B0D1B4] to-[#B0D1B4] relative">
         <div className="absolute inset-0">
          <Image
            src="/contactmask.webp"
            alt="Coffee beans background"
            fill
            className="object-cover "
          />
          {/* <div className="absolute inset-0 bg-black/50"></div> */}
        </div>
        <div className="max-w-7xl  px-4 lg:w-[50%] w-full">
          <motion.div 
            className=" p-8 flex items-center justify-between "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="">
              <h2 className="text-5xl  font-normal text-gray-800 mb-2">
                Sourcing Indian origin green coffee?
              </h2>
              <p className="text-xl text-gray-900 my-5">
                Start with our full product catalogue
              </p>
              <motion.button
              className="bg-transparent border-coffee-brown border-2 text-coffee-brown cursor-pointer px-8 py-3 rounded-full font-semibold hover:bg-coffee-brown/90 transition-colors duration-300" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Product Catalogue
            </motion.button>
            </div>
            
          </motion.div>
        </div>
      </section>



      {/* Contact Details & Location */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0">
          <Image
            src="/blog-bg.webp"
            alt="Coffee beans background"
            fill
            className="object-cover opacity-40 "
          />

        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-4xl  font-bold text-gray-800 mb-6">
                  Contact Details
                </h2>
                <p className="text-xl text-gray-600 mb-8">Overseas Operations</p>
              </div>

              <div className="space-y-8">
                <motion.div 
                  className="flex items-start space-x-6 p-6 bg-gradient-to-r from-coffee-brown/5 to-amber-50 rounded-2xl border border-coffee-brown/10"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-coffee-brown to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 select-text">
                     <h3 className="text-xl font-bold text-gray-800 mb-2 select-text">Priyavrat Singh</h3>
                     <p className="text-gray-600 mb-3 select-text">Founder & Coffee Export Lead</p>
                     <a href="tel:+919811798569" className="text-coffee-brown font-semibold text-lg hover:text-amber-700 transition-colors select-text">
                       +91-9811798569
                     </a>
                   </div>
                </motion.div>

                <motion.div 
                   className="flex items-start space-x-6 p-6 bg-gradient-to-r from-coffee-brown/5 to-amber-50 rounded-2xl border border-coffee-brown/10"
                   whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="w-16 h-16 bg-gradient-to-br from-coffee-brown to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                     <Mail className="w-8 h-8 text-white" />
                   </div>
                   <div className="flex-1 select-text">
                     <h3 className="text-xl font-bold text-gray-800 mb-2 select-text">Email Us</h3>
                     <a href="mailto:info@gajnacoffee.com" className="text-coffee-brown font-semibold text-lg hover:text-amber-700 transition-colors select-text">
                       info@gajnacoffee.com
                     </a>
                   </div>
                 </motion.div>

                <motion.div 
                   className="flex items-start space-x-6 p-6 bg-gradient-to-r from-coffee-brown/5 to-amber-50 rounded-2xl border border-coffee-brown/10"
                   whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="w-16 h-16 bg-gradient-to-br from-coffee-brown to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                     <MapPin className="w-8 h-8 text-white" />
                   </div>
                   <div className="flex-1 select-text">
                     <h3 className="text-xl font-bold text-gray-800 mb-2 select-text">Business Registration</h3>
                     <p className="text-gray-600 select-text">CIN: U01909RJ2021OPC078757</p>
                   </div>
                 </motion.div>
              </div>
            </motion.div>

            {/* Location & Map */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h3 className="text-5xl  font-bold text-gray-800 mb-6">
                  Our Location
                </h3>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="select-text">
                       <h4 className="font-bold text-gray-800 mb-2 select-text">Gajna Overseas Pvt Ltd</h4>
                       <p className="text-gray-600 leading-relaxed select-text">
                         1st Floor, Royal Apartments, Opp. RK<br />
                         Sector-7K, Gurugram, Haryana, India<br />
                         PIN: 122001
                       </p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="h-80 bg-gray-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2319!2d77.0688!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5d8c0b3bdf1e!2sSector%207%2C%20Gurugram%2C%20Haryana%20122001!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-coffee-brown to-amber-700">
                   <div className="flex items-center justify-between text-white">
                     <div className="select-text">
                       <p className="font-semibold select-text">Gurugram, Haryana</p>
                       <p className="text-sm opacity-90 select-text">India</p>
                     </div>
                    <motion.a
                       href="https://www.google.com/maps/dir/?api=1&destination=Sector+7K,+Gurugram,+Haryana+122001,+India"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 inline-block"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       Get Directions
                     </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
            {/* Social Media & FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Social Media Links */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl  font-bold text-gray-800 mb-8">
              Connect with Us
            </h2>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
               {[
                 { icon: 'linkedin', component: Linkedin },
                 { icon: 'instagram', component: Instagram },
                 { icon: 'facebook', component: Facebook },
                 { icon: 'whatsapp', component: MessageCircle },
                 { icon: 'telegram', component: Send },
                 { icon: 'youtube', component: Youtube }
               ].map((social, index) => {
                 const IconComponent = social.component;
                 return (
                   <motion.a
                     key={social.icon}
                     href="#"
                     className="w-14 h-14 bg-coffee-brown hover:bg-amber-700 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
                     whileHover={{ scale: 1.1, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                   >
                     <IconComponent className="w-6 h-6" />
                   </motion.a>
                 );
               })}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-5xl  font-bold text-gray-800 mb-8 text-center">
              Need Help Before You Reach Out?
            </h2>
            
            <div className="space-y-4">
               {[
                 {
                   question: "How do I request a sample?",
                   answer: "Click on 'Request a sample' in our banner and fill a form."
                 },
                 {
                   question: "What is your MOQ for export?",
                   answer: "Our minimum order quantity varies by product and destination. Please contact us for specific MOQ requirements."
                 },
                 {
                   question: "Which grades of coffee do you offer?",
                   answer: "We offer various grades including Arabica (AA, A, B, C) and Robusta (Cherry, Parchment, Plantation) grades."
                 }
               ].map((faq, index) => {
                 const isOpen = openFaqIndex === index;
                 return (
                   <motion.div 
                     key={index}
                     className="border border-gray-200 rounded-lg overflow-hidden"
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                   >
                     <button 
                       onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                       className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                         isOpen ? 'bg-coffee-brown text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                       } transition-colors duration-300`}
                     >
                       <span className="font-medium">{faq.question}</span>
                       <svg 
                         className={`w-5 h-5 transform transition-transform duration-300 ${
                           isOpen ? 'rotate-180' : ''
                         }`} 
                         fill="currentColor" 
                         viewBox="0 0 20 20"
                       >
                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                       </svg>
                     </button>
                     <motion.div
                       initial={false}
                       animate={{
                         height: isOpen ? 'auto' : 0,
                         opacity: isOpen ? 1 : 0
                       }}
                       transition={{ duration: 0.3, ease: 'easeInOut' }}
                       className="overflow-hidden"
                     >
                       {isOpen && (
                         <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                           <p className="text-gray-700">{faq.answer}</p>
                         </div>
                       )}
                     </motion.div>
                   </motion.div>
                 );
               })}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}