import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FinanceCalculator = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState({
    vehiclePrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '48'
  });
  
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePayments = () => {
    const price = parseFloat(values.vehiclePrice) || 0;
    const down = parseFloat(values.downPayment) || 0;
    const rate = parseFloat(values.interestRate) || 0;
    const term = parseInt(values.loanTerm) || 48;

    if (price <= 0 || price <= down) {
      alert('Please enter valid values');
      return;
    }

    const loanAmount = price - down;
    const monthlyRate = rate / 100 / 12;
    
    let monthlyPayment = 0;
    if (rate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                      (Math.pow(1 + monthlyRate, term) - 1);
    } else {
      monthlyPayment = loanAmount / term;
    }

    const biweeklyPayment = monthlyPayment / 2;
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - loanAmount;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      biweeklyPayment: biweeklyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      loanAmount: loanAmount.toFixed(2)
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            {t('calculator.title')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('calculator.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl text-gray-900">
                <Calculator className="h-6 w-6 text-green-600" />
                <span>{t('calculator.title')}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span>{t('calculator.vehiclePrice')}</span>
                  </label>
                  <Input
                    type="number"
                    name="vehiclePrice"
                    value={values.vehiclePrice}
                    onChange={handleInputChange}
                    placeholder="25000"
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span>{t('calculator.downPayment')}</span>
                  </label>
                  <Input
                    type="number"
                    name="downPayment"
                    value={values.downPayment}
                    onChange={handleInputChange}
                    placeholder="5000"
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Percent className="h-4 w-4 text-green-600" />
                    <span>{t('calculator.interestRate')}</span>
                  </label>
                  <Input
                    type="number"
                    name="interestRate"
                    value={values.interestRate}
                    onChange={handleInputChange}
                    placeholder="5.5"
                    step="0.1"
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>{t('calculator.loanTerm')}</span>
                  </label>
                  <select
                    name="loanTerm"
                    value={values.loanTerm}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                  >
                    <option value="24">24 {t('calculator.months')}</option>
                    <option value="36">36 {t('calculator.months')}</option>
                    <option value="48">48 {t('calculator.months')}</option>
                    <option value="60">60 {t('calculator.months')}</option>
                    <option value="72">72 {t('calculator.months')}</option>
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={calculatePayments}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                {t('calculator.calculate')}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                {t('common.results') || 'Resultados'}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-600">
                      <div className="text-sm text-gray-600">{t('calculator.monthlyPayment')}</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.monthlyPayment)}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
                      <div className="text-sm text-gray-600">{t('calculator.biweeklyPayment')}</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.biweeklyPayment)}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-600">
                      <div className="text-sm text-gray-600">{t('calculator.totalInterest')}</div>
                      <div className="text-xl font-bold text-purple-600">
                        {formatCurrency(results.totalInterest)}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-600">
                      <div className="text-sm text-gray-600">{t('calculator.totalPayment')}</div>
                      <div className="text-xl font-bold text-gray-600">
                        {formatCurrency(results.totalPayment)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-700 text-center">
                      {t('common.loanAmount') || 'Monto del Préstamo'}: <strong>{formatCurrency(results.loanAmount)}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>{t('common.enterValues') || 'Ingresa los valores para calcular tus pagos'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinanceCalculator;