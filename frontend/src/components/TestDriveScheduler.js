import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, Car, User, Mail, Phone as PhoneIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../hooks/use-toast';
import apiService from '../services/api';

const TestDriveScheduler = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: '',
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    additionalComments: ''
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await apiService.getVehicles({ limit: 50 });
        setVehicles(response.vehicles || []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock submission for now - you can implement the backend endpoint later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('testDrive.success'),
        description: t('testDrive.successDesc'),
      });

      setFormData({
        vehicleId: '',
        fullName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        additionalComments: ''
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: "Error al programar la cita. Inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-red-100 text-red-800 px-4 py-2">
            {t('testDrive.title')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('testDrive.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('testDrive.subtitle')}
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl text-gray-900">
              <Car className="h-6 w-6 text-red-600" />
              <span>{t('testDrive.title')}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Car className="h-4 w-4 text-red-600" />
                  <span>{t('testDrive.selectVehicle')} *</span>
                </label>
                <Select 
                  value={formData.vehicleId} 
                  onValueChange={(value) => handleSelectChange('vehicleId', value)}
                >
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder={t('testDrive.selectVehicle')} />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.year} {vehicle.make} {vehicle.model} - ${vehicle.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <User className="h-4 w-4 text-red-600" />
                    <span>{t('testDrive.fullName')} *</span>
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder={t('testDrive.fullName')}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-red-600" />
                    <span>{t('testDrive.email')} *</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={t('testDrive.email')}
                    className="text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 text-red-600" />
                  <span>{t('testDrive.phone')} *</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(702) 501-9216"
                  className="text-lg"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span>{t('testDrive.preferredDate')} *</span>
                  </label>
                  <Input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    min={today}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span>{t('testDrive.preferredTime')} *</span>
                  </label>
                  <Select 
                    value={formData.preferredTime} 
                    onValueChange={(value) => handleSelectChange('preferredTime', value)}
                  >
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder={t('testDrive.preferredTime')} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('testDrive.additionalComments')}
                </label>
                <Textarea
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder={t('testDrive.additionalComments')}
                  className="text-lg"
                />
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('common.loading')}...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-5 w-5" />
                    {t('testDrive.schedule')}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('common.importantInfo') || 'Información Importante'}
            </h3>
            <p className="text-gray-700">
              {t('common.testDriveInfo') || 'Las pruebas de manejo requieren identificación válida y están sujetas a disponibilidad. Te contactaremos para confirmar tu cita.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDriveScheduler;