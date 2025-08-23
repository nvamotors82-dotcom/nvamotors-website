import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Fuel, Zap, Eye, Heart, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockVehicles } from '../data/mockData';

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

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Get unique makes for filter
  const uniqueMakes = [...new Set(mockVehicles.map(v => v.make))];

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMake = selectedMake === 'all' || vehicle.make === selectedMake;
      const matchesCondition = selectedCondition === 'all' || vehicle.condition === selectedCondition;
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        matchesPrice = vehicle.price >= min && (max ? vehicle.price <= max : true);
      }
      
      return matchesSearch && matchesMake && matchesCondition && matchesPrice;
    });
  }, [searchTerm, selectedMake, selectedCondition, priceRange, mockVehicles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nuestro Inventario
            </h1>
            <p className="text-lg text-gray-600">
              Explora nuestra amplia selección de vehículos de calidad
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedMake} onValueChange={setSelectedMake}>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {uniqueMakes.map(make => (
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Condición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las condiciones</SelectItem>
                <SelectItem value="Nuevo">Nuevo</SelectItem>
                <SelectItem value="Seminuevo">Seminuevo</SelectItem>
                <SelectItem value="Usado">Usado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="0-25000">Hasta $25,000</SelectItem>
                <SelectItem value="25000-40000">$25,000 - $40,000</SelectItem>
                <SelectItem value="40000-60000">$40,000 - $60,000</SelectItem>
                <SelectItem value="60000">Más de $60,000</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedMake('all');
                setSelectedCondition('all');
                setPriceRange('all');
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredVehicles.length} de {mockVehicles.length} vehículos
          </p>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron vehículos
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar los filtros para encontrar más opciones
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedMake('all');
                setSelectedCondition('all');
                setPriceRange('all');
              }}
            >
              Ver Todos los Vehículos
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default InventoryPage;