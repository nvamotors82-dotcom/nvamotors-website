import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  Car,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';
import { companyInfo } from '../data/mockData';
import apiService from '../services/api';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.submitContactForm(formData);
      toast({
        title: language === 'es' ? "Mensaje enviado" : "Message sent",
        description: language === 'es' 
          ? "Nos pondremos en contacto contigo pronto." 
          : "We will get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: language === 'es'
          ? "No se pudo enviar el mensaje. Inténtalo nuevamente."
          : "Could not send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: language === 'es' ? 'Dirección' : 'Address',
      details: [companyInfo.address.street, `${companyInfo.address.city}, ${companyInfo.address.state} ${companyInfo.address.zip}`],
      color: 'text-red-600'
    },
    {
      icon: Phone,
      title: language === 'es' ? 'Teléfono' : 'Phone',
      details: [companyInfo.contact.phone, language === 'es' ? 'Lun - Vie: 9:00 AM - 6:00 PM' : 'Mon - Fri: 9:00 AM - 6:00 PM'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [companyInfo.contact.email, 'ventas@nvamotors.com'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: language === 'es' ? 'Horarios' : 'Hours',
      details: [
        language === 'es' ? 'Lun - Vie: 9:00 AM - 6:00 PM' : 'Mon - Fri: 9:00 AM - 6:00 PM',
        language === 'es' ? 'Sáb: 9:00 AM - 4:00 PM' : 'Sat: 9:00 AM - 4:00 PM',
        language === 'es' ? 'Dom: Cerrado' : 'Sun: Closed'
      ],
      color: 'text-orange-600'
    }
  ];

  const services = [
    {
      icon: Car,
      title: language === 'es' ? 'Venta de Vehículos' : 'Vehicle Sales',
      description: language === 'es' ? 'Amplio inventario de autos nuevos y usados' : 'Wide inventory of new and used cars'
    },
    {
      icon: CreditCard,
      title: language === 'es' ? 'Financiamiento' : 'Financing',
      description: language === 'es' ? 'Planes flexibles con las mejores tasas' : 'Flexible plans with the best rates'
    },
    {
      icon: Calendar,
      title: language === 'es' ? 'Mantenimiento' : 'Maintenance',
      description: language === 'es' ? 'Servicio técnico especializado' : 'Specialized technical service'
    }
  ];

  const subjectOptions = [
    { value: 'general', label: language === 'es' ? 'Consulta General' : 'General Inquiry' },
    { value: 'vehicle', label: language === 'es' ? 'Información de Vehículo' : 'Vehicle Information' },
    { value: 'financing', label: language === 'es' ? 'Financiamiento' : 'Financing' },
    { value: 'service', label: language === 'es' ? 'Servicio Técnico' : 'Technical Service' },
    { value: 'test-drive', label: language === 'es' ? 'Prueba de Manejo' : 'Test Drive' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full -translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-6 py-3 mb-6 text-sm font-semibold shadow-lg">
            {t('nav.contact')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="text-3xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t('contact.sendMessage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.fullName')} *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t('contact.fullName')}
                        className="h-12 text-lg border-2 focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.email')} *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder={companyInfo.contact.email}
                        className="h-12 text-lg border-2 focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.phone')}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={companyInfo.contact.phone}
                        className="h-12 text-lg border-2 focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.subject')}
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full h-12 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-500 text-lg"
                      >
                        {subjectOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.message')} *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder={language === 'es' 
                        ? "Cuéntanos cómo podemos ayudarte..." 
                        : "Tell us how we can help you..."
                      }
                      className="text-lg border-2 focus:border-red-500"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {t('contact.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Services */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                {t('contact.ourServices')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 group">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 bg-gray-100 rounded-2xl ${info.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* Founders Info */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-100 shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('common.founders')}
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
              </CardContent>
            </Card>
            
            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'es' ? '¿Necesitas Respuesta Inmediata?' : 'Need Immediate Response?'}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {language === 'es' 
                    ? 'Contáctanos por WhatsApp para atención personalizada'
                    : 'Contact us via WhatsApp for personalized attention'
                  }
                </p>
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {language === 'es' ? 'Chatear Ahora' : 'Chat Now'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Map Placeholder */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === 'es' ? 'Ubicación' : 'Location'}
                </h3>
                <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">{companyInfo.address.full}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;