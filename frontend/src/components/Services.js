import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CreditCard, Shield, RefreshCw, Search, Users, Wrench } from 'lucide-react';

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
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white">
      <CardContent className="p-8 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
          <IconComponent className="h-8 w-8 text-blue-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Financiamiento Flexible",
      description: "Planes de financiamiento adaptados a tu presupuesto con las mejores tasas del mercado y aprobación rápida.",
      icon: "CreditCard"
    },
    {
      id: 2,
      title: "Garantía Extendida",
      description: "Todos nuestros vehículos incluyen garantía extendida y servicio post-venta de calidad premium.",
      icon: "Shield"
    },
    {
      id: 3,
      title: "Programa de Intercambio",
      description: "Acepta tu vehículo actual como parte de pago. Evaluación justa y proceso transparente.",
      icon: "RefreshCw"
    },
    {
      id: 4,
      title: "Inspección Completa",
      description: "Inspección rigurosa de 150 puntos en todos nuestros vehículos usados para garantizar calidad.",
      icon: "Search"
    },
    {
      id: 5,
      title: "Asesoría Personalizada",
      description: "Nuestro equipo de expertos te acompaña en todo el proceso para encontrar tu vehículo ideal.",
      icon: "Users"
    },
    {
      id: 6,
      title: "Servicio Técnico",
      description: "Taller especializado con técnicos certificados para mantenimiento y reparaciones.",
      icon: "Wrench"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¿Por Qué Elegir NVAMOTORS?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una experiencia completa de compra con servicios integrales 
            que garantizan tu satisfacción y tranquilidad.
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