"use client";

import { useState } from "react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { CountryDropdown } from "@/components/CountryDropdown";
import type { ZodIssue } from "zod";
import Image from "next/image";

// Helper: country name to phone code
const getCountryPhoneCode = (countryName: string): string => {
  const countryCodes: Record<string, string> = {
    Afghanistan: "+93",
    Albania: "+355",
    Algeria: "+213",
    Andorra: "+376",
    Angola: "+244",
    Argentina: "+54",
    Armenia: "+374",
    Australia: "+61",
    Austria: "+43",
    Azerbaijan: "+994",
    Bahamas: "+1",
    Bahrain: "+973",
    Bangladesh: "+880",
    Barbados: "+1",
    Belarus: "+375",
    Belgium: "+32",
    Belize: "+501",
    Benin: "+229",
    Bhutan: "+975",
    Bolivia: "+591",
    Brazil: "+55",
    Brunei: "+673",
    Bulgaria: "+359",
    Cambodia: "+855",
    Cameroon: "+237",
    Canada: "+1",
    Chile: "+56",
    China: "+86",
    Colombia: "+57",
    "Costa Rica": "+506",
    Croatia: "+385",
    Cuba: "+53",
    Cyprus: "+357",
    "Czech Republic": "+420",
    Denmark: "+45",
    Ecuador: "+593",
    Egypt: "+20",
    Estonia: "+372",
    Ethiopia: "+251",
    Finland: "+358",
    France: "+33",
    Germany: "+49",
    Ghana: "+233",
    Greece: "+30",
    Guatemala: "+502",
    Haiti: "+509",
    Honduras: "+504",
    "Hong Kong": "+852",
    Hungary: "+36",
    Iceland: "+354",
    India: "+91",
    Indonesia: "+62",
    Iran: "+98",
    Iraq: "+964",
    Ireland: "+353",
    Israel: "+972",
    Italy: "+39",
    Jamaica: "+1",
    Japan: "+81",
    Jordan: "+962",
    Kazakhstan: "+7",
    Kenya: "+254",
    Kuwait: "+965",
    Kyrgyzstan: "+996",
    Latvia: "+371",
    Lebanon: "+961",
    Libya: "+218",
    Lithuania: "+370",
    Luxembourg: "+352",
    Malaysia: "+60",
    Maldives: "+960",
    Malta: "+356",
    Mexico: "+52",
    Monaco: "+377",
    Mongolia: "+976",
    Morocco: "+212",
    Myanmar: "+95",
    Nepal: "+977",
    Netherlands: "+31",
    "New Zealand": "+64",
    Nigeria: "+234",
    "North Korea": "+850",
    Norway: "+47",
    Oman: "+968",
    Pakistan: "+92",
    Panama: "+507",
    Paraguay: "+595",
    Peru: "+51",
    Philippines: "+63",
    Poland: "+48",
    Portugal: "+351",
    Qatar: "+974",
    Romania: "+40",
    Russia: "+7",
    "Saudi Arabia": "+966",
    Senegal: "+221",
    Serbia: "+381",
    Singapore: "+65",
    Slovakia: "+421",
    Slovenia: "+386",
    "South Africa": "+27",
    "South Korea": "+82",
    Spain: "+34",
    "Sri Lanka": "+94",
    Sudan: "+249",
    Sweden: "+46",
    Switzerland: "+41",
    Syria: "+963",
    Taiwan: "+886",
    Thailand: "+66",
    Turkey: "+90",
    Ukraine: "+380",
    "United Arab Emirates": "+971",
    "United Kingdom": "+44",
    "United States": "+1",
    Uruguay: "+598",
    Uzbekistan: "+998",
    Venezuela: "+58",
    Vietnam: "+84",
    Yemen: "+967",
    Zimbabwe: "+263",
  };
  return countryCodes[countryName] || "+91";
};

type UserType =
  | "Coffee Estate Owner"
  | "Member of Farmer-Producer Organisation"
  | "Coffee Curing Works"
  | "Individual Farmer"
  | "Brokers / Traders";

