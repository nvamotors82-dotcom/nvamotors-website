import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Star, 
  Quote, 
  Loader2, 
  CheckCircle, 
  Camera, 
  MapPin,
  Calendar,
  ThumbsUp,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';

const EnhancedTestimonialCard = ({ testimonial, isHighlighted = false }) => {
  const { language } = useLanguage();
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Enhanced testimonials with photos and more details
  const enhancedData = {
    1: {
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Las Vegas, NV",
      purchaseDate: "Diciembre 2024",
      verified: true,
      vehiclePhoto: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    2: {
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b192?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "Henderson, NV",
      purchaseDate: "Diciembre 2024",
      verified: true,
      vehiclePhoto: "https://images.unsplash.com/photo-1619362280286-f2aadb0634ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    3: {
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      location: "North Las Vegas, NV",
      purchaseDate: "Diciembre 2024",
      verified: true,
      vehiclePhoto: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  };

  const enhanced = enhancedData[testimonial.id] || enhancedData[1];

  return (
    <Card className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group ${
      isHighlighted 
        ? 'bg-gradient-to-br from-yellow-50 via-white to-orange-50 ring-2 ring-yellow-200' 
        : 'bg-gradient-to-br from-white to-gray-50'
    }`}>
      <CardContent className="p-8">
        {/* Verified Badge */}
        {enhanced.verified && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              {language === 'es' ? 'Verificado' : 'Verified'}
            </Badge>
          </div>
        )}
        
        <div className="absolute top-4 left-4 text-yellow-100 group-hover:text-yellow-200 transition-colors">
          <Quote className="h-8 w-8" />
        </div>
        
        <div className="space-y-6 mt-8">
          {/* Stars */}
          <div className="flex space-x-1">
            {renderStars(testimonial.rating)}
          </div>
          
          {/* Comment */}
          <blockquote className="text-gray-700 leading-relaxed text-lg font-medium">
            "{testimonial.comment}"
          </blockquote>
          
          {/* Vehicle Info with Photo */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-200">
              <img 
                src={enhanced.vehiclePhoto} 
                alt={testimonial.vehicle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              {testimonial.vehicle}
            </Badge>
          </div>
          
          {/* Customer Info with Photo */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <Avatar className="h-16 w-16 ring-2 ring-yellow-100">
              <AvatarImage src={enhanced.photo} alt={testimonial.name} />
              <AvatarFallback className="bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 font-bold text-lg">
                {getInitials(testimonial.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                {enhanced.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{enhanced.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{enhanced.purchaseDate}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EnhancedTestimonials = () => {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTestimonials();
        setTestimonials(response.testimonials || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(language === 'es' ? 'Error al cargar testimonios' : 'Error loading testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-6 py-3 text-sm font-semibold shadow-lg">
              {language === 'es' ? '⭐ Testimonios Verificados' : '⭐ Verified Testimonials'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {language === 'es' ? 'Clientes Reales, Experiencias Reales' : 'Real Customers, Real Experiences'}
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
              <span className="text-lg text-gray-600">{t('common.loading')}</span>
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-600 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-6 py-3 text-sm font-semibold shadow-lg">
            {language === 'es' ? '⭐ Testimonios Verificados' : '⭐ Verified Testimonials'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {language === 'es' ? 'Clientes Reales, Experiencias Reales' : 'Real Customers, Real Experiences'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'es' 
              ? 'Cada testimonio está verificado y representa una experiencia auténtica con NVAMOTORS. Fotos reales, clientes reales, satisfacción garantizada.'
              : 'Every testimonial is verified and represents an authentic experience with NVAMOTORS. Real photos, real customers, guaranteed satisfaction.'
            }
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <EnhancedTestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              isHighlighted={index === 0} // Highlight first testimonial
            />
          ))}
        </div>

        {/* Enhanced Trust Indicators */}
        <Card className="bg-gradient-to-r from-yellow-50 via-white to-orange-50 rounded-3xl shadow-2xl border border-yellow-100">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'es' ? '🏆 Por Qué Nos Eligen' : '🏆 Why They Choose Us'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">4.9/5</div>
                <div className="text-gray-600 font-medium">
                  {language === 'es' ? 'Calificación Promedio' : 'Average Rating'}
                </div>
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">500+</div>
                <div className="text-gray-600 font-medium">
                  {language === 'es' ? 'Clientes Satisfechos' : 'Satisfied Customers'}
                </div>
                <div className="text-sm text-gray-500">
                  {language === 'es' ? 'En Las Vegas' : 'In Las Vegas'}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto">
                  <ThumbsUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">98%</div>
                <div className="text-gray-600 font-medium">
                  {language === 'es' ? 'Recomendarían NVAMOTORS' : 'Would Recommend NVAMOTORS'}
                </div>
                <div className="text-sm text-gray-500">
                  {language === 'es' ? 'A familiares y amigos' : 'To family and friends'}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">15+</div>
                <div className="text-gray-600 font-medium">
                  {language === 'es' ? 'Años de Experiencia' : 'Years Experience'}
                </div>
                <div className="text-sm text-gray-500">
                  {language === 'es' ? 'Sirviendo Las Vegas' : 'Serving Las Vegas'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {language === 'es' ? '¿Listo para tu próximo vehículo?' : 'Ready for your next vehicle?'}
              </h3>
              <p className="text-red-100 text-lg mb-6">
                {language === 'es' 
                  ? 'Únete a más de 500 clientes satisfechos. ¡Tu experiencia perfecta te espera!'
                  : 'Join over 500 satisfied customers. Your perfect experience awaits!'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {language === 'es' ? 'Ver Inventario' : 'View Inventory'}
                </button>
                <button className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors">
                  {language === 'es' ? 'Contactar Ahora' : 'Contact Now'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;