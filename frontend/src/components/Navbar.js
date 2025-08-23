import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Car, Phone, Globe } from 'lucide-react';
import { companyInfo } from '../data/mockData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  const location = useLocation();

  const navItems = [
    { name: language === 'es' ? 'Inicio' : 'Home', path: '/', icon: null },
    { name: language === 'es' ? 'Inventario' : 'Inventory', path: '/inventory', icon: Car },
    { name: language === 'es' ? 'Promociones' : 'Promotions', path: '/promotions', icon: null },
    { name: language === 'es' ? 'FAQ' : 'FAQ', path: '/faq', icon: null },
    { name: language === 'es' ? 'Contacto' : 'Contact', path: '/contact', icon: Phone },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={companyInfo.logo}
              alt="NVAMOTORS Logo"
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">{companyInfo.name}</span>
              <div className="text-xs text-gray-600 font-semibold">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
            
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              {language === 'es' ? 'Cotizar Vehículo' : 'Get Quote'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex justify-between items-center px-3 py-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'es' ? 'English' : 'Español'}</span>
                </button>
                
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  {language === 'es' ? 'Cotizar' : 'Quote'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;