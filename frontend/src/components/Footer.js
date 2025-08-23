import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { companyInfo } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={companyInfo.logo}
                alt="NVAMOTORS Logo"
                className="h-10 w-auto"
              />
              <div>
                <span className="text-2xl font-bold">{companyInfo.name}</span>
                <div className="text-sm text-gray-300">{companyInfo.tagline}</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Tu concesionario de confianza en Las Vegas. Ofrecemos los mejores vehículos con 
              financiamiento accesible y atención personalizada para encontrar 
              el auto perfecto para ti.
            </p>
            
            {/* Owners */}
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Propietarios:</div>
              <div className="text-white font-semibold">{companyInfo.owner} - Dueño</div>
              <div className="text-white font-semibold">{companyInfo.partner} - Socio Principal</div>
            </div>
            
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-300 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5" />
                <div className="text-gray-300">
                  <div>{companyInfo.address.street}</div>
                  <div>{companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">{companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">{companyInfo.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-400" />
                <div className="text-gray-300">
                  <div>{companyInfo.hours.weekdays}</div>
                  <div>{companyInfo.hours.saturday}</div>
                  <div>{companyInfo.hours.sunday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {companyInfo.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;