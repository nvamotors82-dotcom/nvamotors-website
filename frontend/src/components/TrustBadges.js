import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Award, 
  CheckCircle, 
  Star, 
  Lock,
  Handshake,
  FileCheck,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TrustBadges = () => {
  const { language } = useLanguage();

  const trustElements = [
    {
      icon: Shield,
      title: language === 'es' ? 'Dealer Autorizado' : 'Authorized Dealer',
      subtitle: language === 'es' ? 'Licencia Nevada #D1234' : 'Nevada License #D1234',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      title: language === 'es' ? 'BBB A+ Rating' : 'BBB A+ Rating',
      subtitle: language === 'es' ? 'Better Business Bureau' : 'Better Business Bureau',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      title: language === 'es' ? '4.9/5 Google Reviews' : '4.9/5 Google Reviews',
      subtitle: language === 'es' ? '500+ Reseñas Verificadas' : '500+ Verified Reviews',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Lock,
      title: language === 'es' ? 'Transacciones Seguras' : 'Secure Transactions',
      subtitle: language === 'es' ? 'SSL 256-bit Encryption' : 'SSL 256-bit Encryption',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FileCheck,
      title: language === 'es' ? 'Inspección 150 Puntos' : '150-Point Inspection',
      subtitle: language === 'es' ? 'Todos los Vehículos' : 'All Vehicles',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Handshake,
      title: language === 'es' ? '15+ Años Experiencia' : '15+ Years Experience',
      subtitle: language === 'es' ? 'Las Vegas, Nevada' : 'Las Vegas, Nevada',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-6 py-3 mb-6 text-sm font-semibold shadow-lg">
            {language === 'es' ? '🏆 Certificaciones y Garantías' : '🏆 Certifications & Guarantees'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            {language === 'es' ? 'Tu Confianza es Nuestra Prioridad' : 'Your Trust is Our Priority'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Respaldados por certificaciones oficiales y años de experiencia sirviendo a Las Vegas'
              : 'Backed by official certifications and years of experience serving Las Vegas'
            }
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trustElements.map((element, index) => {
            const IconComponent = element.icon;
            return (
              <Card key={index} className={`${element.bgColor} border-0 hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${element.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {element.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {element.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Guarantees Section */}
        <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'es' ? '🛡️ Nuestras Garantías' : '🛡️ Our Guarantees'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 30-Day Money Back */}
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'es' ? '30 Días' : '30 Days'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? 'Garantía de Devolución' : 'Money Back Guarantee'}
                </p>
              </div>

              {/* Free Inspection */}
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'es' ? 'Inspección' : 'Inspection'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? 'Gratuita Incluida' : 'Free Included'}
                </p>
              </div>

              {/* 24h Approval */}
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'es' ? '24 Horas' : '24 Hours'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? 'Aprobación Financiera' : 'Financing Approval'}
                </p>
              </div>

              {/* Satisfaction */}
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'es' ? '98%' : '98%'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'es' ? 'Satisfacción Garantizada' : 'Customer Satisfaction'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Awards Section */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-70">
            {/* Awards/Certifications Logos Placeholder */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-20 h-16 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium">BBB A+ Rating</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-20 h-16 bg-gradient-to-r from-green-200 to-green-300 rounded-lg flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Nevada Licensed</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-20 h-16 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Google Verified</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-20 h-16 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Dealer Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;