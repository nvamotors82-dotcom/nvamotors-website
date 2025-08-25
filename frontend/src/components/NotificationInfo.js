import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const NotificationInfo = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 shadow-sm mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-5 5v-5zM4 6h16M4 12h16M4 18h11" 
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'es' ? '📧 Sistema de Notificaciones Activado' : '📧 Notification System Enabled'}
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              {language === 'es' 
                ? '¡Recibimos tu mensaje instantáneamente! Cuando envíes un formulario, recibiremos:' 
                : 'We receive your message instantly! When you submit a form, we receive:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                {language === 'es' 
                  ? '📧 Notificación por email a nvamotors82@gmail.com' 
                  : '📧 Email notification to nvamotors82@gmail.com'}
              </li>
              <li>
                {language === 'es' 
                  ? '📱 Mensaje SMS al (702) 501-9216' 
                  : '📱 SMS message to (702) 501-9216'}
              </li>
            </ul>
            <p className="text-green-700 font-medium">
              {language === 'es' 
                ? '⚡ Respuesta en menos de 30 minutos durante horario comercial' 
                : '⚡ Response within 30 minutes during business hours'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationInfo;