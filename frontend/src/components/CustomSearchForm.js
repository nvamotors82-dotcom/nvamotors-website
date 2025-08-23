import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Send, Car, DollarSign, Calendar, Settings } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const CustomSearchForm = () => {
  const { toast } = useToast();
  const [searchForm, setSearchForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredBrand: '',
    budgetRange: '',
    vehicleType: '',
    yearRange: '',
    specificRequirements: '',
    suggestions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Solicitud enviada",
      description: "Nuestro equipo te contactará pronto con opciones personalizadas.",
    });
    
    // Reset form
    setSearchForm({
      name: '',
      email: '',
      phone: '',
      preferredBrand: '',
      budgetRange: '',
      vehicleType: '',
      yearRange: '',
      specificRequirements: '',
      suggestions: ''
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
            Búsqueda Personalizada
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¿No Encuentras lo que Buscas?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cuéntanos exactamente qué necesitas y te ayudaremos a encontrar el vehículo perfecto. 
            También valoramos tus sugerencias para mejorar nuestro servicio.
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl text-gray-900">
              <Search className="h-6 w-6 text-purple-600" />
              <span>Búsqueda Personalizada</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={searchForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={searchForm.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={searchForm.phone}
                    onChange={handleInputChange}
                    placeholder="(702) 501-9216"
                  />
                </div>
              </div>

              {/* Vehicle Preferences */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Car className="h-5 w-5 text-purple-600" />
                  <span>Preferencias del Vehículo</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca Preferida
                    </label>
                    <Select value={searchForm.preferredBrand} onValueChange={(value) => handleSelectChange('preferredBrand', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="hyundai">Hyundai</SelectItem>
                        <SelectItem value="other">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Vehículo
                    </label>
                    <Select value={searchForm.vehicleType} onValueChange={(value) => handleSelectChange('vehicleType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Pickup</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rango de Año
                    </label>
                    <Select value={searchForm.yearRange} onValueChange={(value) => handleSelectChange('yearRange', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-2025">2024 - 2025</SelectItem>
                        <SelectItem value="2020-2023">2020 - 2023</SelectItem>
                        <SelectItem value="2015-2019">2015 - 2019</SelectItem>
                        <SelectItem value="2010-2014">2010 - 2014</SelectItem>
                        <SelectItem value="older">Anterior a 2010</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presupuesto
                    </label>
                    <Select value={searchForm.budgetRange} onValueChange={(value) => handleSelectChange('budgetRange', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Presupuesto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-15000">$0 - $15,000</SelectItem>
                        <SelectItem value="15000-25000">$15,000 - $25,000</SelectItem>
                        <SelectItem value="25000-40000">$25,000 - $40,000</SelectItem>
                        <SelectItem value="40000-60000">$40,000 - $60,000</SelectItem>
                        <SelectItem value="60000+">$60,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Requirements and Suggestions */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    <span>Requisitos Específicos</span>
                  </label>
                  <Textarea
                    name="specificRequirements"
                    value={searchForm.specificRequirements}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe características específicas que necesitas: color, transmisión, kilometraje máximo, características especiales, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Send className="h-4 w-4 text-purple-600" />
                    <span>Sugerencias para Mejorar Nuestro Servicio</span>
                  </label>
                  <Textarea
                    name="suggestions"
                    value={searchForm.suggestions}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="¿Qué podríamos hacer mejor? ¿Qué servicios adicionales te gustaría que ofreciéramos?"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Solicitud Personalizada
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Prefieres hablar directamente con nosotros?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              📞 (702) 501-9216
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-green-50 hover:border-green-600 hover:text-green-600">
              💬 WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSearchForm;