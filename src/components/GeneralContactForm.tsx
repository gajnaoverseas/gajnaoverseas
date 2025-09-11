"use client";
import { useState } from "react";
import { z } from "zod";
import toast, { Toaster } from 'react-hot-toast';

// Simplified schema for general contact forms (no product/grade fields)
const generalContactSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email address"),
  subject: z
    .string({ message: "Subject is required" })
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be at most 150 characters"),
  message: z
    .string({ message: "Message is required" })
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number seems too short")
    .max(20, "Phone number seems too long")
    .regex(/^[+\d\s().-]+$/, "Please enter a valid phone number")
    .optional(),
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be at most 100 characters")
    .optional(),
  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code must be at least 3 characters")
    .max(20, "Postal code must be at most 20 characters")
    .regex(/^[A-Za-z0-9\s-]+$/, "Please enter a valid postal code")
    .optional(),
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn profile URL")
    .optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to data processing"
  }),
});

type GeneralContactInput = z.infer<typeof generalContactSchema>;

type GeneralContactFormProps = {
  initial?: Partial<GeneralContactInput>;
  submitLabel?: string;
  onSuccess?: () => void;
  isModal?: boolean;
};

export default function GeneralContactForm({ initial, submitLabel = "Send Message", onSuccess, isModal = false }: GeneralContactFormProps) {
  const [values, setValues] = useState<GeneralContactInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    country: "",
    postalCode: "",
    linkedin: "",
    consent: false,
    ...(initial as any),
  } as GeneralContactInput);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // Add validation feedback on field blur
  const handleBlur = (fieldName: string) => {
    const fieldValue = values[fieldName as keyof GeneralContactInput];
    if (!fieldValue && ['name', 'email', 'subject', 'message', 'consent'].includes(fieldName)) {
      setErrors(prev => ({ ...prev, [fieldName]: 'This field is required' }));
    } else if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
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

  const validate = (data: GeneralContactInput) => {
    const result = generalContactSchema.safeParse(data);
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
          email: 'Email',
          subject: 'Subject', 
          message: 'Message',
          consent: 'Privacy Policy Agreement',
          phone: 'Phone',
          country: 'Country',
          postalCode: 'Postal Code',
          linkedin: 'LinkedIn'
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
    console.log('General form submission started', { values, isModal });
    
    setStatus("submitting");
    setServerError(null);

    const payload: GeneralContactInput = { ...values };
    console.log('General form payload prepared:', payload);
    
    if (!validate(payload)) {
      console.log('General form validation failed');
      setStatus("error");
      return;
    }
    
    console.log('General form validation passed, sending request');

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      console.log('General form response received:', res.status, res.statusText);
      const json = await res.json();
      console.log('General form response JSON:', json);
      
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }
      
      console.log('General form submitted successfully');
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", phone: "", country: "", postalCode: "", linkedin: "", consent: false } as GeneralContactInput);
      
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
      console.error('General form submission error:', err);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-600 focus:ring-amber-600 ${
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
            required
          />
          {errors.name && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.name}</p>}
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
            placeholder="your.email@example.com"
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={values.phone || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="+91 98117 89665"
          />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={values.country || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="India"
          />
          {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code / ZIP Code</label>
          <input
            type="text"
            name="postalCode"
            value={values.postalCode || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="110001"
          />
          {errors.postalCode && <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          value={values.linkedin || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="https://www.linkedin.com/in/username"
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
          placeholder="How can we help?"
          required
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1 flex items-center"><span className="mr-1">⚠️</span>{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
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
          placeholder="Write your message..."
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