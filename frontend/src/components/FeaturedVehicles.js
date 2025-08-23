import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Fuel, Zap, Eye, Heart, Loader2 } from 'lucide-react';
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
                +{vehicle.features.length - 2} {t('common.more') || 'más'}
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

const FeaturedVehicles = () => {
  const { t } = useLanguage();
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await apiService.getVehicles({ limit: 3 });
        setFeaturedVehicles(response.vehicles || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured vehicles:', err);
        setError(t('featured.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [t]);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-6 py-3 text-sm font-semibold">
              {t('featured.badge')}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('featured.title')}
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              <span className="text-lg text-gray-600">{t('featured.loading')}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full -translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-6 py-3 text-sm font-semibold shadow-lg">
            {t('featured.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t('featured.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/inventory">
            <Button size="lg" variant="outline" className="px-10 py-4 text-lg border-2 border-gray-300 hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              {t('featured.viewAllInventory')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;