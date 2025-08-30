import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  Car, 
  Award, 
  Clock, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  Star,
  Heart,
  Shield,
  Handshake,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CountUpAnimation = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ icon: Icon, number, suffix, title, description, color, bgColor, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card className={`${bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:scale-105`}>
      <CardContent className="p-8 text-center">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="h-10 w-10 text-white" />
        </div>
        <div className="text-5xl font-bold text-gray-900 mb-3">
          {isVisible ? <CountUpAnimation end={number} suffix={suffix} /> : "0" + suffix}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

const ImpressiveStats = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: "+",
      title: language === 'es' ? 'Clientes Satisfechos' : 'Happy Customers',
      description: language === 'es' ? 'Familias en Las Vegas que confían en nosotros' : 'Families in Las Vegas who trust us',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      delay: 0
    },
    {
      icon: Car,
      number: 1200,
      suffix: "+",
      title: language === 'es' ? 'Vehículos Vendidos' : 'Vehicles Sold',
      description: language === 'es' ? 'Autos entregados con total satisfacción' : 'Cars delivered with complete satisfaction',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      delay: 200
    },
    {
      icon: Calendar,
      number: 15,
      suffix: "+",
      title: language === 'es' ? 'Años de Experiencia' : 'Years Experience',
      description: language === 'es' ? 'Sirviendo a la comunidad de Las Vegas' : 'Serving the Las Vegas community',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      delay: 400
    },
    {
      icon: Star,
      number: 4.9,
      suffix: "/5",
      title: language === 'es' ? 'Calificación Promedio' : 'Average Rating',
      description: language === 'es' ? 'En Google Reviews y testimonios verificados' : 'On Google Reviews and verified testimonials',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      delay: 600
    },
    {
      icon: Clock,
      number: 24,
      suffix: "h",
      title: language === 'es' ? 'Aprobación Rápida' : 'Quick Approval',
      description: language === 'es' ? 'Financiamiento aprobado en menos de 24 horas' : 'Financing approved in under 24 hours',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      delay: 800
    },
    {
      icon: CheckCircle,
      number: 98,
      suffix: "%",
      title: language === 'es' ? 'Satisfacción Garantizada' : 'Satisfaction Guaranteed',
      description: language === 'es' ? 'De nuestros clientes recomendarían NVAMOTORS' : 'Of our customers would recommend NVAMOTORS',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      delay: 1000
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: language === 'es' ? '#1 Concesionario' : '#1 Dealership',
      subtitle: language === 'es' ? 'En Las Vegas por satisfacción del cliente' : 'In Las Vegas by customer satisfaction',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: language === 'es' ? 'BBB A+ Rating' : 'BBB A+ Rating',
      subtitle: language === 'es' ? 'Better Business Bureau certificado' : 'Better Business Bureau certified',
      color: 'text-green-600'
    },
    {
      icon: Heart,
      title: language === 'es' ? 'Preferido Local' : 'Local Favorite',
      subtitle: language === 'es' ? 'Elegido por familias de Nevada' : 'Chosen by Nevada families',
      color: 'text-red-600'
    },
    {
      icon: Handshake,
      title: language === 'es' ? 'Dealer Autorizado' : 'Authorized Dealer',
      subtitle: language === 'es' ? 'Licencias y certificaciones al día' : 'Current licenses and certifications',
      color: 'text-blue-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full -translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-gradient-to-r from-blue-100 to-red-100 text-blue-800 px-6 py-3 text-sm font-semibold shadow-lg">
            {language === 'es' ? '📊 Números que Hablan' : '📊 Numbers That Speak'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {language === 'es' ? 'Resultados que Demuestran Nuestra Excelencia' : 'Results That Prove Our Excellence'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'es' 
              ? 'Más de 15 años construyendo confianza en Las Vegas. Estos números reflejan nuestro compromiso con la excelencia.'
              : 'Over 15 years building trust in Las Vegas. These numbers reflect our commitment to excellence.'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              suffix={stat.suffix}
              title={stat.title}
              description={stat.description}
              color={stat.color}
              bgColor={stat.bgColor}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Achievements Section */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-0 shadow-2xl">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {language === 'es' ? '🏆 Reconocimientos y Logros' : '🏆 Awards & Achievements'}
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {language === 'es' 
                  ? 'Orgullosos de los reconocimientos que hemos recibido por nuestro servicio excepcional'
                  : 'Proud of the recognition we have received for our exceptional service'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {achievement.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-white mb-4">
                  {language === 'es' ? '¿Por qué esperar?' : 'Why wait?'}
                </h4>
                <p className="text-red-100 text-lg mb-6">
                  {language === 'es' 
                    ? 'Únete a las 500+ familias que ya confían en NVAMOTORS'
                    : 'Join the 500+ families who already trust NVAMOTORS'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    <DollarSign className="inline-block h-5 w-5 mr-2" />
                    {language === 'es' ? 'Cotizar Ahora' : 'Get Quote Now'}
                  </button>
                  <button className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors border-2 border-red-400">
                    <TrendingUp className="inline-block h-5 w-5 mr-2" />
                    {language === 'es' ? 'Ver Ofertas' : 'View Offers'}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImpressiveStats;