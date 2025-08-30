import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import emailService from '../services/emailService';

const EmailJSStatus = () => {
  const { language } = useLanguage();
  const [emailStatus, setEmailStatus] = useState('checking'); // checking, active, error

  useEffect(() => {
    const checkEmailJS = async () => {
      try {
        const isConfigured = await emailService.testConfiguration();
        setEmailStatus(isConfigured ? 'active' : 'error');
      } catch (error) {
        console.error('EmailJS status check failed:', error);
        setEmailStatus('error');
      }
    };

    // Skip the test for now to avoid sending test emails
    // Just check if configuration exists
    const hasConfig = emailService.publicKey && emailService.serviceId && emailService.contactTemplateId;
    setEmailStatus(hasConfig ? 'active' : 'error');
  }, []);

  const getStatusConfig = () => {
    switch (emailStatus) {
      case 'active':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 border-green-200',
          iconColor: 'text-green-600',
          badgeColor: 'bg-green-100 text-green-800',
          title: language === 'es' ? 'Sistema de Email Activo' : 'Email System Active',
          subtitle: language === 'es' ? '✅ EmailJS Configurado' : '✅ EmailJS Configured',
          description: language === 'es' 
            ? 'Tu mensaje será enviado directamente a nvamotors82@gmail.com usando EmailJS (servicio gratuito). Responderemos dentro de 2-4 horas.'
            : 'Your message will be sent directly to nvamotors82@gmail.com using EmailJS (free service). We will respond within 2-4 hours.'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'bg-red-100 border-red-200',
          iconColor: 'text-red-600',
          badgeColor: 'bg-red-100 text-red-800',
          title: language === 'es' ? 'Sistema de Email No Configurado' : 'Email System Not Configured',
          subtitle: language === 'es' ? '⚠️ Configuración Pendiente' : '⚠️ Configuration Pending',
          description: language === 'es' 
            ? 'El sistema de email no está completamente configurado. Por favor usa la información de contacto directa.'
            : 'Email system is not fully configured. Please use direct contact information.'
        };
      default:
        return {
          icon: Clock,
          color: 'bg-blue-100 border-blue-200',
          iconColor: 'text-blue-600',
          badgeColor: 'bg-blue-100 text-blue-800',
          title: language === 'es' ? 'Verificando Sistema' : 'Checking System',
          subtitle: language === 'es' ? '🔄 Verificando...' : '🔄 Checking...',
          description: language === 'es' 
            ? 'Verificando la configuración del sistema de email...'
            : 'Checking email system configuration...'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <Card className={`${config.color} shadow-lg mb-8`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-3 bg-white rounded-xl ${config.iconColor} shadow-md`}>
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge className={config.badgeColor}>
                {config.subtitle}
              </Badge>
              <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {config.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {config.description}
            </p>
            
            {emailStatus === 'active' && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Email:</span>
                  <span>nvamotors82@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    {language === 'es' ? 'Tiempo de respuesta:' : 'Response time:'}
                  </span>
                  <span>2-4 horas</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailJSStatus;