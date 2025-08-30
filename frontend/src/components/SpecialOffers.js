import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  DollarSign, 
  Clock, 
  Star, 
  CheckCircle,
  Gift,
  Zap,
  TrendingDown,
  Calendar,
  Phone,
  MessageCircle,
  AlertCircle,
  Percent
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex space-x-2 text-center">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="bg-white bg-opacity-20 rounded-lg p-2 min-w-[60px]">
          <div className="text-2xl font-bold text-white">
            {timeLeft[interval] || '0'}
          </div>
          <div className="text-xs text-white uppercase opacity-80">
            {interval}
          </div>
        </div>
      ))}
    </div>
  );
};

const OfferCard = ({ offer, isUrgent = false }) => {
  const { language } = useLanguage();

  return (
    <Card className={`relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group ${
      isUrgent 
        ? 'bg-gradient-to-br from-red-500 to-red-600' 
        : 'bg-gradient-to-br from-blue-500 to-purple-600'
    }`}>
      {/* Urgent Badge */}
      {isUrgent && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-yellow-400 text-yellow-900 animate-pulse">
            <Zap className="h-3 w-3 mr-1" />
            {language === 'es' ? '¡URGENTE!' : 'URGENT!'}
          </Badge>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 translate-y-12"></div>
      </div>

      <CardContent className="relative p-8 text-white">
        <div className="space-y-6">
          {/* Offer Header */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{offer.title}</h3>
                <p className="text-white text-opacity-90 text-sm">{offer.subtitle}</p>
              </div>
            </div>
            
            {/* Discount Amount */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">{offer.discount}</div>
              <div className="text-white text-opacity-90">{offer.description}</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {offer.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-white" />
                <span className="text-white text-opacity-90">{feature}</span>
              </div>
            ))}
          </div>

          {/* Countdown Timer */}
          {offer.expiresAt && (
            <div className="text-center">
              <p className="text-white text-opacity-90 mb-3 font-medium">
                {language === 'es' ? 'Oferta válida hasta:' : 'Offer valid until:'}
              </p>
              <CountdownTimer targetDate={offer.expiresAt} />
            </div>
          )}

          {/* Call to Action */}
          <div className="space-y-3">
            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 text-lg shadow-lg">
              <Phone className="mr-2 h-5 w-5" />
              {language === 'es' ? 'Llamar Ahora' : 'Call Now'}
            </Button>
            <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-gray-900 py-3">
              <MessageCircle className="mr-2 h-5 w-5" />
              {language === 'es' ? 'WhatsApp' : 'WhatsApp'}
            </Button>
          </div>

          {/* Limited Time Notice */}
          <div className="text-center p-3 bg-white bg-opacity-10 rounded-lg">
            <p className="text-sm text-white font-medium">
              <AlertCircle className="inline-block h-4 w-4 mr-1" />
              {language === 'es' ? 'Solo por tiempo limitado' : 'Limited time only'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SpecialOffers = () => {
  const { language } = useLanguage();

  // Set expiration dates
  const getExpirationDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString();
  };

  const offers = [
    {
      id: 1,
      title: language === 'es' ? 'Financiamiento 0%' : '0% Financing',
      subtitle: language === 'es' ? 'APR por 60 meses' : 'APR for 60 months',
      discount: '0% APR',
      description: language === 'es' ? 'Sin intereses por 5 años' : 'No interest for 5 years',
      features: [
        language === 'es' ? 'Hasta 60 meses sin intereses' : 'Up to 60 months interest-free',
        language === 'es' ? 'Aprobación en 24 horas' : '24-hour approval',
        language === 'es' ? 'Sin penalizaciones por pago anticipado' : 'No prepayment penalties',
        language === 'es' ? 'Vehículos selectos 2023-2024' : 'Select 2023-2024 vehicles'
      ],
      expiresAt: getExpirationDate(7), // Expires in 7 days
      isUrgent: true
    },
    {
      id: 2,
      title: language === 'es' ? 'Descuento Intercambio' : 'Trade-in Bonus',
      subtitle: language === 'es' ? 'Valor extra por tu auto' : 'Extra value for your car',
      discount: '$5,000',
      description: language === 'es' ? 'Adicionales por intercambio' : 'Additional trade-in value',
      features: [
        language === 'es' ? 'Evaluación gratuita inmediata' : 'Free immediate evaluation',
        language === 'es' ? 'Aceptamos cualquier condición' : 'We accept any condition',
        language === 'es' ? 'Proceso simplificado' : 'Simplified process',
        language === 'es' ? 'Valor garantizado por 30 días' : 'Value guaranteed for 30 days'
      ],
      expiresAt: getExpirationDate(10), // Expires in 10 days
      isUrgent: false
    },
    {
      id: 3,
      title: language === 'es' ? 'Especial Enero' : 'January Special',
      subtitle: language === 'es' ? 'Descuento directo' : 'Direct discount',
      discount: '$3,000',
      description: language === 'es' ? 'De descuento inmediato' : 'Immediate discount',
      features: [
        language === 'es' ? 'Aplicable a cualquier vehículo' : 'Applicable to any vehicle',
        language === 'es' ? 'Se combina con financiamiento' : 'Combines with financing',
        language === 'es' ? 'Válido hasta fin de mes' : 'Valid until end of month',
        language === 'es' ? 'Sin restricciones de crédito' : 'No credit restrictions'
      ],
      expiresAt: getExpirationDate(15), // Expires in 15 days
      isUrgent: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full translate-x-48 translate-y-48 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-6 py-3 text-sm font-semibold shadow-lg animate-bounce">
            <Gift className="mr-2 h-4 w-4" />
            {language === 'es' ? '🔥 Ofertas Especiales Enero 2025' : '🔥 January 2025 Special Offers'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {language === 'es' ? '¡Ahorra Hasta $5,000 Hoy!' : 'Save Up to $5,000 Today!'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'es' 
              ? 'Ofertas exclusivas por tiempo limitado. No esperes, estos descuentos desaparecen pronto.'
              : 'Exclusive limited-time offers. Don\'t wait, these discounts disappear soon.'
            }
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <OfferCard 
              key={offer.id} 
              offer={offer} 
              isUrgent={offer.isUrgent}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <Card className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'es' ? '⚡ ¡No Dejes Pasar Esta Oportunidad!' : '⚡ Don\'t Miss This Opportunity!'}
              </h3>
              <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                {language === 'es' 
                  ? 'Estas ofertas especiales solo están disponibles hasta fin de enero. Contacta ahora y asegura el mejor precio del año.'
                  : 'These special offers are only available until the end of January. Contact now and secure the best price of the year.'
                }
              </p>
              
              {/* Contact Options */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold shadow-xl"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {language === 'es' ? 'Llamar (702) 501-9216' : 'Call (702) 501-9216'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-semibold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {language === 'es' ? 'WhatsApp Directo' : 'Direct WhatsApp'}
                </Button>
              </div>

              {/* Guarantee */}
              <div className="mt-8 p-4 bg-white bg-opacity-20 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-gray-900">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">
                    {language === 'es' ? 'Garantía: Si encuentras un mejor precio, lo igualamos + $500 extra' : 'Guarantee: If you find a better price, we match it + $500 extra'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SpecialOffers;