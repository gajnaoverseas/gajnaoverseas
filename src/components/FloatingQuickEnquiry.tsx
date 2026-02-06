"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import Image from "next/image"; // Moved to top
import PhoneInput from 'react-phone-number-input';
import type { CountryCode } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import { toast } from 'react-hot-toast';
import { SearchableCountrySelect } from '@/components/SearchableCountrySelect';
import ReCAPTCHA from "react-google-recaptcha";

// Wrapper to force upward direction
const CountrySelectUp = (props: any) => (
    <SearchableCountrySelect {...props} direction="up" />
);

interface FormData {
    name: string;
    email: string;
    phone: string;
    website: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function FloatingQuickEnquiry() {
    const [isVisible, setIsVisible] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        website: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [phoneCountry, setPhoneCountry] = useState<CountryCode | undefined>('US' as CountryCode);
    const reappearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const captchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
    const isLocalhost = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    const captchaEnabled = Boolean(captchaSiteKey) && !isLocalhost;

    // Auto-reappear after 30 seconds when closed
    useEffect(() => {
        if (!isVisible) {
            reappearTimeoutRef.current = setTimeout(() => {
                setIsVisible(true);
            }, 30000); // 30 seconds
        }

        return () => {
            if (reappearTimeoutRef.current) {
                clearTimeout(reappearTimeoutRef.current);
            }
        };
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handlePhoneChange = (value: string | undefined) => {
        setFormData(prev => ({ ...prev, phone: value || '' }));
        if (errors.phone) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.phone;
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (captchaEnabled && !captchaValue) {
            setCaptchaError('Please verify that you are not a robot');
            toast.error('Please complete the CAPTCHA verification');
            return;
        } else {
            setCaptchaError(null);
        }

        setStatus('submitting');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.name.split(' ')[0] || formData.name,
                    lastName: formData.name.split(' ').slice(1).join(' ') || '',
                    email: formData.email,
                    phone: formData.phone,
                    linkedin: formData.website,
                    subject: 'Quick Enquiry (Floating Form)',
                    message: formData.message,
                    country: '',
                    postalCode: '',
                    consent: true,
                    captchaToken: captchaValue
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                toast.success('Enquiry sent successfully!');

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    website: '',
                    message: ''
                });

                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                setCaptchaValue(null);

                // Redirect to Thank You page
                window.location.href = '/thank-you';
            } else {
                setStatus('error');
                toast.error(data.error || 'Failed to send enquiry');
            }
        } catch (error) {
            setStatus('error');
            toast.error('Network error. Please try again.');
        }
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-24 right-4 z-[9999] flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 animate-in fade-in duration-300"
                aria-label="Open Quick Enquiry"
                title="Quick Enquiry"
            >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">Quick Enquiry</span>
            </button>
        );
    }

    return (
        <div
            className="fixed bottom-24 right-4 z-[9999]"
            style={{ width: 'min(92vw, 340px)' }}
        >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 animate-in slide-in-from-right duration-300">
                {/* Header with Close Button */}
                <div className="bg-gradient-to-r from-green-700 to-green-800 p-3 relative flex items-center justify-between rounded-t-xl">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded-md">
                            <Image
                                src="/newlogo.webp"
                                alt="Gajna Logo"
                                width={80}
                                height={40}
                                className="h-6 w-auto object-contain"
                            />
                        </div>
                        <h3 className="text-white text-base font-bold">
                            Quick Enquiry
                        </h3>
                    </div>

                    {/* Prominent Close Button - Positioned absolute or flex */}
                    <button
                        onClick={handleClose}
                        className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110"
                        aria-label="Close form"
                        title="Close (reappears in 30 seconds)"
                    >
                        <X className="w-4 h-4" strokeWidth={3} />
                    </button>
                </div>

                {/* Compact Form */}
                <form onSubmit={handleSubmit} className="p-3 space-y-3">
                    {/* Your Name */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full px-3 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                }`}
                            placeholder="Your first name"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
                    </div>

                    {/* Your Email */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Your Email *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-3 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                }`}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Your Mobile No with Country Flag */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Your Mobile No *</label>
                        <div className={`floating-phone-input ${errors.phone ? 'phone-error' : ''}`}>
                            <PhoneInput
                                international
                                countryCallingCodeEditable={true}
                                defaultCountry="US"
                                country={phoneCountry}
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                onCountryChange={(code?: CountryCode) => setPhoneCountry(code)}
                                countrySelectComponent={SearchableCountrySelect}
                                placeholder="Enter phone number"
                                className="w-full text-sm"
                            />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
                    </div>

                    {/* Your Company Website */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Your Company Website</label>
                        <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Your Message */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Your Message *</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            rows={2}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                }`}
                            placeholder="How can we help you?"
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-0.5">{errors.message}</p>}
                    </div>

                    {captchaEnabled && (
                        <div className="flex justify-center">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={captchaSiteKey}
                                onChange={(value) => setCaptchaValue(value)}
                                onExpired={() => setCaptchaValue(null)}
                            />
                        </div>
                    )}
                    {captchaError && <p className="text-xs text-red-500 mt-0.5">{captchaError}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`w-full py-2 text-white text-sm font-semibold rounded-lg transition-all ${status === 'submitting'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-700 hover:bg-green-800'
                            }`}
                    >
                        {status === 'submitting' ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            'Send Enquiry'
                        )}
                    </button>
                </form>
            </div>

            {/* Custom styles for compact phone input */}
            <style jsx global>{`
        .floating-phone-input .PhoneInput {
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.15rem 0.15rem 0.15rem 0.5rem;
        }
        
        .floating-phone-input .PhoneInputInput {
          border: none !important;
          outline: none !important;
          padding: 0.25rem 0.5rem !important;
          font-size: 0.875rem !important;
        }
        
        .floating-phone-input .PhoneInputInput:focus {
          box-shadow: none !important;
        }
        
        .floating-phone-input.phone-error .PhoneInput {
          border-color: #f87171;
          background-color: #fef2f2;
        }
        
        .floating-phone-input .PhoneInputCountrySelect {
          font-size: 0.875rem;
        }
        
        .floating-phone-input .PhoneInputCountryIcon {
          width: 1.25em;
          height: 1em;
        }
      `}</style>
        </div>
    );
}
