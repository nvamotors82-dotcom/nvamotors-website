import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { companyInfo } from '../data/mockData';

const CTASection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white rounded-full translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {language === 'es' 
                  ? '¿Listo para encontrar tu próximo vehículo?' 
                  : 'Ready to find your next vehicle?'
                }
              </h2>
              <p className="text-xl text-red-100 leading-relaxed">
                {language === 'es'
                  ? 'Nuestro equipo de expertos está aquí para ayudarte. Obtén una cotización personalizada o agenda una cita para ver nuestros vehículos.'
                  : 'Our team of experts is here to help you. Get a personalized quote or schedule an appointment to see our vehicles.'
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inventory">
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-lg group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {t('home.viewInventory')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {language === 'es' ? 'Contactar Ahora' : 'Contact Now'}
                </Button>
              </Link>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-red-500">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">
                    {language === 'es' ? 'Llama ahora' : 'Call now'}
                  </div>
                  <div className="text-red-200 text-lg">{companyInfo.contact.phone}</div>
                  <div className="text-sm text-red-300">
                    {language === 'es' 
                      ? 'Lun - Vie: 9:00 AM - 6:00 PM' 
                      : 'Mon - Fri: 9:00 AM - 6:00 PM'
                    }
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">WhatsApp</div>
                  <div className="text-red-200">
                    {language === 'es' ? 'Respuesta inmediata' : 'Immediate response'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative transform hover:scale-105 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="NVAMOTORS Dealership"
                className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
                }}
              />
              
              {/* Floating Stats */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'es' ? 'Años de Experiencia' : 'Years of Experience'}
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">
                    {language === 'es' ? 'Satisfacción' : 'Satisfaction'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;