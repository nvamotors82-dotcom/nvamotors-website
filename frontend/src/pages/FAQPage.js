import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { HelpCircle, Search, MessageCircle, Send, Phone } from 'lucide-react';
import { mockFAQs } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const FAQPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [customQuestion, setCustomQuestion] = useState({
    name: '',
    email: '',
    question: ''
  });

  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomQuestionSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Pregunta enviada",
      description: "Te responderemos pronto por email o teléfono.",
    });
    setCustomQuestion({ name: '', email: '', question: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros 
            vehículos, servicios y procesos de compra.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar en preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Preguntas y Respuestas
            </h2>
            
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron preguntas que coincidan con tu búsqueda.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Question Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  ¿No encuentras tu respuesta?
                </h3>
              </div>
              
              <form onSubmit={handleCustomQuestionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={customQuestion.name}
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
                    value={customQuestion.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu Pregunta *
                  </label>
                  <Textarea
                    name="question"
                    value={customQuestion.question}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Escribe tu pregunta aquí..."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Pregunta
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Contact */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                ¿Necesitas Ayuda Inmediata?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Llámanos</h4>
                    <p className="text-gray-600">(702) 501-9216</p>
                    <p className="text-sm text-gray-500">Lun - Vie: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                    <p className="text-gray-600">Respuesta inmediata</p>
                    <Button className="mt-2 bg-green-600 hover:bg-green-700">
                      Chatear Ahora
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Horario de Atención</h4>
                  <div className="text-sm text-blue-800">
                    <div>Lunes - Viernes: 9:00 AM - 6:00 PM</div>
                    <div>Sábados: 9:00 AM - 4:00 PM</div>
                    <div>Domingos: Cerrado</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Topics */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Temas Populares
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Financiamiento', 'Garantía', 'Trade-in', 'Prueba de Manejo', 'Documentos', 'Inspección'].map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                onClick={() => setSearchTerm(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;