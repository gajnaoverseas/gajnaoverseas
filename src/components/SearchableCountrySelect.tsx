'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import type { CountryCode } from 'libphonenumber-js';
import en from 'react-phone-number-input/locale/en.json';
import { ChevronDown } from 'lucide-react';

interface SearchableCountrySelectProps {
  value?: CountryCode;
  onChange: (value: CountryCode | undefined) => void;
  className?: string;
  disabled?: boolean;
}

export const SearchableCountrySelect: React.FC<SearchableCountrySelectProps> = ({
  value,
  onChange,
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<CountryCode[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const countries = getCountries();
  const labels = en as Record<CountryCode, string>;

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country => {
        const countryName = labels[country]?.toLowerCase() || '';
        const callingCode = getCountryCallingCode(country);
        return (
          countryName.includes(searchTerm.toLowerCase()) ||
          callingCode.includes(searchTerm) ||
          country.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries, labels]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country: CountryCode) => {
    onChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const getDisplayValue = () => {
    if (value && labels[value]) {
      return `${labels[value]} +${getCountryCallingCode(value)}`;
    }
    return 'Select country';
  };

  const getFlag = (country: string | CountryCode) => {
    // Convert country code to flag emoji
    try {
      const codePoints = country
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch (error) {
      // Fallback to a generic flag emoji if conversion fails
      return '🏳️';
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`
          flex items-center justify-between px-3 py-2 border border-gray-300 rounded-l-md bg-white cursor-pointer min-h-[42px] w-[120px]
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
          ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : ''}
        `}
        onClick={handleInputClick}
      >
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          {value && (
            <span className="text-lg flex-shrink-0">{getFlag(value)}</span>
          )}
          <span className="text-sm text-gray-700 truncate">
            {value ? `+${getCountryCallingCode(value)}` : '+1'}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-[300px] z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden mt-1">
          <div className="p-2 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <div
                  key={country}
                  className={`
                    flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors
                    ${value === country ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                  `}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="text-lg flex-shrink-0">{getFlag(country)}</span>
                  <span className="flex-1 text-sm min-w-0">
                    {labels[country]} (+{getCountryCallingCode(country)})
                  </span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};