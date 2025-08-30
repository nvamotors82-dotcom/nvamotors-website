import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Clock,
  CheckCircle,
  Car,
  DollarSign,
  Calendar,
  Phone
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppChat = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  // Show widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Remove notification after opening
  useEffect(() => {
    if (isOpen) {
      setHasNotification(false);
    }
  }, [isOpen]);

  const phoneNumber = "17025019216"; // (702) 501-9216 in international format
  
  const quickMessages = [
    {
      id: 1,
      icon: Car,
      text: language === 'es' ? 'Ver inventario disponible' : 'View available inventory',
      message: language === 'es' 
        ? 'Hola! Me gustaría ver el inventario de vehículos disponibles en NVAMOTORS.' 
        : 'Hi! I would like to see the inventory of available vehicles at NVAMOTORS.'
    },
    {
      id: 2,
      icon: DollarSign,
      text: language === 'es' ? 'Consultar financiamiento' : 'Ask about financing',
      message: language === 'es' 
        ? 'Hola! Necesito información sobre opciones de financiamiento para comprar un vehículo.' 
        : 'Hi! I need information about financing options to purchase a vehicle.'
    },
    {
      id: 3,
      icon: Calendar,
      text: language === 'es' ? 'Agendar cita/test drive' : 'Schedule appointment/test drive',
      message: language === 'es' 
        ? 'Hola! Me gustaría agendar una cita para ver vehículos o hacer un test drive.' 
        : 'Hi! I would like to schedule an appointment to see vehicles or do a test drive.'
    },
    {
      id: 4,
      icon: Phone,
      text: language === 'es' ? 'Hablar con un asesor' : 'Speak with an advisor',
      message: language === 'es' 
        ? 'Hola! Necesito hablar con un asesor de ventas sobre un vehículo específico.' 
        : 'Hi! I need to speak with a sales advisor about a specific vehicle.'
    }
  ];

  const sendWhatsAppMessage = (message = '') => {
    const defaultMessage = language === 'es' 
      ? 'Hola! Estoy interesado en los vehículos de NVAMOTORS. ¿Pueden ayudarme?'
      : 'Hi! I am interested in NVAMOTORS vehicles. Can you help me?';
    
    const finalMessage = message || defaultMessage;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <Card className="mb-4 w-80 shadow-2xl border-0 animate-in slide-in-from-bottom-4">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">NVAMOTORS</h3>
                    <div className="flex items-center space-x-2 text-green-100">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="text-sm">
                        {language === 'es' ? 'En línea ahora' : 'Online now'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-gray-50 max-h-96 overflow-y-auto">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-gray-800 text-sm">
                    {language === 'es' 
                      ? '¡Hola! 👋 Soy tu asesor virtual de NVAMOTORS. ¿En qué puedo ayudarte hoy?'
                      : 'Hi! 👋 I\'m your virtual advisor from NVAMOTORS. How can I help you today?'
                    }
                  </p>
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3" />
                    <span>
                      {language === 'es' ? 'Respuesta en minutos' : 'Response in minutes'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600 mb-3">
                  {language === 'es' ? 'Selecciona una opción:' : 'Select an option:'}
                </p>
                
                {quickMessages.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => sendWhatsAppMessage(item.message)}
                      className="w-full p-3 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg text-left transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                          <IconComponent className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-green-800 font-medium">
                          {item.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct Message Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => sendWhatsAppMessage()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {language === 'es' ? 'Enviar mensaje directo' : 'Send direct message'}
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-3 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    {language === 'es' ? 'Lun-Vie 9AM-6PM | Sáb 9AM-4PM' : 'Mon-Fri 9AM-6PM | Sat 9AM-4PM'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">(702) 501-9216</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-4 border-white"
        >
          {isOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <MessageCircle className="h-8 w-8" />
          )}
        </Button>

        {/* Notification Badge */}
        {hasNotification && !isOpen && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs animate-bounce">
            {language === 'es' ? 'Nuevo' : 'New'}
          </Badge>
        )}

        {/* Pulse Animation */}
        {!isOpen && (
          <div className="absolute inset-0 w-16 h-16 bg-green-400 rounded-full animate-ping opacity-20"></div>
        )}
      </div>

      {/* Initial Welcome Tooltip */}
      {!isOpen && hasNotification && isVisible && (
        <div className="absolute bottom-20 right-0 w-64 animate-in slide-in-from-right-4">
          <Card className="shadow-xl border-green-200">
            <CardContent className="p-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {language === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {language === 'es' 
                      ? 'Chatea con nosotros por WhatsApp. Respuesta inmediata!' 
                      : 'Chat with us on WhatsApp. Immediate response!'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setHasNotification(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              {/* Arrow pointing to button */}
              <div className="absolute bottom-2 right-4 w-3 h-3 bg-white border-r border-b border-green-200 transform rotate-45 translate-y-1/2"></div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;