import React, { useState, useEffect } from 'react';
import { MessageSquare, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const CommunicationCalculator = ({ onResultUpdate }) => {
  const { sharedInputs, updateSharedInputs, updateCalculatorData } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    employees: sharedInputs.totalEmployees,
    avgSalary: sharedInputs.avgSalary,
    lossPercentage: 12
  });

  const [result, setResult] = useState(0);

  // Sync with shared inputs when they change from other calculators
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      employees: sharedInputs.totalEmployees,
      avgSalary: sharedInputs.avgSalary
    }));
  }, [sharedInputs]);

  useEffect(() => {
    const calculatedResult = inputs.employees * inputs.avgSalary * (inputs.lossPercentage / 100);
    setResult(calculatedResult);
    
    // Update shared context for dashboard
    updateCalculatorData('communication', {
      id: 'communication',
      result: calculatedResult,
      inputs: inputs,
      type: 'communication',
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
    if (field === 'employees') {
      updateSharedInputs({ totalEmployees: numValue });
    } else if (field === 'avgSalary') {
      updateSharedInputs({ avgSalary: numValue });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-900">How it works</span>
        </div>
        <p className="text-blue-800 text-sm">
          Uses Gallup/Holmes Report benchmarks showing 10-18% of salary costs are lost due to poor communication.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees
          </label>
          <input
            type="number"
            value={inputs.employees}
            onChange={(e) => handleInputChange('employees', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="40000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loss Percentage (%)
          </label>
          <select
            value={inputs.lossPercentage}
            onChange={(e) => handleInputChange('lossPercentage', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={10}>10% (Conservative)</option>
            <option value={12}>12% (Average)</option>
            <option value={15}>15% (High)</option>
            <option value={18}>18% (Critical)</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Annual Communication Loss</h4>
            <div className="text-3xl font-bold">£{result.toLocaleString()}</div>
            <p className="text-blue-100 mt-2">
              Formula: {inputs.employees} employees × £{inputs.avgSalary.toLocaleString()} × {inputs.lossPercentage}%
            </p>
          </div>
          <Calculator className="w-12 h-12 text-blue-200" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-2">Key Insights</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Poor communication leads to misunderstandings and rework</li>
          <li>• Includes time wasted in unclear meetings and emails</li>
          <li>• Accounts for project delays and quality issues</li>
          <li>• Based on extensive research by Gallup and Holmes Report</li>
        </ul>
      </div>
    </div>
  );
};

export default CommunicationCalculator;