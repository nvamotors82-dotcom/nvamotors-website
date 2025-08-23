import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Fuel, 
  Zap, 
  Calendar, 
  Gauge,
  Car,
  Shield,
  Phone,
  MessageCircle,
  Check,
  Loader2
} from 'lucide-react';
import apiService from '../services/api';

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const vehicleData = await apiService.getVehicleById(id);
        setVehicle(vehicleData);
        setError(null);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('Vehículo no encontrado');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando vehículo...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehículo no encontrado</h1>
          <Link to="/inventory">
            <Button>Volver al Inventario</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const vehicleSpecs = [
    { label: 'Marca', value: vehicle.make, icon: Car },
    { label: 'Modelo', value: vehicle.model, icon: Car },
    { label: 'Año', value: vehicle.year, icon: Calendar },
    { label: 'Kilometraje', value: `${vehicle.mileage.toLocaleString()} km`, icon: Gauge },
    { label: 'Transmisión', value: vehicle.transmission, icon: Zap },
    { label: 'Combustible', value: vehicle.fuelType, icon: Fuel },
    { label: 'Condición', value: vehicle.condition, icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <Link to="/inventory" className="hover:text-blue-600">Inventario</Link>
            <span>/</span>
            <span className="text-gray-900">{vehicle.make} {vehicle.model}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Back Button */}
            <Link to="/inventory">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inventario
              </Button>
            </Link>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={vehicle.gallery[currentImage] || vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {vehicle.gallery && vehicle.gallery.length > 1 && (
                <div className="flex space-x-2">
                  {vehicle.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${vehicle.make} ${vehicle.model} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                        currentImage === index ? 'ring-2 ring-blue-600' : 'hover:opacity-75'
                      }`}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Details Tabs */}
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="description">Descripción</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vehicleSpecs.map((spec, index) => {
                        const IconComponent = spec.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="text-sm text-gray-600">{spec.label}</div>
                              <div className="font-semibold text-gray-900">{spec.value}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </h1>
                      <Badge className="bg-blue-600 text-white">
                        {vehicle.year}
                      </Badge>
                    </div>
                    <Badge variant="secondary">{vehicle.condition}</Badge>
                  </div>
                  
                  {/* Price */}
                  <div className="text-center py-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(vehicle.price)}
                    </div>
                    <div className="text-sm text-gray-600">Precio final</div>
                  </div>
                  
                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      <Phone className="mr-2 h-5 w-5" />
                      Llamar Ahora
                    </Button>
                    
                    <Button variant="outline" className="w-full text-lg py-3">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                    
                    <Button variant="outline" className="w-full text-lg py-3">
                      Agendar Prueba de Manejo
                    </Button>
                  </div>
                  
                  {/* Quick Info */}
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kilometraje:</span>
                      <span className="font-semibold">{vehicle.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transmisión:</span>
                      <span className="font-semibold">{vehicle.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Combustible:</span>
                      <span className="font-semibold">{vehicle.fuelType}</span>
                    </div>
                  </div>
                  
                  {/* Guarantee */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-800">
                      <Shield className="h-5 w-5" />
                      <span className="font-semibold">Garantía Incluida</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Inspección de 150 puntos completada
                    </p>
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

export default VehicleDetailPage;