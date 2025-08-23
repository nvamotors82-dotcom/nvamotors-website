import React from 'react';
import { Button } from './ui/button';
import { Search, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-red-50 to-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-white/90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-red-600">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Concesionario #1 en Las Vegas</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Encuentra tu
                <span className="text-red-600"> vehículo ideal</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                En {companyInfo.name} te ayudamos a encontrar el auto perfecto con los mejores 
                precios, financiamiento accesible y garantía completa.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inventory">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg group">
                  Ver Inventario
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2 hover:bg-gray-50">
                <Search className="mr-2 h-5 w-5" />
                Buscar Vehículo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">500+</div>
                <div className="text-sm text-gray-600">Vehículos Vendidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">15+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">98%</div>
                <div className="text-sm text-gray-600">Clientes Satisfechos</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold text-gray-900">
                  {companyInfo.owner} - Propietario
                </div>
                <div className="text-gray-600">
                  {companyInfo.partner} - Socio Principal
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {companyInfo.contact.phone}
                </div>
                <div className="text-sm text-gray-600">
                  {companyInfo.address.full}
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative transform hover:scale-105 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Vehículo premium"
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-600 fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Calidad Garantizada</div>
                    <div className="text-sm text-gray-600">Inspección de 150 puntos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;