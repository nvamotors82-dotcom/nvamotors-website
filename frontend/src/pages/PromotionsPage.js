import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Tag, Gift, CreditCard, RefreshCw, Percent, Phone, MessageCircle } from 'lucide-react';
import { mockPromotions } from '../data/mockData';

const PromotionCard = ({ promotion }) => {
  const icons = {
    financing: CreditCard,
    'trade-in': RefreshCw,
    discount: Percent
  };
  
  const IconComponent = icons[promotion.type] || Gift;
  
  const getTimeRemaining = (validUntil) => {
    const now = new Date();
    const endDate = new Date(validUntil);
    const timeDiff = endDate - now;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysRemaining = getTimeRemaining(promotion.validUntil);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={promotion.image}
          alt={promotion.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-red-600 text-white">
            {daysRemaining > 0 ? `${daysRemaining} días restantes` : 'Oferta expirada'}
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <div className="p-2 bg-white/90 rounded-full">
            <IconComponent className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{promotion.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600">{promotion.description}</p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Válida hasta: {new Date(promotion.validUntil).toLocaleDateString('es-ES')}</span>
        </div>
        
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <Tag className="mr-2 h-4 w-4" />
          Aprovechar Oferta
        </Button>
      </CardContent>
    </Card>
  );
};

const PromotionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-4">
            <Gift className="h-12 w-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Promociones Especiales
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Aprovecha nuestras ofertas exclusivas y encuentra el vehículo de tus sueños 
            con increíbles descuentos y condiciones especiales.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Current Promotions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Ofertas Vigentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPromotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </div>

        {/* Special Offers Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Buscas Algo Específico?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Contáctanos y te ayudaremos a encontrar las mejores ofertas disponibles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-5 w-5" />
              Llamar Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Financing Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <CreditCard className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financiamiento Fácil</h3>
              <p className="text-gray-600">Planes flexibles adaptados a tu presupuesto</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <RefreshCw className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trade-In Garantizado</h3>
              <p className="text-gray-600">Valor justo por tu vehículo actual</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <Percent className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Descuentos Especiales</h3>
              <p className="text-gray-600">Ofertas exclusivas para nuestros clientes</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromotionsPage;