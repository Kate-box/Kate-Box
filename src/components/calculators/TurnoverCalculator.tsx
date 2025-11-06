import React, { useState, useEffect } from 'react';
import { UserX, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const TurnoverCalculator = ({ onResultUpdate }) => {
  const { updateCalculatorData, sharedInputs, updateSharedInputs } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    leavers: 10,
    avgSalary: sharedInputs.avgSalary,
    replacementCostPercentage: 100,
    employees: sharedInputs.totalEmployees
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
    const calculatedResult = inputs.leavers * inputs.avgSalary * (inputs.replacementCostPercentage / 100);
    setResult(calculatedResult);
    
    updateCalculatorData('turnover', {
      id: 'turnover',
      result: calculatedResult,
      inputs,
      type: 'turnover',
      timestamp: new Date()
    });
  }, [inputs.leavers, inputs.avgSalary, inputs.replacementCostPercentage]);

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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <UserX className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-900">How it works</span>
        </div>
        <p className="text-red-800 text-sm">
          Industry standard shows replacing a staff member costs 50-200% of their annual salary.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Employees
          </label>
          <input
            type="number"
            value={inputs.employees}
            onChange={(e) => handleInputChange('employees', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Leavers (Annual)
          </label>
          <input
            type="number"
            value={inputs.leavers}
            onChange={(e) => handleInputChange('leavers', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="10"
          />
          <div className="text-xs text-gray-500 mt-1">
            {((inputs.leavers / inputs.employees) * 100).toFixed(1)}% turnover rate
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Salary (£)
          </label>
          <input
            type="number"
            value={inputs.avgSalary}
            onChange={(e) => handleInputChange('avgSalary', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="40000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Replacement Cost (%)
          </label>
          <select
            value={inputs.replacementCostPercentage}
            onChange={(e) => handleInputChange('replacementCostPercentage', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value={50}>50% (Entry Level)</option>
            <option value={75}>75% (Mid Level)</option>
            <option value={100}>100% (Standard)</option>
            <option value={150}>150% (Senior Level)</option>
            <option value={200}>200% (Executive Level)</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Annual Turnover Cost</h4>
            <div className="text-3xl font-bold">£{result.toLocaleString()}</div>
            <p className="text-red-100 mt-2">
              Formula: {inputs.leavers} leavers × £{inputs.avgSalary.toLocaleString()} × {inputs.replacementCostPercentage}%
            </p>
          </div>
          <Calculator className="w-12 h-12 text-red-200" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Replacement Costs Include</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Recruitment and advertising</li>
            <li>• Interview time and expenses</li>
            <li>• Training and onboarding</li>
            <li>• Lost productivity during transition</li>
          </ul>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Hidden Costs</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Knowledge loss</li>
            <li>• Team disruption</li>
            <li>• Customer relationship impact</li>
            <li>• Overtime for remaining staff</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TurnoverCalculator;