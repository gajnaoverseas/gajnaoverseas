'use client';

import React, { useState, useRef } from 'react';
import { Building2, User, Truck, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';

interface FormData {
  // Company Details
  companyName: string;
  companyAddress: string;
  countryName: string;
  companyPhone: string;
  companyFax: string;
  companyMobile: string;
  companyEmail: string;
  companyWebsite: string;
  companyLinkedIn: string;
  
  // Contact Person
  contactName: string;
  contactLinkedIn: string;
  contactMobile: string;
  contactEmail: string;
  
  // Logistics Details
  coffeeGrade: string;
  hsnCode: string;
  estimatedQuantity: string;
  packagingRequirements: string;
  portOfLoading: string;
  portOfDispatch: string;
  preshipmentAgency: string;
  preshipmentRequirements: string;
  deliveryDuration: string;
}

const TradeEnquiryPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyAddress: '',
    countryName: '',
    companyPhone: '',
    companyFax: '',
    companyMobile: '',
    companyEmail: '',
    companyWebsite: '',
    companyLinkedIn: '',
    contactName: '',
    contactLinkedIn: '',
    contactMobile: '',
    contactEmail: '',
    coffeeGrade: '',
    hsnCode: '',
    estimatedQuantity: '',
    packagingRequirements: '',
    portOfLoading: '',
    portOfDispatch: '',
    preshipmentAgency: '',
    preshipmentRequirements: '',
    deliveryDuration: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaValue) {
      setCaptchaError('Please complete the reCAPTCHA verification');
      return;
    }

    try {
      const submissionData = {
        ...formData,
        captchaToken: captchaValue
      };
      
      // Log the data being sent for debugging
      console.log('Submitting trade enquiry data:', submissionData);
      
      const response = await fetch('/api/trade-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      const result = await response.json();
      console.log('API response:', result);
      
      if (response.ok && result.success) {
        alert('Trade enquiry submitted successfully! We will contact you soon.');
        
        // Reset form and captcha
        setFormData({
          companyName: '',
          companyAddress: '',
          countryName: '',
          companyPhone: '',
          companyFax: '',
          companyMobile: '',
          companyEmail: '',
          companyWebsite: '',
          companyLinkedIn: '',
          contactName: '',
          contactLinkedIn: '',
          contactMobile: '',
          contactEmail: '',
          coffeeGrade: '',
          hsnCode: '',
          estimatedQuantity: '',
          packagingRequirements: '',
          portOfLoading: '',
          portOfDispatch: '',
          preshipmentAgency: '',
          preshipmentRequirements: '',
          deliveryDuration: ''
        });
        
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setCaptchaValue(null);
        setCaptchaError(null);
        setFieldErrors({});
        
        // Reset to first step
        setCurrentStep(1);
      } else {
        // Handle validation errors
        if (result.issues && result.issues.fieldErrors) {
          setFieldErrors(result.issues.fieldErrors);
        }
        throw new Error(result.error || 'Failed to submit trade enquiry');
      }
    } catch (error) {
      console.error('Error submitting trade enquiry:', error);
      alert('Error submitting trade enquiry. Please check the highlighted fields and try again.');
      
      // Reset reCAPTCHA on error so user can try again
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaValue(null);
      setCaptchaError(null);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 ">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Company Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.companyName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Your company name"
                />
                {fieldErrors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.companyName[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyAddress}
                  onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.companyAddress ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Complete company address"
                />
                {fieldErrors.companyAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.companyAddress[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.countryName}
                  onChange={(e) => handleInputChange('countryName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.countryName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Country name"
                />
                {fieldErrors.countryName && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.countryName[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.companyPhone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Company phone number"
                />
                {fieldErrors.companyPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.companyPhone[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  value={formData.companyMobile}
                  onChange={(e) => handleInputChange('companyMobile', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Company mobile number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fax
                </label>
                <input
                  type="tel"
                  value={formData.companyFax}
                  onChange={(e) => handleInputChange('companyFax', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Company fax number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.companyEmail}
                  onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.companyEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Company email ID"
                />
                {fieldErrors.companyEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.companyEmail[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.companyWebsite}
                  onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your company website"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.companyLinkedIn}
                  onChange={(e) => handleInputChange('companyLinkedIn', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="URL of your company page"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Contact Person</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.contactName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Contact person name"
                />
                {fieldErrors.contactName && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.contactName[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactMobile}
                  onChange={(e) => handleInputChange('contactMobile', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.contactMobile ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Contact person mobile"
                />
                {fieldErrors.contactMobile && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.contactMobile[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.contactEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Contact person email"
                />
                {fieldErrors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.contactEmail[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.contactLinkedIn}
                  onChange={(e) => handleInputChange('contactLinkedIn', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Contact person LinkedIn profile"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Logistics Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coffee Grade *
                </label>
                <input
                  type="text"
                  required
                  value={formData.coffeeGrade}
                  onChange={(e) => handleInputChange('coffeeGrade', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.coffeeGrade ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Coffee grade required"
                />
                {fieldErrors.coffeeGrade && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.coffeeGrade[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  HSN Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.hsnCode}
                  onChange={(e) => handleInputChange('hsnCode', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.hsnCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="HSN code"
                />
                {fieldErrors.hsnCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.hsnCode[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  required
                  value={formData.estimatedQuantity}
                  onChange={(e) => handleInputChange('estimatedQuantity', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.estimatedQuantity ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Quantity needed"
                />
                {fieldErrors.estimatedQuantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.estimatedQuantity[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Packaging Requirements *
                </label>
                <input
                  type="text"
                  required
                  value={formData.packagingRequirements}
                  onChange={(e) => handleInputChange('packagingRequirements', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.packagingRequirements ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Packaging specifications"
                />
                {fieldErrors.packagingRequirements && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.packagingRequirements[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Port of Loading *
                </label>
                <input
                  type="text"
                  required
                  value={formData.portOfLoading}
                  onChange={(e) => handleInputChange('portOfLoading', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.portOfLoading ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Loading port"
                />
                {fieldErrors.portOfLoading && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.portOfLoading[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Port of Dispatch *
                </label>
                <input
                  type="text"
                  required
                  value={formData.portOfDispatch}
                  onChange={(e) => handleInputChange('portOfDispatch', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.portOfDispatch ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Dispatch port"
                />
                {fieldErrors.portOfDispatch && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.portOfDispatch[0]}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pre-shipment Agency
                </label>
                <input
                  type="text"
                  value={formData.preshipmentAgency}
                  onChange={(e) => handleInputChange('preshipmentAgency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Name of the pre-shipment agency"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.deliveryDuration}
                  onChange={(e) => handleInputChange('deliveryDuration', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    fieldErrors.deliveryDuration ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Expected delivery timeframe"
                />
                {fieldErrors.deliveryDuration && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldErrors.deliveryDuration[0]}
                  </p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pre-shipment Requirements
                </label>
                <textarea
                  value={formData.preshipmentRequirements}
                  onChange={(e) => handleInputChange('preshipmentRequirements', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Any specific pre-shipment requirements"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 lg:mt-40 mt-24">
      <div className="max-w-4xl mx-auto mt-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 " />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trade Enquiry</h1>
          <p className="text-gray-600">Submit your coffee trade requirements and we&apos;ll get back to you soon.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${currentStep >= step 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`
                    w-16 md:w-24 h-1 mx-2
                    ${currentStep > step ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-8 md:space-x-16 text-xs md:text-sm text-gray-600">
              <span className={currentStep >= 1 ? 'text-green-600 font-semibold' : ''}>
                Company Details
              </span>
              <span className={currentStep >= 2 ? 'text-green-600 font-semibold' : ''}>
                Contact Person
              </span>
              <span className={currentStep >= 3 ? 'text-green-600 font-semibold' : ''}>
                Logistics Details
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {/* reCAPTCHA - only show on last step */}
            {currentStep === 3 && (
              <div className="mt-8 flex flex-col items-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  onChange={(value) => {
                    setCaptchaValue(value);
                    setCaptchaError(null);
                  }}
                  className="mb-4"
                />
                {captchaError && (
                  <p className="text-red-600 text-sm mb-4">{captchaError}</p>
                )}
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                  ${currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!captchaValue}
                >
                  Submit Enquiry
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TradeEnquiryPage;