'use client';

import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { contactFormSchema } from '@/lib/validation';
import { CountryDropdown } from '@/components/CountryDropdown';
import { SearchableCountrySelect } from '@/components/SearchableCountrySelect';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface GeneralContactFormProps {
  initial?: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    postalCode: string;
    linkedin: string;
    subject: string;
    message: string;
    consent: boolean;
  }>;
  submitLabel?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

export default function GeneralContactForm({
  initial = {},
  submitLabel = 'Submit Enquiry',
  onSuccess,
  isModal = false
}: GeneralContactFormProps) {
  // Form state
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    postalCode: '',
    linkedin: '',
    subject: '',
    message: '',
    consent: false,
    ...initial
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);



  // Handle input blur for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle phone number change
  const handlePhoneChange = (value: string | undefined) => {
    setValues(prev => ({
      ...prev,
      phone: value || ''
    }));

    // Clear error when user starts typing again
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  // Handle country selection from dropdown
  const handleCountrySelect = (country: string) => {
    setValues(prev => ({
      ...prev,
      country
    }));
    
    // Clear error when user selects a country
    if (errors.country) {
      setErrors(prev => ({
        ...prev,
        country: ''
      }));
    }
  };



  // Validate a single field
  const validateField = (name: string, value: any) => {
    try {
      // Create a partial schema for just this field
      const fieldSchema = z.object({
        [name]: contactFormSchema.shape[name as keyof typeof contactFormSchema.shape]
      });
      
      // Validate just this field
      fieldSchema.parse({ [name]: value });
      
      // Clear error if validation passes
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set the error message for this field
        const fieldError = error.issues.find((err: any) => err.path[0] === name);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [name]: fieldError.message
          }));
        }
      }
    }
  };

  // Validate all fields
  const validateForm = () => {
    const formData = {
      ...values,
      // Combine fields as needed for validation
    };

    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: any) => {
          const path = err.path[0] as string;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);

        // Show toast for first error
        const firstError = error.issues[0];
        toast.error(`Please check: ${String(firstError.message)}`);

        // Scroll to first error field
        const firstErrorField = document.querySelector(`[name="${String(firstError.path[0])}"]`);
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setServerError(null);

    // Validate captcha
    if (!captchaValue) {
      setCaptchaError('Please verify that you are not a robot');
      setStatus('idle');
      toast.error('Please complete the CAPTCHA verification');
      return;
    } else {
      setCaptchaError(null);
    }

    // Validate form
    if (!validateForm()) {
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          captchaToken: captchaValue
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        toast.success('Message sent successfully!');
        
        // Reset form
         setValues({
           firstName: '',
           lastName: '',
           email: '',
           phone: '',
           country: '',
           postalCode: '',
           linkedin: '',
           subject: '',
           message: '',
           consent: false,
         });
        
        // Reset captcha
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setCaptchaValue(null);
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setStatus('error');
        setServerError(data.error || 'Something went wrong. Please try again.');
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setServerError('Network error. Please check your connection and try again.');
      toast.error('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className=''>
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto ">
      {/* First Name and Last Name (side by side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            placeholder="Your first name"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            placeholder="Your last name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Phone Number with Country Code */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          international
          countryCallingCodeEditable={true}
          defaultCountry="US"
          value={values.phone}
          onChange={handlePhoneChange}
          countrySelectComponent={SearchableCountrySelect}
          className={`w-full ${errors.phone ? 'phone-input-error' : ''}`}
          style={{
            '--PhoneInputCountryFlag-height': '1em',
            '--PhoneInput-color--focus': '#2563eb',
          } as React.CSSProperties}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Country with Searchable Dropdown */}
      <div className=''>
        <label htmlFor="country" className="block text-sm  font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <CountryDropdown 
          selectedCountry={values.country}
          onSelectCountry={handleCountrySelect}
          error={!!errors.country}
          
        />
        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
      </div>

      {/* Postal/Zip Code */}
      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
          Postal/Zip Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={values.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.postalCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          placeholder="Postal/Zip code"
        />
        {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
      </div>

      {/* LinkedIn ID */}
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn Profile URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={values.linkedin}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.linkedin ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          placeholder="URL of your LinkedIn profile"
        />
        {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
      </div>

      {/* Subject */}
      {/* <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.subject ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          placeholder="Your Query..."
        />
        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
      </div> */}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          placeholder="Explain your enquiry in details..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={handleChange}
            className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="consent" className="font-medium text-gray-700">
            I consent to having my data processed *
          </label>
          <p className="text-gray-500 text-xs mt-1">
            Your personal information will be used to process your request and support your experience throughout this website.
          </p>
          {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div className="flex flex-col items-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={(value) => {
            setCaptchaValue(value);
            setCaptchaError(null);
          }}
          onExpired={() => {
            setCaptchaValue(null);
            setCaptchaError("CAPTCHA has expired, please verify again");
          }}
          onErrored={() => {
            setCaptchaError("Error loading CAPTCHA, please refresh the page");
          }}
        />
        {captchaError && <p className="mt-2 text-sm text-red-600">{captchaError}</p>}
        <p className="text-xs text-gray-500 mt-2">This site is protected by reCAPTCHA.</p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`px-6 py-3 text-white font-medium rounded-md shadow-sm ${status === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
        >
          {status === 'submitting' ? (
            <>
              <span className="inline-block animate-spin mr-2">⟳</span> Sending...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>

      {/* Success/Error Messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 font-medium">Thank you for your message! We&apos;ll be in touch soon.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 font-medium">{serverError || 'Something went wrong. Please try again.'}</p>
        </div>
      )}
    </form>
    </div>
  );
}