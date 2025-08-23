import React from 'react';
import { Button } from './ui/button';
import { Search, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-white/95"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-red-600">
                <Star className="h-5 w-5 fill-current animate-pulse" />
                <span className="text-sm font-medium">{t('home.tagline')}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                {t('home.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                  {' '}{t('home.titleHighlight')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                {t('home.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inventory">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {t('home.viewInventory')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-gray-300 hover:bg-gray-50 hover:border-red-600 hover:text-red-600 transition-all duration-300">
                <Search className="mr-2 h-5 w-5" />
                {t('home.searchVehicle')}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-red-600">500+</div>
                <div className="text-sm text-gray-600">{t('home.vehiclesSold')}</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-red-600">15+</div>
                <div className="text-sm text-gray-600">{t('home.yearsExperience')}</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-red-600">98%</div>
                <div className="text-sm text-gray-600">{t('home.satisfiedCustomers')}</div>
              </div>
            </div>

            {/* Founders Info */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('common.founders') || 'Fundadores'}
                </h3>
                <div className="space-y-3">
                  {companyInfo.founders.map((founder, index) => (
                    <div key={index} className="flex items-center justify-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full"></div>
                      <span className="font-bold text-gray-900">{founder.name}</span>
                      <span className="text-gray-600">- {t(`home.${founder.role}`)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-2xl font-bold text-red-600">
                    {companyInfo.contact.phone}
                  </div>
                  <div className="text-sm text-gray-600">
                    {companyInfo.address.full}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative transform hover:scale-105 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Premium Vehicle"
                className="w-full h-96 md:h-[600px] object-cover rounded-3xl shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <Star className="h-8 w-8 text-green-600 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {t('common.qualityGuaranteed') || 'Calidad Garantizada'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('common.inspection150Points') || 'Inspección de 150 puntos'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;