"use client";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { contactFormSchema, type ContactFormInput } from "@/lib/validation";
import { CountryDropdown } from "@/components/CountryDropdown";
import { SearchableCountrySelect } from "@/components/SearchableCountrySelect";

type ContactFormProps = {
  initial?: Partial<ContactFormInput>;
  submitLabel?: string;
  onSuccess?: () => void;
  isModal?: boolean;
};

export default function ContactForm({ initial, submitLabel = "Send Message", onSuccess, isModal = false }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormInput>({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    country: "",
    postalCode: "",
    linkedin: "",
    product: "",
    grade: "",
    quantity: undefined,
    consent: false,
    ...(initial as any),
  } as ContactFormInput);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Add validation feedback on field blur
  const handleBlur = (fieldName: string) => {
    const fieldValue = values[fieldName as keyof ContactFormInput];
    
    try {
      // Extract just this field's schema
      const fieldSchema = z.object({ [fieldName]: contactFormSchema.shape[fieldName as keyof typeof contactFormSchema.shape] });
      fieldSchema.parse({ [fieldName]: fieldValue });
      
      // Clear error if validation passes
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: "" }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
        if (fieldErrors[fieldName]) {
          setErrors(prev => ({ ...prev, [fieldName]: fieldErrors[fieldName][0] }));
        }
      } else if (!fieldValue && ['name', 'firstName', 'lastName', 'email', 'subject', 'message', 'phone', 'country', 'postalCode', 'linkedin', 'consent'].includes(fieldName)) {
        setErrors(prev => ({ ...prev, [fieldName]: 'This field is required' }));
      }
    }
  };
  
  // Handle blur for input elements
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    handleBlur(name);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (data: ContactFormInput) => {
    // For product enquiry forms, make product and grade required
    const isProductEnquiry = initial?.product || initial?.grade;
    
    let result;
    if (isProductEnquiry) {
      // Create a schema with required product and grade fields
      const productEnquirySchema = contactFormSchema.merge(
        z.object({
          product: z.string().min(1, "Product is required"),
          grade: z.string().min(1, "Grade is required")
        })
      );
      result = productEnquirySchema.safeParse(data);
    } else {
      result = contactFormSchema.safeParse(data);
    }
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const fl = result.error.flatten();
      Object.entries(fl.fieldErrors).forEach(([k, v]) => {
        if (v && v.length) fieldErrors[k] = v[0] as string;
      });
      setErrors(fieldErrors);
      
      // Show specific error toast for validation
      const missingFields = Object.keys(fieldErrors).map(field => {
        const fieldNames: Record<string, string> = {
          name: 'Name',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          subject: 'Subject', 
          message: 'Message',
          consent: 'Privacy Policy Agreement',
          phone: 'Phone',
          country: 'Country',
          postalCode: 'Postal Code',
          linkedin: 'LinkedIn',
          product: 'Product',
          grade: 'Grade'
        };
        return fieldNames[field] || field;
      });
      
      const errorMessage = missingFields.length === 1 
        ? `❌ Please fill in: ${missingFields[0]}`
        : `❌ Please fill in: ${missingFields.join(', ')}`;
      
      toast.error(errorMessage, {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500'
        }
      });
      
      // Scroll to first error field
      const firstErrorField = Object.keys(fieldErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setServerError(null);

    const payload: ContactFormInput = { ...values };
    if (!validate(payload)) {
      setStatus("error");
      // Toast notification is already handled in validate() function
      return;
    }
    
    // Check CAPTCHA
    if (!captchaValue) {
      toast.error('❌ Please complete the CAPTCHA verification', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500'
        }
      });
      setStatus("error");
      return;
    }

    try {
      // Prepare form data with name field for backward compatibility
      const formData = {
        ...payload,
        name: values.firstName && values.lastName ? `${values.firstName} ${values.lastName}` : values.name,
        captchaToken: captchaValue
      };
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }
      setStatus("success");
      setValues({ name: "", firstName: "", lastName: "", email: "", subject: "", message: "", phone: "", country: "", postalCode: "", linkedin: "", product: "", grade: "", quantity: undefined, consent: false } as ContactFormInput);
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
      
      // Show success toast
      toast.success('✅ Message sent successfully! We\'ll get back to you soon.', {
        duration: 5000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: '500'
        }
      });
      
      onSuccess?.();
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
      setStatus("error");
      
      // Show error toast
      toast.error(`❌ Failed to send message: ${err.message || "Please try again later."}`, {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500'
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Enquiry Context (when provided) */}
      {(values.product || values.grade) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          {/* <h3 className="text-lg font-medium text-green-600 mb-2">Green Coffee Beans</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {values.product && (
              <div>
                <span className="text-amber-700 font-medium">Product:</span>
                <p className="text-amber-900">{values.product}</p>
              </div>
            )}
            {values.grade && (
              <div>
                <span className="text-amber-700 font-medium">Grade:</span>
                <p className="text-amber-900">{values.grade}</p>
              </div>
            )}
            <div>
              <label className="block text-amber-700 font-medium mb-1">Quantity (MT)</label>
              <input
                type="number"
                name="quantity"
                value={values.quantity || ""}
                onChange={handleChange}
                className="w-full px-3 py-1 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
                placeholder="0"
                min="0"
                step="1"
              />
              {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={() => handleBlur('firstName')}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
              errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Your first name"
            required
          />
          {errors.firstName && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={() => handleBlur('lastName')}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
              errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Your last name"
            required
          />
          {errors.lastName && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
              errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="you@example.com"
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <PhoneInput
            international
            defaultCountry="IN"
            name="phone"
            value={values.phone}
            onChange={(value: string | undefined) => {
              setValues((prev) => ({
                ...prev,
                phone: value || "",
              }));
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            countrySelectComponent={SearchableCountrySelect}
            countryCallingCodeEditable={true}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country *</label>
          <CountryDropdown
            selectedCountry={values.country}
            onSelectCountry={(val) => {
              setValues((prev) => ({
                ...prev,
                country: val,
              }));
              if (errors.country) {
                setErrors((prev) => ({ ...prev, country: "" }));
              }
            }}
            error={!!errors.country}
          />
          {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code / ZIP Code *</label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode || ""}
            onChange={handleChange}
            onBlur={handleInputBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="110001"
            required
          />
          {errors.postalCode && <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn *</label>
        <input
          type="url"
          name="linkedin"
          value={values.linkedin || ""}
          onChange={handleChange}
          onBlur={handleInputBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="https://www.linkedin.com/in/priyaviratsingh/"
          required
        />
        {errors.linkedin && <p className="text-sm text-red-600 mt-1">{errors.linkedin}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={() => handleBlur('subject')}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
            errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          placeholder="What is your enquiry about?"
          required
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          rows={5}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
            errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          placeholder="Please write your instructions here"
          required
        />
        {errors.message && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={handleChange}
          onBlur={() => handleBlur('consent')}
          className={`mt-1 h-4 w-4 rounded text-amber-700 focus:ring-amber-600 ${
            errors.consent ? 'border-red-300' : 'border-gray-300'
          }`}
          required
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to the processing of my personal data according to the Privacy Policy. <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.consent}</p>}

      {/* CAPTCHA */}
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={(value) => setCaptchaValue(value)}
          onExpired={() => setCaptchaValue(null)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#61714D] px-6 py-3 text-white font-medium hover:bg-[#4D5A3E] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" && (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>

      {/* Legacy status messages (keeping as fallback) */}
      {status === "success" && (
        <p className="text-green-700 text-sm">Thank you! Your message has been sent.</p>
      )}
      {status === "error" && serverError && (
        <p className="text-red-700 text-sm">{serverError}</p>
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </form>
  );
}