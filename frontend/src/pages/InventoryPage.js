import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Fuel, Zap, Eye, Heart, Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';

const VehicleCard = ({ vehicle }) => {
  const { t } = useLanguage();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg">
            {vehicle.condition}
          </Badge>
          <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg transform hover:scale-110">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
            {vehicle.year}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              {formatPrice(vehicle.price)}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span>{vehicle.mileage ? vehicle.mileage.toLocaleString() : 0} km</span>
            </div>
            <div className="flex items-center space-x-2">
              <Fuel className="h-4 w-4 text-green-600" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {vehicle.features && vehicle.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-300 hover:border-red-300 hover:text-red-600 transition-colors">
                {feature}
              </Badge>
            ))}
            {vehicle.features && vehicle.features.length > 2 && (
              <Badge variant="outline" className="text-xs border-gray-300 hover:border-red-300 hover:text-red-600 transition-colors">
                +{vehicle.features.length - 2} {t('common.more')}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex space-x-3 w-full">
          <Link to={`/vehicle/${vehicle.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Eye className="mr-2 h-4 w-4" />
              {t('featured.viewDetails')}
            </Button>
          </Link>
          <Button variant="outline" className="hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition-all duration-300 shadow-md">
            {t('featured.quote')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const InventoryPage = () => {
  const { t } = useLanguage();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Fetch vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const params = {};
        
        if (searchTerm) params.search = searchTerm;
        if (selectedMake !== 'all') params.make = selectedMake;
        if (selectedCondition !== 'all') params.condition = selectedCondition;
        
        if (priceRange !== 'all') {
          const [min, max] = priceRange.split('-').map(Number);
          if (min) params.min_price = min;
          if (max) params.max_price = max;
        }
        
        const response = await apiService.getVehicles(params);
        setVehicles(response.vehicles || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError(t('featured.error'));
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchVehicles();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedMake, selectedCondition, priceRange, t]);

  // Get unique makes from current vehicles for filter
  const uniqueMakes = useMemo(() => {
    return [...new Set(vehicles.map(v => v.make))];
  }, [vehicles]);

  const filteredVehicles = vehicles;

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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-6 py-3 text-sm font-semibold shadow-lg">
              {t('nav.inventory')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('inventory.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('inventory.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="bg-gradient-to-br from-white to-gray-50 shadow-xl border-0 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <SlidersHorizontal className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t('inventory.filters')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('inventory.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-red-500"
                />
              </div>
              
              <Select value={selectedMake} onValueChange={setSelectedMake}>
                <SelectTrigger className="h-12 text-lg border-2 focus:border-red-500">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('inventory.allMakes')}</SelectItem>
                  {uniqueMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="h-12 text-lg border-2 focus:border-red-500">
                  <SelectValue placeholder="Condición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('inventory.allConditions')}</SelectItem>
                  <SelectItem value="Nuevo">Nuevo</SelectItem>
                  <SelectItem value="Seminuevo">Seminuevo</SelectItem>
                  <SelectItem value="Usado">Usado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12 text-lg border-2 focus:border-red-500">
                  <SelectValue placeholder="Rango de precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('inventory.allPrices')}</SelectItem>
                  <SelectItem value="0-25000">$0 - $25,000</SelectItem>
                  <SelectItem value="25000-40000">$25,000 - $40,000</SelectItem>
                  <SelectItem value="40000-60000">$40,000 - $60,000</SelectItem>
                  <SelectItem value="60000">$60,000+</SelectItem>
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
                className="h-12 text-lg border-2 border-gray-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
              >
                {t('inventory.clearFilters')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-8">
          <p className="text-xl text-gray-600">
            {loading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                <span>{t('common.loading')}</span>
              </span>
            ) : (
              `${t('inventory.showing')} ${filteredVehicles.length} ${t('inventory.vehicles')}`
            )}
          </p>
        </div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex items-center space-x-4">
              <Loader2 className="h-12 w-12 animate-spin text-red-600" />
              <span className="text-2xl text-gray-600">{t('featured.loading')}</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-6 text-xl">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
              {t('common.retry') || 'Reintentar'}
            </Button>
          </div>
        ) : filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-6">
              <Search className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('inventory.noResults')}
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {t('inventory.noResultsDesc')}
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedMake('all');
                setSelectedCondition('all');
                setPriceRange('all');
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
            >
              {t('inventory.viewAll')}
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default InventoryPage;