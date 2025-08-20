import React, { useState, useEffect } from 'react';
import { Calendar, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const AbsenceCalculator = ({ onResultUpdate }) => {
  const { sharedInputs, updateSharedInputs, updateCalculatorData } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    totalStaff: sharedInputs.totalEmployees,
    avgSalary: sharedInputs.avgSalary,
    avgAbsenceDays: 6,
    workingDaysPerYear: 260
  });

  const [result, setResult] = useState(0);
  const [dailyRate, setDailyRate] = useState(0);

  // Sync with shared inputs when they change from other calculators
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      totalStaff: sharedInputs.totalEmployees,
      avgSalary: sharedInputs.avgSalary
    }));
  }, [sharedInputs]);

  useEffect(() => {
    const dailySalary = inputs.avgSalary / inputs.workingDaysPerYear;
    const calculatedResult = dailySalary * inputs.avgAbsenceDays * inputs.totalStaff;
    
    setDailyRate(dailySalary);
    setResult(calculatedResult);
    
    // Update shared context for dashboard
    updateCalculatorData('absence', {
      id: 'absence',
      result: calculatedResult,
      inputs: inputs,
      type: 'absence',
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
    if (field === 'totalStaff') {
      updateSharedInputs({ totalEmployees: numValue });
    } else if (field === 'avgSalary') {
      updateSharedInputs({ avgSalary: numValue });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-900">How it works</span>
        </div>
        <p className="text-purple-800 text-sm">
          Converts sickness/absence into direct costs including salary, cover costs, and productivity impact.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Staff
          </label>
          <input
            type="number"
            value={inputs.totalStaff}
            onChange={(e) => handleInputChange('totalStaff', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="40000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Absence Days per Employee
          </label>
          <input
            type="number"
            step="0.1"
            value={inputs.avgAbsenceDays}
            onChange={(e) => handleInputChange('avgAbsenceDays', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Days per Year
          </label>
          <select
            value={inputs.workingDaysPerYear}
            onChange={(e) => handleInputChange('workingDaysPerYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={250}>250 days</option>
            <option value={260}>260 days</option>
            <option value={365}>365 days</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <div className="text-lg font-semibold text-gray-900">Daily Salary Rate</div>
        <div className="text-2xl font-bold text-purple-600">£{dailyRate.toFixed(2)}</div>
        <div className="text-sm text-gray-600">Per employee per day</div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Annual Absence Cost</h4>
            <div className="text-3xl font-bold">£{result.toLocaleString()}</div>
            <p className="text-purple-100 mt-2">
              Formula: (£{inputs.avgSalary.toLocaleString()} ÷ {inputs.workingDaysPerYear}) × {inputs.avgAbsenceDays} days × {inputs.totalStaff} staff
            </p>
          </div>
          <Calculator className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Direct Costs</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Salary payments during absence</li>
            <li>• Temporary cover costs</li>
            <li>• Overtime for other staff</li>
            <li>• Administrative overhead</li>
          </ul>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Indirect Costs</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Productivity disruption</li>
            <li>• Project delays</li>
            <li>• Quality issues from rushed work</li>
            <li>• Team morale impact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AbsenceCalculator;