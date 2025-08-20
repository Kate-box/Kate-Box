import React, { useState } from 'react';
import { MessageSquare, Users, UserX, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';
import CommunicationCalculator from './calculators/CommunicationCalculator';
import EngagementCalculator from './calculators/EngagementCalculator';
import TurnoverCalculator from './calculators/TurnoverCalculator';
import AbsenceCalculator from './calculators/AbsenceCalculator';
import ServiceLossCalculator from './calculators/ServiceLossCalculator';
import ProfitPerEmployeeCalculator from './calculators/ProfitPerEmployeeCalculator';

const CalculatorGrid = () => {
  const [activeCalculator, setActiveCalculator] = useState('communication');
  const [results, setResults] = useState({});

  const calculators = [
    {
      id: 'communication',
      title: 'Communication Cost',
      icon: MessageSquare,
      description: 'Quantify salary cost lost due to poor communication',
      color: 'from-blue-500 to-blue-600',
      component: CommunicationCalculator
    },
    {
      id: 'engagement',
      title: 'Engagement Impact',
      icon: Users,
      description: 'Calculate lost productivity from disengaged employees',
      color: 'from-green-500 to-green-600',
      component: EngagementCalculator
    },
    {
      id: 'turnover',
      title: 'Turnover Cost',
      icon: UserX,
      description: 'Estimate financial loss from high staff turnover',
      color: 'from-red-500 to-red-600',
      component: TurnoverCalculator
    },
    {
      id: 'absence',
      title: 'Absence Cost',
      icon: Calendar,
      description: 'Convert sickness/absence into direct costs',
      color: 'from-purple-500 to-purple-600',
      component: AbsenceCalculator
    },
    {
      id: 'service',
      title: 'Service/Quality Loss',
      icon: AlertTriangle,
      description: 'Quantify lost customers and service failures',
      color: 'from-pink-500 to-pink-600',
      component: ServiceLossCalculator
    },
    {
      id: 'profit',
      title: 'Profit per Employee',
      icon: TrendingUp,
      description: 'Measure bottom-line contribution per person',
      color: 'from-indigo-500 to-indigo-600',
      component: ProfitPerEmployeeCalculator
    }
  ];

  const activeCalc = calculators.find(calc => calc.id === activeCalculator);
  const ActiveComponent = activeCalc?.component;

  const handleResultUpdate = (calculatorId, result) => {
    setResults(prev => ({
      ...prev,
      [calculatorId]: result
    }));
  };

  return (
    <section id="calculators" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Interactive ROI Calculators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a calculator below to quantify the financial impact of your people strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calculator Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Calculator</h3>
            {calculators.map((calculator) => (
              <button
                key={calculator.id}
                onClick={() => setActiveCalculator(calculator.id)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  activeCalculator === calculator.id
                    ? 'bg-gradient-to-r ' + calculator.color + ' text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <calculator.icon className="w-5 h-5" />
                  <span className="font-semibold">{calculator.title}</span>
                </div>
                <p className={`text-sm ${
                  activeCalculator === calculator.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {calculator.description}
                </p>
              </button>
            ))}
          </div>

          {/* Active Calculator */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${activeCalc?.color} rounded-xl flex items-center justify-center shadow-md`}>
                  {activeCalc && <activeCalc.icon className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{activeCalc?.title} Calculator</h3>
                  <p className="text-gray-600">{activeCalc?.description}</p>
                </div>
              </div>

              {ActiveComponent && (
                <ActiveComponent 
                  onResultUpdate={(result) => handleResultUpdate(activeCalculator, result)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorGrid;