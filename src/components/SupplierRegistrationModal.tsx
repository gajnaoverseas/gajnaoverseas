'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CountryDropdown } from '@/components/CountryDropdown';
import type { ZodIssue } from 'zod';

// Add this helper function to get country code by country name
const getCountryPhoneCode = (countryName: string): string => {
  const countryCodes: Record<string, string> = {
    'Afghanistan': '+93',
    'Albania': '+355',
    'Algeria': '+213',
    'Andorra': '+376',
    'Angola': '+244',
    'Argentina': '+54',
    'Armenia': '+374',
    'Australia': '+61',
    'Austria': '+43',
    'Azerbaijan': '+994',
    'Bahamas': '+1',
    'Bahrain': '+973',
    'Bangladesh': '+880',
    'Barbados': '+1',
    'Belarus': '+375',
    'Belgium': '+32',
    'Belize': '+501',
    'Benin': '+229',
    'Bhutan': '+975',
    'Bolivia': '+591',
    'Brazil': '+55',
    'Brunei': '+673',
    'Bulgaria': '+359',
    'Cambodia': '+855',
    'Cameroon': '+237',
    'Canada': '+1',
    'Chile': '+56',
    'China': '+86',
    'Colombia': '+57',
    'Costa Rica': '+506',
    'Croatia': '+385',
    'Cuba': '+53',
    'Cyprus': '+357',
    'Czech Republic': '+420',
    'Denmark': '+45',
    'Ecuador': '+593',
    'Egypt': '+20',
    'Estonia': '+372',
    'Ethiopia': '+251',
    'Finland': '+358',
    'France': '+33',
    'Germany': '+49',
    'Ghana': '+233',
    'Greece': '+30',
    'Guatemala': '+502',
    'Haiti': '+509',
    'Honduras': '+504',
    'Hong Kong': '+852',
    'Hungary': '+36',
    'Iceland': '+354',
    'India': '+91',
    'Indonesia': '+62',
    'Iran': '+98',
    'Iraq': '+964',
    'Ireland': '+353',
    'Israel': '+972',
    'Italy': '+39',
    'Jamaica': '+1',
    'Japan': '+81',
    'Jordan': '+962',
    'Kazakhstan': '+7',
    'Kenya': '+254',
    'Kuwait': '+965',
    'Kyrgyzstan': '+996',
    'Latvia': '+371',
    'Lebanon': '+961',
    'Libya': '+218',
    'Lithuania': '+370',
    'Luxembourg': '+352',
    'Malaysia': '+60',
    'Maldives': '+960',
    'Malta': '+356',
    'Mexico': '+52',
    'Monaco': '+377',
    'Mongolia': '+976',
    'Morocco': '+212',
    'Myanmar': '+95',
    'Nepal': '+977',
    'Netherlands': '+31',
    'New Zealand': '+64',
    'Nigeria': '+234',
    'North Korea': '+850',
    'Norway': '+47',
    'Oman': '+968',
    'Pakistan': '+92',
    'Panama': '+507',
    'Paraguay': '+595',
    'Peru': '+51',
    'Philippines': '+63',
    'Poland': '+48',
    'Portugal': '+351',
    'Qatar': '+974',
    'Romania': '+40',
    'Russia': '+7',
    'Saudi Arabia': '+966',
    'Senegal': '+221',
    'Serbia': '+381',
    'Singapore': '+65',
    'Slovakia': '+421',
    'Slovenia': '+386',
    'South Africa': '+27',
    'South Korea': '+82',
    'Spain': '+34',
    'Sri Lanka': '+94',
    'Sudan': '+249',
    'Sweden': '+46',
    'Switzerland': '+41',
    'Syria': '+963',
    'Taiwan': '+886',
    'Thailand': '+66',
    'Turkey': '+90',
    'Ukraine': '+380',
    'United Arab Emirates': '+971',
    'United Kingdom': '+44',
    'United States': '+1',
    'Uruguay': '+598',
    'Uzbekistan': '+998',
    'Venezuela': '+58',
    'Vietnam': '+84',
    'Yemen': '+967',
    'Zimbabwe': '+263',
  };
  
  return countryCodes[countryName] || '+91'; // Default to India's code if not found
};

type UserType = 'Coffee Estate Owner' | 'Member of Farmer-Producer Organisation' | 'Coffee Curing Works' | 'Individual Farmer' | 'Brokers / Traders';

