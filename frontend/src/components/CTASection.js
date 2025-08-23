import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                ¿Listo para encontrar tu próximo vehículo?
              </h2>
              <p className="text-xl text-blue-100">
                Nuestro equipo de expertos está aquí para ayudarte. Obtén una cotización 
                personalizada o agenda una cita para ver nuestros vehículos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inventory">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg group"
                >
                  Ver Inventario
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contactar Ahora
                </Button>
              </Link>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-blue-500">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-blue-300" />
                <div>
                  <div className="font-semibold">Llama ahora</div>
                  <div className="text-blue-200">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-blue-300" />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-blue-200">Respuesta inmediata</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative transform hover:scale-105 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Concesionario NVAMOTORS"
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Stats */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Años de Experiencia</div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
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