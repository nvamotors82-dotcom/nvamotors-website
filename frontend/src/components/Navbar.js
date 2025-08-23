import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Car, Phone, Globe } from 'lucide-react';
import { companyInfo } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { name: t('nav.home'), path: '/', icon: null },
    { name: t('nav.inventory'), path: '/inventory', icon: Car },
    { name: t('nav.promotions'), path: '/promotions', icon: null },
    { name: t('nav.faq'), path: '/faq', icon: null },
    { name: t('nav.contact'), path: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with 3D Effect */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src={companyInfo.logo}
                alt="NVAMOTORS Logo"
                className="h-12 w-auto transform transition-all duration-300 group-hover:scale-110 filter drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                  transform: 'perspective(1000px) rotateX(5deg)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                {companyInfo.name}
              </div>
              <div className="text-xs text-gray-600 font-semibold tracking-wider uppercase">
                {companyInfo.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-red-600 bg-red-50 border-b-2 border-red-600 shadow-sm'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-25'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
            
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {t('nav.getQuote')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-br from-gray-50 to-white">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex justify-between items-center px-4 py-3">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">{language === 'es' ? 'English' : 'Español'}</span>
                </button>
                
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg">
                  {t('nav.quote')}
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