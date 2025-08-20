import React, { useState, useEffect } from 'react';
import { Users, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const EngagementCalculator = ({ onResultUpdate }) => {
  const { updateCalculatorData, sharedInputs, updateSharedInputs } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    totalEmployees: sharedInputs.totalEmployees,
    avgSalary: sharedInputs.avgSalary,
    engagementRate: 33,
    productivityLoss: 25
  });

  const [result, setResult] = useState(0);
  const [disengagedEmployees, setDisengagedEmployees] = useState(0);

  // Sync with shared inputs when they change from other calculators
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      totalEmployees: sharedInputs.totalEmployees,
      avgSalary: sharedInputs.avgSalary
    }));
  }, [sharedInputs]);

  useEffect(() => {
    const disengaged = Math.round(inputs.totalEmployees * (100 - inputs.engagementRate) / 100);
    const calculatedResult = disengaged * inputs.avgSalary * (inputs.productivityLoss / 100);
    
    setDisengagedEmployees(disengaged);
    setResult(calculatedResult);
    
    // Update shared context
    updateCalculatorData('engagement', {
      id: 'engagement',
      result: calculatedResult,
      inputs: { ...inputs, employees: inputs.totalEmployees },
      type: 'engagement',
      timestamp: new Date()
    });
    
    onResultUpdate?.(calculatedResult);
  }, [inputs, onResultUpdate, updateCalculatorData]);

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
    
    // Update shared inputs when employees or salary change
    if (field === 'totalEmployees') {
      updateSharedInputs({ totalEmployees: numValue });
    } else if (field === 'avgSalary') {
      updateSharedInputs({ avgSalary: numValue });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-900">How it works</span>
        </div>
        <p className="text-green-800 text-sm">
          Gallup research shows only ~33% of employees are engaged. Disengaged employees function at ~75% capacity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Employees
          </label>
          <input
            type="number"
            value={inputs.totalEmployees}
            onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Salary (£)
          </label>
          <input
            type="number"
            value={inputs.avgSalary}
            onChange={(e) => handleInputChange('avgSalary', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="40000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engagement Rate (%)
          </label>
          <select
            value={inputs.engagementRate}
            onChange={(e) => handleInputChange('engagementRate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={20}>20% (Poor)</option>
            <option value={33}>33% (Average - Gallup)</option>
            <option value={50}>50% (Good)</option>
            <option value={70}>70% (Excellent)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Productivity Loss (%)
          </label>
          <select
            value={inputs.productivityLoss}
            onChange={(e) => handleInputChange('productivityLoss', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={20}>20% (Mild)</option>
            <option value={25}>25% (Standard)</option>
            <option value={30}>30% (Severe)</option>
            <option value={40}>40% (Critical)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{disengagedEmployees}</div>
          <div className="text-sm text-gray-600">Disengaged Employees</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{inputs.totalEmployees - disengagedEmployees}</div>
          <div className="text-sm text-gray-600">Engaged Employees</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Annual Productivity Loss</h4>
            <div className="text-3xl font-bold">£{result.toLocaleString()}</div>
            <p className="text-green-100 mt-2">
              Formula: {disengagedEmployees} disengaged × £{inputs.avgSalary.toLocaleString()} × {inputs.productivityLoss}%
            </p>
          </div>
          <Calculator className="w-12 h-12 text-green-200" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-2">Key Insights</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Disengaged employees are less productive and creative</li>
          <li>• Higher absenteeism and quality issues</li>
          <li>• Negative impact on team morale and culture</li>
          <li>• Based on extensive Gallup workplace research</li>
        </ul>
      </div>
    </div>
  );
};

export default EngagementCalculator;