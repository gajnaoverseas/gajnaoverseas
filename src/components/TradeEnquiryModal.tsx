'use client';

import React, { useState, useRef } from 'react';
import { X, Building2, User, Truck, ChevronRight, ChevronLeft } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface TradeEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const TradeEnquiryModal: React.FC<TradeEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const captchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const isLocalhost = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
  const captchaEnabled = Boolean(captchaSiteKey) && !isLocalhost;
  const [formData, setFormData] = useState<FormData>({
    // Company Details
    companyName: '',
    companyAddress: '',
    countryName: '',
    companyPhone: '',
    companyFax: '',
    companyMobile: '',
    companyEmail: '',
    companyWebsite: '',
    companyLinkedIn: '',
    
    // Contact Person
    contactName: '',
    contactLinkedIn: '',
    contactMobile: '',
    contactEmail: '',
    
    // Logistics Details
    coffeeGrade: '',
    hsnCode: '',
    estimatedQuantity: '',
    packagingRequirements: '',
    portOfLoading: '',
    portOfDispatch: '',
    preshipmentAgency: '',
    preshipmentRequirements: '',
    deliveryDuration: '',
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
    
    // Validate reCAPTCHA (only when enabled)
    if (captchaEnabled && !captchaValue) {
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
        
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setCaptchaValue('');
        setCaptchaError('');
        setFieldErrors({});
        setCurrentStep(1);
        onClose();
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
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl lg:max-h-[90vh] max-h-[70vh] overflow-y-auto ">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-6 relative  ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="lg:text-3xl text-xl font-bold mb-2">Trade Enquiry Form</h2>
          <p className="text-green-100 text-sm">Complete all sections to submit </p>
           
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-white text-green-700' : 'bg-green-600 text-white'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-white' : 'bg-green-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step Labels */}
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-center flex-1">Company Details</span>
            <span className="text-center flex-1">Contact Person</span>
            <span className="text-center flex-1">Logistics Details</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto lg:max-h-[90vh]">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Company Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Building2 className="w-8 h-8 text-green-700 mr-3" />
                  <h3 className="lg:text-2xl text-lg font-bold text-gray-800">Company Details (Importing Company)</h3>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.countryName}
                      onChange={(e) => handleInputChange('countryName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your country name"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Address of your company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.companyPhone}
                      onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Company phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.companyMobile}
                      onChange={(e) => handleInputChange('companyMobile', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Company mobile number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fax Number
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
                  
                  <div>
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
            )}

            {/* Step 2: Contact Person */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <User className="w-8 h-8 text-green-700 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Contact Person (At the importing Company)</h3>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactMobile}
                      onChange={(e) => handleInputChange('contactMobile', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your mobile number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email ID *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your email ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.contactLinkedIn}
                      onChange={(e) => handleInputChange('contactLinkedIn', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your LinkedIn profile URL"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Logistics Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Truck className="w-8 h-8 text-green-700 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Logistics Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description of Coffee Grade *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.coffeeGrade}
                      onChange={(e) => handleInputChange('coffeeGrade', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Arabica AA, Robusta Cherry"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="HSN code for coffee"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 1000 MT, 500 bags"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Port of Loading in India *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.portOfLoading}
                      onChange={(e) => handleInputChange('portOfLoading', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Mumbai, Chennai, Cochin"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Destination port"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Delivery Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.deliveryDuration}
                      onChange={(e) => handleInputChange('deliveryDuration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 30-45 days"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Packaging Requirements *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.packagingRequirements}
                      onChange={(e) => handleInputChange('packagingRequirements', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Explain your packaging requirements in detail"
                    />
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
                      Pre-shipment Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.preshipmentRequirements}
                      onChange={(e) => handleInputChange('preshipmentRequirements', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your pre-shipment requirements in detail"
                    />
                  </div>
                </div>

                {/* reCAPTCHA (only when configured) */}
                {captchaEnabled && (
                  <div className="flex flex-col items-center mt-8">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={captchaSiteKey}
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
                )}
              </div>
            )}
          </form>
        </div>

        {/* Footer with Navigation */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <div className="text-sm text-gray-500 hidden lg:block">
            Step {currentStep} of 3
          </div>
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-8 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-all"
            >
              Submit Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeEnquiryModal;
