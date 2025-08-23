import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { companyInfo } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  const hours = language === 'es' 
    ? {
        weekdays: "Lun - Vie: 9:00 AM - 6:00 PM",
        saturday: "Sáb: 9:00 AM - 4:00 PM",
        sunday: "Dom: Cerrado"
      }
    : {
        weekdays: "Mon - Fri: 9:00 AM - 6:00 PM", 
        saturday: "Sat: 9:00 AM - 4:00 PM",
        sunday: "Sun: Closed"
      };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img 
                  src={companyInfo.logo}
                  alt="NVAMOTORS Logo"
                  className="h-12 w-auto filter drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.1)) drop-shadow(0 4px 8px rgba(255, 255, 255, 0.05))',
                  }}
                />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  {companyInfo.name}
                </span>
                <div className="text-sm text-gray-300 font-semibold tracking-wider uppercase">
                  {companyInfo.tagline}
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              {language === 'es' 
                ? 'Tu concesionario de confianza en Las Vegas. Ofrecemos los mejores vehículos con financiamiento accesible y atención personalizada para encontrar el auto perfecto para ti.'
                : 'Your trusted dealership in Las Vegas. We offer the best vehicles with accessible financing and personalized attention to find the perfect car for you.'
              }
            </p>
            
            {/* Founders */}
            <div className="mb-8">
              <div className="text-sm text-red-400 mb-4 font-semibold uppercase tracking-wider">
                {language === 'es' ? 'Fundadores' : 'Founders'}:
              </div>
              <div className="space-y-2">
                {companyInfo.founders.map((founder, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
                    <span className="font-bold text-white">{founder.name}</span>
                    <span className="text-gray-300">- {t(`home.${founder.role}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Facebook className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors transform hover:scale-110" />
              <Instagram className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors transform hover:scale-110" />
              <Twitter className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors transform hover:scale-110" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-red-400 uppercase tracking-wider">
              {language === 'es' ? 'Contacto' : 'Contact'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>{companyInfo.address.street}</div>
                  <div>{companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400 flex-shrink-0" />
                <span className="text-gray-300 font-medium">{companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400 flex-shrink-0" />
                <span className="text-gray-300 font-medium">{companyInfo.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-red-400 uppercase tracking-wider">
              {language === 'es' ? 'Horarios' : 'Hours'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-400" />
                <div className="text-gray-300">
                  <div>{hours.weekdays}</div>
                  <div>{hours.saturday}</div>
                  <div>{hours.sunday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {companyInfo.name}. {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;