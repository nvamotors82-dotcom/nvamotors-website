import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, Quote, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import apiService from '../services/api';

const TestimonialCard = ({ testimonial }) => {
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

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group">
      <CardContent className="p-8">
        <div className="absolute top-4 right-4 text-red-100 group-hover:text-red-200 transition-colors">
          <Quote className="h-8 w-8" />
        </div>
        
        <div className="space-y-6">
          {/* Stars */}
          <div className="flex space-x-1">
            {renderStars(testimonial.rating)}
          </div>
          
          {/* Comment */}
          <blockquote className="text-gray-700 leading-relaxed text-lg font-medium">
            "{testimonial.comment}"
          </blockquote>
          
          {/* Vehicle Badge */}
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 transition-colors">
            {testimonial.vehicle}
          </Badge>
          
          {/* Customer Info */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <Avatar className="h-14 w-14 ring-2 ring-red-100">
              <AvatarFallback className="bg-gradient-to-br from-red-100 to-red-200 text-red-700 font-bold text-lg">
                {getInitials(testimonial.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
              <div className="text-sm text-gray-500">
                {new Date(testimonial.date || testimonial.testimonial_date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
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
              {language === 'es' ? 'Testimonios' : 'Testimonials'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {language === 'es' ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Customers Say'}
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
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {language === 'es' ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Customers Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'es' 
              ? 'La satisfacción de nuestros clientes es nuestra mayor recompensa. Conoce sus experiencias con NVAMOTORS.'
              : 'Our customers\' satisfaction is our greatest reward. Learn about their experiences with NVAMOTORS.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 bg-gradient-to-r from-yellow-50 via-white to-orange-50 rounded-3xl p-12 shadow-2xl border border-yellow-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">4.9/5</div>
              <div className="text-gray-600 font-medium">
                {language === 'es' ? 'Calificación Promedio' : 'Average Rating'}
              </div>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-600 font-medium">
                {language === 'es' ? 'Clientes Satisfechos' : 'Satisfied Customers'}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">98%</div>
              <div className="text-gray-600 font-medium">
                {language === 'es' ? 'Tasa de Recomendación' : 'Recommendation Rate'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;