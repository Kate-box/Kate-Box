import React, { useState, useEffect } from 'react';
import { Calendar, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const AbsenceCalculator = ({ onResultUpdate }) => {
  const { sharedInputs, updateSharedInputs, updateCalculatorData } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    totalDaysLostLast12Months: 500,
    avgDailySalaryRate: 150
  });

  const [result, setResult] = useState(0);

  useEffect(() => {
    const calculatedResult = inputs.totalDaysLostLast12Months * inputs.avgDailySalaryRate;
    
    setResult(calculatedResult);
    
    updateCalculatorData('absence', {
      id: 'absence',
      result: calculatedResult,
      inputs: inputs,
      type: 'absence',
      timestamp: new Date()
    });
  }, [inputs.totalDaysLostLast12Months, inputs.avgDailySalaryRate]);

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-900">How it works</span>
        </div>
        <p className="text-purple-800 text-sm">
          Calculate the total cost of absence using your actual absence data from the last 12 months.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Days Lost to Absence (Last 12 Months)
          </label>
          <input
            type="number"
            value={inputs.totalDaysLostLast12Months}
            onChange={(e) => handleInputChange('totalDaysLostLast12Months', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="500"
          />
          <div className="text-xs text-gray-500 mt-1">
            Check your HR records for sick days, personal days, etc.
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Daily Salary Rate (£)
          </label>
          <input
            type="number"
            value={inputs.avgDailySalaryRate}
            onChange={(e) => handleInputChange('avgDailySalaryRate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="150"
          />
          <div className="text-xs text-gray-500 mt-1">
            Total payroll ÷ total working days across all employees
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Total Absence Cost (Last 12 Months)</h4>
            <div className="text-3xl font-bold">£{result.toLocaleString()}</div>
            <p className="text-purple-100 mt-2">
              Formula: {inputs.totalDaysLostLast12Months.toLocaleString()} days × £{inputs.avgDailySalaryRate} daily rate = £{result.toLocaleString()}
            </p>
          </div>
          <Calculator className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">What's Included in This Cost</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Salary payments during absence</li>
            <li>• Lost productivity from absent employees</li>
            <li>• Includes all types of unplanned absence</li>
            <li>• Accounts for mixed workforce (FT/PT)</li>
          </ul>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Additional Hidden Costs</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Temporary cover and overtime costs</li>
            <li>• Management time dealing with absences</li>
            <li>• Project delays and quality issues</li>
            <li>• Team morale and stress impact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AbsenceCalculator;