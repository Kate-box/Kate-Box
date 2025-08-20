import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const ProfitPerEmployeeCalculator = ({ onResultUpdate }) => {
  const { sharedInputs, updateSharedInputs, updateCalculatorData } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    netProfit: 1000000,
    totalEmployees: sharedInputs.totalEmployees,
    previousNetProfit: 800000,
    previousEmployees: 45
  });

  const [currentProfitPerEmployee, setCurrentProfitPerEmployee] = useState(0);
  const [previousProfitPerEmployee, setPreviousProfitPerEmployee] = useState(0);
  const [improvement, setImprovement] = useState(0);

  // Sync with shared inputs when they change from other calculators
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      totalEmployees: sharedInputs.totalEmployees
    }));
  }, [sharedInputs]);

  useEffect(() => {
    const current = inputs.netProfit / inputs.totalEmployees;
    const previous = inputs.previousNetProfit / inputs.previousEmployees;
    const change = current - previous;
    
    setCurrentProfitPerEmployee(current);
    setPreviousProfitPerEmployee(previous);
    setImprovement(change);
    
    // Update shared context for dashboard
    updateCalculatorData('profit', {
      id: 'profit',
      result: current,
      inputs: inputs,
      type: 'profit',
      timestamp: new Date()
    });
    
    onResultUpdate?.(current);
  }, [inputs, onResultUpdate, updateCalculatorData]);

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
    
    // Update shared inputs when employees change
    if (field === 'totalEmployees') {
      updateSharedInputs({ totalEmployees: numValue });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-indigo-900">How it works</span>
        </div>
        <p className="text-indigo-800 text-sm">
          Measures your bottom-line contribution per person. Track before and after interventions to prove ROI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Current Period</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Profit (£)
            </label>
            <input
              type="number"
              value={inputs.netProfit}
              onChange={(e) => handleInputChange('netProfit', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="1000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Employees (FTE)
            </label>
            <input
              type="number"
              value={inputs.totalEmployees}
              onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Previous Period (Optional)</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Net Profit (£)
            </label>
            <input
              type="number"
              value={inputs.previousNetProfit}
              onChange={(e) => handleInputChange('previousNetProfit', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="800000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Employees (FTE)
            </label>
            <input
              type="number"
              value={inputs.previousEmployees}
              onChange={(e) => handleInputChange('previousEmployees', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="45"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-center">
          <h4 className="text-lg font-semibold mb-2">Current Profit per Employee</h4>
          <div className="text-3xl font-bold">£{currentProfitPerEmployee.toLocaleString()}</div>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <h4 className="text-lg font-semibold mb-2 text-gray-900">Previous Period</h4>
          <div className="text-3xl font-bold text-gray-700">£{previousProfitPerEmployee.toLocaleString()}</div>
        </div>

        <div className={`rounded-xl p-6 text-center ${
          improvement >= 0 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <h4 className="text-lg font-semibold mb-2">Change</h4>
          <div className="text-3xl font-bold">
            {improvement >= 0 ? '+' : ''}£{improvement.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Calculation Breakdown</h4>
          <Calculator className="w-6 h-6 text-gray-600" />
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Formula:</strong> Net Profit ÷ Total FTE = Profit per Employee</p>
          <p><strong>Current:</strong> £{inputs.netProfit.toLocaleString()} ÷ {inputs.totalEmployees} = £{currentProfitPerEmployee.toLocaleString()}</p>
          <p><strong>Previous:</strong> £{inputs.previousNetProfit.toLocaleString()} ÷ {inputs.previousEmployees} = £{previousProfitPerEmployee.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Use This Metric To</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Measure people strategy ROI</li>
            <li>• Compare performance over time</li>
            <li>• Benchmark against industry</li>
            <li>• Justify HR investments</li>
          </ul>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Factors That Improve This</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Higher employee engagement</li>
            <li>• Better talent retention</li>
            <li>• Improved productivity</li>
            <li>• Effective leadership development</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfitPerEmployeeCalculator;