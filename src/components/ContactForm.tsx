"use client";
import { useState } from "react";
import { z } from "zod";
import { contactFormSchema, type ContactFormInput } from "@/lib/validation";

type ContactFormProps = {
  initial?: Partial<ContactFormInput>;
  submitLabel?: string;
  onSuccess?: () => void;
  isModal?: boolean;
};

export default function ContactForm({ initial, submitLabel = "Send Message", onSuccess, isModal = false }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    country: "",
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
    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const fl = result.error.flatten();
      Object.entries(fl.fieldErrors).forEach(([k, v]) => {
        if (v && v.length) fieldErrors[k] = v[0] as string;
      });
      setErrors(fieldErrors);
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
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Submission failed");
      }
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", phone: "", country: "", linkedin: "", product: "", grade: "", quantity: undefined, consent: false } as ContactFormInput);
      onSuccess?.();
    } catch (err: any) {
      setServerError(err.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Enquiry Context (when provided) */}
      {(values.product || values.grade) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-amber-800 mb-2">Product Enquiry</h3>
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
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="Your name"
            required
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            placeholder="you@example.com"
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
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
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="How can we help?"
          required
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
          placeholder="Write your message..."
          required
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
          required
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to the processing of my personal data according to the Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#61714D] px-6 py-3 text-white font-medium hover:bg-[#4D5A3E] transition-colors disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>

      {status === "success" && (
        <p className="text-green-700 text-sm">Thank you! Your message has been sent.</p>
      )}
      {status === "error" && serverError && (
        <p className="text-red-700 text-sm">{serverError}</p>
      )}
    </form>
  );
}