const supplierFormSchema = z.object({
  userType: z.enum([
    "Coffee Estate Owner",
    "Member of Farmer-Producer Organisation",
    "Coffee Curing Works",
    "Individual Farmer",
    "Brokers / Traders",
  ]),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(5, "Mobile number is required"),
  country: z.string().min(1, "Country is required"),

  // Coffee Estate Owner
  estateName: z.string().optional(),
  estateOwnerName: z.string().optional(),
  surveyNumber: z.string().optional(),
  address: z.string().optional(),

  // Certifications & Organic (Estate Owner + FPO)
  certifications: z
    .array(
      z.enum([
        "UTZ Certified",
        "Rainforest Alliance",
        "Fairtrade",
        "Birdfriendly",
        "Nespresso AAA",
        "Starbucks C.A.F.E",
        "4C",
        "Any Other",
      ])
    )
    .optional(),
  otherCertificationName: z.string().optional(),
  isOrganic: z.enum(["Yes", "No"]).optional(),

  // FPO
  fpoName: z.string().optional(),
  fpoAddress: z.string().optional(),
  registrationNumber: z.string().optional(),
  memberName: z.string().optional(),

  // Curing Works
  promoterName: z.string().optional(),
  licenceNumber: z.string().optional(),
  curingWorksAddress: z.string().optional(),
  contactPerson: z.string().optional(),

  // Individual / Brokers
  fullName: z.string().optional(),
  aadharCardNumber: z.string().optional(),

  productsAvailable: z
    .string()
    .min(10, "Please describe your products (minimum 10 characters)"),
});

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function CoffeeSuppliersPage() {
  const [userType, setUserType] = useState<UserType>("Coffee Estate Owner");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    email: "",
    country: "India",
    mobileNumber: "",
    userType: "Coffee Estate Owner" as UserType,
    productsAvailable: "",

    estateName: "",
    estateOwnerName: "",
    surveyNumber: "",
    address: "",

    fpoName: "",
    fpoAddress: "",
    registrationNumber: "",
    memberName: "",

    promoterName: "",
    licenceNumber: "",
    curingWorksAddress: "",
    contactPerson: "",

    fullName: "",
    aadharCardNumber: "",

    certifications: [] as string[],
    otherCertificationName: "",
    isOrganic: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserType = e.target.value as UserType;
    setUserType(newUserType);
    setFormValues((prev) => ({ ...prev, userType: newUserType }));
    setErrors({});
  };

  const handleCertificationToggle = (cert: string, checked: boolean) => {
    setFormValues((prev) => {
      const current = Array.isArray(prev.certifications) ? prev.certifications : [];
      let next = current;
      if (checked) {
        if (!current.includes(cert)) next = [...current, cert];
      } else {
        next = current.filter((c) => c !== cert);
      }
      return { ...prev, certifications: next };
    });
    if (errors.certifications) setErrors((prev) => ({ ...prev, certifications: "" }));
  };

  const validateForm = () => {
    try {
      let validationSchema = supplierFormSchema;
      if (userType === "Coffee Estate Owner") {
        validationSchema = validationSchema.refine(
          (data) =>
            !!data.estateName &&
            !!data.estateOwnerName &&
            !!data.surveyNumber &&
            !!data.address,
          { message: "All Coffee Estate Owner fields are required", path: ["estateName"] }
        );
      } else if (userType === "Member of Farmer-Producer Organisation") {
        validationSchema = validationSchema.refine(
          (data) =>
            !!data.fpoName &&
            !!data.fpoAddress &&
            !!data.registrationNumber &&
            !!data.memberName,
          { message: "All FPO fields are required", path: ["fpoName"] }
        );
      } else if (userType === "Coffee Curing Works") {
        validationSchema = validationSchema.refine(
          (data) =>
            !!data.promoterName &&
            !!data.licenceNumber &&
            !!data.curingWorksAddress &&
            !!data.contactPerson,
          { message: "All Coffee Curing Works fields are required", path: ["promoterName"] }
        );
      } else if (userType === "Individual Farmer") {
        validationSchema = validationSchema.refine(
          (data) => !!data.fullName && !!data.aadharCardNumber,
          { message: "All Individual Farmer fields are required", path: ["fullName"] }
        );
      } else if (userType === "Brokers / Traders") {
        validationSchema = validationSchema.refine(
          (data) => !!data.fullName && !!data.registrationNumber && !!data.address,
          { message: "All Broker/Trader fields are required", path: ["fullName"] }
        );
      }

      validationSchema.parse(formValues);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: ZodIssue) => {
          if (err.path.length > 0) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    if (!validateEmail(formValues.email)) {
      toast.error("Please enter a valid email address.");
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      return;
    }

    setFormStatus("submitting");
    toast.loading("Submitting your registration...");

    try {
      const res = await fetch("/api/supplier-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          // ensure userType stays in sync
          userType,
        }),
      });

      const data = await res.json();
      toast.dismiss();
      if (!res.ok || !data.ok) {
        const message = data?.issues?.[0]?.message || data?.message || "Failed to submit registration.";
        toast.error(message);
        setFormStatus("error");
        return;
      }

      toast.success("Registration submitted successfully! Thank you for your interest.");
      setFormStatus("success");
      // Reset form
      setFormValues({
        email: "",
        country: "India",
        mobileNumber: "",
        userType: "Coffee Estate Owner" as UserType,
        productsAvailable: "",
        estateName: "",
        estateOwnerName: "",
        surveyNumber: "",
        address: "",
        fpoName: "",
        fpoAddress: "",
        registrationNumber: "",
        memberName: "",
        promoterName: "",
        licenceNumber: "",
        curingWorksAddress: "",
        contactPerson: "",
        fullName: "",
        aadharCardNumber: "",
        certifications: [],
        otherCertificationName: "",
        isOrganic: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.dismiss();
      toast.error("Failed to submit registration. Please try again.");
      setFormStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster />
      <section className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg mt-28 mb-12">
 
      <section className="py-8  lg:py-16 mt-10  lg:mt-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout (sm and below) — mirror Tablet Layout */}
          <div className="block sm:hidden ">
            <div className="grid grid-cols-3 gap-4">
              {/* Top Row */}
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Brokers.
              </div>
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Curing Works.
              </div>
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Estate Owners.
              </div>

              {/* Middle Row - Title */}
              <div className="col-span-3 bg-green-700 border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-2xl md:text-4xl font-bold text-white text-center font-serif">
                  Become a Coffee Supplier with Us
                </h1>
              </div>

              {/* Bottom Row */}
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Traders.
              </div>
              <div className=" bg-white text-xs border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Farmer Producer Company.
              </div>
              <div className=" bg-white border-2 text-xs border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                 Coffee Co-operatives.
              </div>

              {/* Bottom certificates row */}
              <div className="col-span-3 bg-white border-2 text-center border-gray-300 rounded-lg p-4 flex justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">
                Coffee Farmer Producer Organisation.
              </div>
            </div>
          </div>

          {/* Tablet Layout (sm to lg) */}
          <div className="hidden sm:block lg:hidden ">
            <div className="grid grid-cols-3 gap-4">
              {/* Top Row */}
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Brokers.
              </div>
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Curing Works.
              </div>
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Estate Owners.
              </div>
              
              {/* Middle Row - Title */}
              <div className="col-span-3 bg-green-700 border-2 border-gray-300 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center font-serif">
                  Become a Coffee Supplier with Us
                </h1>
              </div>
              
              {/* Bottom Row */}
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Traders.
              </div>
              <div className=" bg-white text-sm  border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Farmer Producer Company.
              </div>
              <div className=" bg-white border-2 text-sm border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                 Coffee Co-operatives.
              </div>
              
              {/* Bottom certificates row */}
              <div className="col-span-3 bg-white border-2 text-center border-gray-300 rounded-lg p-6 flex justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">
               
                Coffee Farmer Producer Organisation.
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg and above) - Original Design Enhanced */}
          <div className="hidden lg:flex justify-center items-center">
            {/* Column 1 */}
            <div className="flex flex-col">
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Coffee Brokers.
              </div>
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              Coffee Farmer Producer Company.
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="p-6 h-[20vh] w-[20vw] text-xl text-black font-semibold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Coffee Curing Works.
                </div>
                <div className="p-6 h-[20vh] w-[20vw] text-xl text-black font-semibold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                 Coffee Estate Owners
                </div>
              </div>

              <div className="p-6 h-[20vh] w-[40vw] bg-green-700 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl xl:text-6xl leading-tight font-bold text-white text-center font-serif">
                     Become a Coffee Supplier with Us
                </h1>
              </div>

              <div className="h-[20vh] w-[40vw] bg-white border-2 text-xl text-black font-semibold border-gray-300 rounded-lg flex flex-row justify-center items-center gap-10 hover:shadow-xl transition-all duration-300 hover:scale-105">
                Coffee Farmer Producer Organisation.
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Coffee Traders.
              </div>
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Coffee<br/> Co-operatives.
              </div>
            </div>
          </div>
        </div>
      </section>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
              required
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country *
            </label>
            <CountryDropdown
              selectedCountry={formValues.country || ""}
              onSelectCountry={(value: string) => {
                setFormValues((prev) => ({ ...prev, country: value }));
              }}
              error={!!errors.country}
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number *
            </label>
            <div className="flex items-center space-x-2">
              <div className="w-1/4">
                <div className="mt-1 flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50">
                  <span className="text-gray-700">{getCountryPhoneCode(formValues.country)}</span>
                </div>
              </div>
              <div className="w-3/4">
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formValues.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                />
              </div>
            </div>
            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
            )}
          </div>

          {/* User Type */}
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
              I Am A *
            </label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
              required
            >
              <option value="Coffee Estate Owner">Coffee Estate Owner</option>
              <option value="Member of Farmer-Producer Organisation">Member of Farmer-Producer Organisation</option>
              <option value="Coffee Curing Works">Coffee Curing Works</option>
              <option value="Individual Farmer">Individual Farmer</option>
              <option value="Brokers / Traders">Brokers / Traders</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {userType === "Coffee Estate Owner" && (
            <>
              <div>
                <label htmlFor="estateName" className="block text-sm font-medium text-gray-700">
                  Name of the Estate *
                </label>
                <input
                  type="text"
                  id="estateName"
                  name="estateName"
                  value={formValues.estateName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.estateName && (
                  <p className="mt-1 text-sm text-red-600">{errors.estateName}</p>
                )}
              </div>

              <div>
                <label htmlFor="estateOwnerName" className="block text-sm font-medium text-gray-700">
                  Name of the Estate Owner *
                </label>
                <input
                  type="text"
                  id="estateOwnerName"
                  name="estateOwnerName"
                  value={formValues.estateOwnerName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.estateOwnerName && (
                  <p className="mt-1 text-sm text-red-600">{errors.estateOwnerName}</p>
                )}
              </div>

              <div>
                <label htmlFor="surveyNumber" className="block text-sm font-medium text-gray-700">
                  Survey Number *
                </label>
                <input
                  type="text"
                  id="surveyNumber"
                  name="surveyNumber"
                  value={formValues.surveyNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.surveyNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.surveyNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* Certifications */}
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-700">Which of the following certifications do you have?</p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["UTZ Certified","Rainforest Alliance","Fairtrade","Birdfriendly","Nespresso AAA","Starbucks C.A.F.E","4C","Any Other"].map((cert) => (
                    <label key={cert} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={Array.isArray(formValues.certifications) && formValues.certifications.includes(cert)}
                        onChange={(e) => handleCertificationToggle(cert, e.target.checked)}
                        className="h-4 w-4 text-coffee-brown border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Any Other Certification Name */}
              {Array.isArray(formValues.certifications) && formValues.certifications.includes("Any Other") && (
                <div>
                  <label htmlFor="otherCertificationName" className="block text-sm font-medium text-gray-700">
                    Any Other - Name of the other Certified Coffee
                  </label>
                  <input
                    type="text"
                    id="otherCertificationName"
                    name="otherCertificationName"
                    value={formValues.otherCertificationName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  />
                </div>
              )}

              {/* Organic */}
              <div>
                <p className="text-sm font-medium text-gray-700">Is your coffee grown under Organic?</p>
                <div className="mt-2 flex items-center space-x-6">
                  {(["Yes","No"] as const).map((opt) => (
                    <label key={opt} className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="isOrganic"
                        value={opt}
                        checked={formValues.isOrganic === opt}
                        onChange={handleChange}
                        className="h-4 w-4 text-coffee-brown border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {userType === "Member of Farmer-Producer Organisation" && (
            <>
              <div>
                <label htmlFor="fpoName" className="block text-sm font-medium text-gray-700">
                  Name of the FPO *
                </label>
                <input
                  type="text"
                  id="fpoName"
                  name="fpoName"
                  value={formValues.fpoName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.fpoName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fpoName}</p>
                )}
              </div>

              <div>
                <label htmlFor="fpoAddress" className="block text-sm font-medium text-gray-700">
                  Address of the FPO *
                </label>
                <textarea
                  id="fpoAddress"
                  name="fpoAddress"
                  value={formValues.fpoAddress}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.fpoAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.fpoAddress}</p>
                )}
              </div>

              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                  Registration Number (CIN) of the FPO *
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formValues.registrationNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">
                  Name of the Member / CEO of the FPO *
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={formValues.memberName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.memberName && (
                  <p className="mt-1 text-sm text-red-600">{errors.memberName}</p>
                )}
              </div>

              {/* Certifications */}
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-700">Which of the following certifications do you have?</p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["UTZ Certified","Rainforest Alliance","Fairtrade","Birdfriendly","Nespresso AAA","Starbucks C.A.F.E","4C","Any Other"].map((cert) => (
                    <label key={cert} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={Array.isArray(formValues.certifications) && formValues.certifications.includes(cert)}
                        onChange={(e) => handleCertificationToggle(cert, e.target.checked)}
                        className="h-4 w-4 text-coffee-brown border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Any Other Certification Name */}
              {Array.isArray(formValues.certifications) && formValues.certifications.includes("Any Other") && (
                <div>
                  <label htmlFor="otherCertificationName" className="block text-sm font-medium text-gray-700">
                    Any Other - Name of the other Certified Coffee
                  </label>
                  <input
                    type="text"
                    id="otherCertificationName"
                    name="otherCertificationName"
                    value={formValues.otherCertificationName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  />
                </div>
              )}

              {/* Organic */}
              <div>
                <p className="text-sm font-medium text-gray-700">Is your coffee grown under Organic?</p>
                <div className="mt-2 flex items-center space-x-6">
                  {(["Yes","No"] as const).map((opt) => (
                    <label key={opt} className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="isOrganic"
                        value={opt}
                        checked={formValues.isOrganic === opt}
                        onChange={handleChange}
                        className="h-4 w-4 text-coffee-brown border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {userType === "Coffee Curing Works" && (
            <>
              <div>
                <label htmlFor="promoterName" className="block text-sm font-medium text-gray-700">
                  Name of the Promoter / Owner *
                </label>
                <input
                  type="text"
                  id="promoterName"
                  name="promoterName"
                  value={formValues.promoterName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.promoterName && (
                  <p className="mt-1 text-sm text-red-600">{errors.promoterName}</p>
                )}
              </div>

              <div>
                <label htmlFor="licenceNumber" className="block text-sm font-medium text-gray-700">
                  Licence Number of the Coffee Curing Works *
                </label>
                <input
                  type="text"
                  id="licenceNumber"
                  name="licenceNumber"
                  value={formValues.licenceNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.licenceNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.licenceNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="curingWorksAddress" className="block text-sm font-medium text-gray-700">
                  Address of the Coffee Curing Works *
                </label>
                <textarea
                  id="curingWorksAddress"
                  name="curingWorksAddress"
                  value={formValues.curingWorksAddress}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.curingWorksAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.curingWorksAddress}</p>
                )}
              </div>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                  Contact Person *
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formValues.contactPerson}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.contactPerson && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>
                )}
              </div>
            </>
          )}

          {userType === "Individual Farmer" && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="aadharCardNumber" className="block text-sm font-medium text-gray-700">
                  Aadhar Card Number *
                </label>
                <input
                  type="text"
                  id="aadharCardNumber"
                  name="aadharCardNumber"
                  value={formValues.aadharCardNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.aadharCardNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.aadharCardNumber}</p>
                )}
              </div>
            </>
          )}

          {userType === "Brokers / Traders" && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                  Registration Number *
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formValues.registrationNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </>
          )}

          {/* Products Available */}
          <div>
            <label htmlFor="productsAvailable" className="block text-sm font-medium text-gray-700">
              Products Available *
            </label>
            <textarea
              id="productsAvailable"
              name="productsAvailable"
              value={formValues.productsAvailable}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-coffee-brown focus:border-coffee-brown"
              placeholder="Please describe the products you have..."
              required
            />
            {errors.productsAvailable && (
              <p className="mt-1 text-sm text-red-600">{errors.productsAvailable}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coffee-brown hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-brown"
            >
              {formStatus === "submitting" ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
