import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CreditCard, Shield, RefreshCw, Search, Users, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ServiceCard = ({ service, index }) => {
  const icons = {
    CreditCard,
    Shield,
    RefreshCw,
    Search,
    Users,
    Wrench
  };
  
  const IconComponent = icons[service.icon] || CreditCard;
  
  const colors = [
    'from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300',
    'from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300',
    'from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300',
    'from-orange-100 to-orange-200 group-hover:from-orange-200 group-hover:to-orange-300',
    'from-pink-100 to-pink-200 group-hover:from-pink-200 group-hover:to-pink-300',
    'from-indigo-100 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-300'
  ];
  
  const iconColors = [
    'text-blue-600',
    'text-green-600', 
    'text-purple-600',
    'text-orange-600',
    'text-pink-600',
    'text-indigo-600'
  ];
  
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 hover:from-white hover:to-white transform hover:scale-105">
      <CardContent className="p-8 text-center space-y-6">
        <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${colors[index % colors.length]} rounded-3xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
          <IconComponent className={`h-10 w-10 ${iconColors[index % iconColors.length]}`} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {service.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      id: 1,
      title: t('services.financing.title'),
      description: t('services.financing.description'),
      icon: "CreditCard"
    },
    {
      id: 2,
      title: t('services.warranty.title'),
      description: t('services.warranty.description'),
      icon: "Shield"
    },
    {
      id: 3,
      title: t('services.tradeIn.title'),
      description: t('services.tradeIn.description'),
      icon: "RefreshCw"
    },
    {
      id: 4,
      title: t('services.inspection.title'),
      description: t('services.inspection.description'),
      icon: "Search"
    },
    {
      id: 5,
      title: t('services.advisory.title'),
      description: t('services.advisory.description'),
      icon: "Users"
    },
    {
      id: 6,
      title: t('services.service.title'),
      description: t('services.service.description'),
      icon: "Wrench"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-600 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-6 py-3 text-sm font-semibold shadow-lg">
            {t('services.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;