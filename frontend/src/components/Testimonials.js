import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, Quote, Loader2 } from 'lucide-react';
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
    <Card className="relative overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-8">
        <div className="absolute top-4 right-4 text-blue-100">
          <Quote className="h-8 w-8" />
        </div>
        
        <div className="space-y-6">
          {/* Stars */}
          <div className="flex space-x-1">
            {renderStars(testimonial.rating)}
          </div>
          
          {/* Comment */}
          <blockquote className="text-gray-700 leading-relaxed text-lg">
            "{testimonial.comment}"
          </blockquote>
          
          {/* Vehicle Badge */}
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {testimonial.vehicle}
          </Badge>
          
          {/* Customer Info */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {getInitials(testimonial.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-500">
                {new Date(testimonial.testimonial_date).toLocaleDateString('es-ES', {
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
        setError('Error al cargar testimonios');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
              Testimonios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa. 
            Conoce sus experiencias con NVAMOTORS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">4.9/5</div>
              <div className="text-gray-600">Calificación Promedio</div>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Clientes Satisfechos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Tasa de Recomendación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;