import React, { useState } from 'react';
import { Calculator, TrendingDown, DollarSign, Users } from 'lucide-react';
import Demo from './Demo';

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  
  const stats = [
    { icon: TrendingDown, value: '£480k', label: 'Average communication loss per 100 employees' },
    { icon: Users, value: '67%', label: 'Of employees are disengaged (Gallup)' },
    { icon: DollarSign, value: '50-200%', label: 'Salary cost to replace one employee' },
  ];

  const scrollToCalculators = () => {
    const calculatorsSection = document.getElementById('calculators');
    if (calculatorsSection) {
      calculatorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDemo = () => {
    setIsDemoOpen(true);
  };

  return (
    <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-loose pb-12 mb-4">
            Calculate Your
            <span className="block" style={{color: '#087590', paddingBottom: '1rem', marginBottom: '0.25rem', overflow: 'visible'}}>
              People Strategy
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Quantify the financial impact of poor communication, low engagement, high turnover, and other people-related costs. 
            Make data-driven decisions with our comprehensive ROI calculator suite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToCalculators}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl"
            >
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">Start Calculating</span>
            </button>
            <button 
              onClick={openDemo}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
            >
              View Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <Demo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  );
};

export default Hero;