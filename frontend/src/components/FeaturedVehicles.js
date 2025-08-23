import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Fuel, Zap, Eye, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const VehicleCard = ({ vehicle }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {vehicle.condition}
          </Badge>
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 text-white">
            {vehicle.year}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {formatPrice(vehicle.price)}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center space-x-1">
              <Fuel className="h-4 w-4" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {vehicle.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {vehicle.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{vehicle.features.length - 2} más
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex space-x-3 w-full">
          <Link to={`/vehicle/${vehicle.id}`} className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Eye className="mr-2 h-4 w-4" />
              Ver Detalles
            </Button>
          </Link>
          <Button variant="outline" className="hover:bg-gray-50">
            Cotizar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedVehicles = () => {
  const featuredVehicles = mockVehicles.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
            Vehículos Destacados
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Nuestros Mejores Vehículos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección premium de vehículos cuidadosamente inspeccionados 
            y listos para entrega inmediata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/inventory">
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600">
              Ver Todo el Inventario
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;