interface SupplierRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supplierFormSchema = z.object({
  userType: z.enum(['Coffee Estate Owner', 'Member of Farmer-Producer Organisation', 'Coffee Curing Works', 'Individual Farmer', 'Brokers / Traders']),
  
  // Common fields
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().min(5, 'Mobile number is required'),
  country: z.string().min(1, 'Country is required'),
  
  // Coffee Estate Owner fields
  estateName: z.string().optional(),
  estateOwnerName: z.string().optional(),
  surveyNumber: z.string().optional(),
  address: z.string().optional(),
  
  // Member of FPO fields
  fpoName: z.string().optional(),
  fpoAddress: z.string().optional(),
  registrationNumber: z.string().optional(),
  memberName: z.string().optional(),
  
  // Coffee Curing Works fields
  promoterName: z.string().optional(),
  licenceNumber: z.string().optional(),
  curingWorksAddress: z.string().optional(),
  contactPerson: z.string().optional(),
  
  // Individual Farmer fields
  fullName: z.string().optional(),
  aadharCardNumber: z.string().optional(),
  
  // Products information
  productsAvailable: z.string().min(10, 'Please describe your products (minimum 10 characters)'),
});

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SupplierRegistrationModal = ({ isOpen, onClose }: SupplierRegistrationModalProps) => {
  const [userType, setUserType] = useState<UserType>('Coffee Estate Owner');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formValues, setFormValues] = useState({
    // Common fields
    email: '',
    country: 'India',
    mobileNumber: '',
    userType: 'Coffee Estate Owner' as UserType,
    productsAvailable: '',
    
    // Coffee Estate Owner fields
    estateName: '',
    estateOwnerName: '',
    surveyNumber: '',
    address: '',
    
    // Member of FPO fields
    fpoName: '',
    fpoAddress: '',
    registrationNumber: '',
    memberName: '',
    
    // Coffee Curing Works fields
    promoterName: '',
    licenceNumber: '',
    curingWorksAddress: '',
    contactPerson: '',
    
    // Individual Farmer fields
    fullName: '',
    aadharCardNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserType = e.target.value as UserType;
    setUserType(newUserType);
    setFormValues(prev => ({
      ...prev,
      userType: newUserType
    }));
    
    // Clear errors when changing user type
    setErrors({});
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormValues(prev => ({
      ...prev,
      mobileNumber: value || ''
    }));

    // Clear error when user starts typing again
    if (errors.mobileNumber) {
      setErrors(prev => ({
        ...prev,
        mobileNumber: ''
      }));
    }
  };

  const validateForm = () => {
    try {
      // Dynamically adjust validation based on user type
      let validationSchema = supplierFormSchema;
      
      if (userType === 'Coffee Estate Owner') {
        validationSchema = validationSchema.refine(
          (data) => !!data.estateName && !!data.estateOwnerName && !!data.surveyNumber && !!data.address,
          {
            message: "All Coffee Estate Owner fields are required",
            path: ["estateName"]
          }
        );
      } else if (userType === 'Member of Farmer-Producer Organisation') {
        validationSchema = validationSchema.refine(
          (data) => !!data.fpoName && !!data.fpoAddress && !!data.registrationNumber && !!data.memberName,
          {
            message: "All FPO fields are required",
            path: ["fpoName"]
          }
        );
      } else if (userType === 'Coffee Curing Works') {
        validationSchema = validationSchema.refine(
          (data) => !!data.promoterName && !!data.licenceNumber && !!data.curingWorksAddress && !!data.contactPerson,
          {
            message: "All Coffee Curing Works fields are required",
            path: ["promoterName"]
          }
        );
      } else if (userType === 'Individual Farmer') {
        validationSchema = validationSchema.refine(
          (data) => !!data.fullName && !!data.aadharCardNumber,
          {
            message: "All Individual Farmer fields are required",
            path: ["fullName"]
          }
        );
      } else if (userType === 'Brokers / Traders') {
        validationSchema = validationSchema.refine(
          (data) => !!data.fullName && !!data.registrationNumber && !!data.address,
          {
            message: "All Broker/Trader fields are required",
            path: ["fullName"]
          }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormStatus('submitting');

    try {
      // Here you would typically send the form data to your API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration submitted successfully!');
      setFormStatus('success');
      onClose();
      
      // Reset form with all fields
      setFormValues({
        // Common fields
        email: '',
        country: 'India ',
        mobileNumber: '',
        userType: 'Coffee Estate Owner' as UserType,
        productsAvailable: '',
        
        // Coffee Estate Owner fields
        estateName: '',
        estateOwnerName: '',
        surveyNumber: '',
        address: '',
        
        // Member of FPO fields
        fpoName: '',
        fpoAddress: '',
        registrationNumber: '',
        memberName: '',
        
        // Coffee Curing Works fields
        promoterName: '',
        licenceNumber: '',
        curingWorksAddress: '',
        contactPerson: '',
        
        // Individual Farmer fields
        fullName: '',
        aadharCardNumber: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit registration. Please try again.');
      setFormStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            BECOME A SUPPLIER WITH US
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
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
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
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
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Country*/}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country *
            </label>
            <CountryDropdown
              selectedCountry={formValues.country || ''}
              onSelectCountry={(value: string) => {
                setFormValues(prev => ({
                  ...prev,
                  country: value
                }));
              }}
              error={!!errors.country}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
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

          {/* User Type Dropdown */}
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

          {/* Conditional Fields Based on User Type */}
          {userType === 'Coffee Estate Owner' && (
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
            </>
          )}

          {userType === 'Member of Farmer-Producer Organisation' && (
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
            </>
          )}

          {userType === 'Coffee Curing Works' && (
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

          {userType === 'Individual Farmer' && (
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

          {userType === 'Brokers / Traders' && (
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
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-brown"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coffee-brown hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-brown"
            >
              {formStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierRegistrationModal;