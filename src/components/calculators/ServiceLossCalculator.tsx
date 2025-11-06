import React, { useState, useEffect } from 'react';
import { AlertTriangle, Calculator } from 'lucide-react';
import { useCalculatorContext } from '../../context/CalculatorContext';

const ServiceLossCalculator = ({ onResultUpdate }) => {
  const { updateCalculatorData } = useCalculatorContext();
  const [inputs, setInputs] = useState({
    lostCustomersPerDay: 10,
    locations: 1,
    avgRevenuePerCustomer: 50,
    workingDaysPerYear: 365,
    qualityFailureRate: 5,
    reworkCostPerIncident: 150,
    customerRetentionRate: 85,
    avgCustomerLifetimeValue: 1200
  });

  const [result, setResult] = useState(0);
  const [dailyLoss, setDailyLoss] = useState(0);
  const [qualityLoss, setQualityLoss] = useState(0);
  const [retentionLoss, setRetentionLoss] = useState(0);

  useEffect(() => {
    // Revenue loss from lost customers
    const dailyRevenueLoss = inputs.lostCustomersPerDay * inputs.locations * inputs.avgRevenuePerCustomer;
    
    // Quality failure costs (rework, defects, complaints)
    const dailyQualityLoss = (inputs.qualityFailureRate * inputs.locations * inputs.reworkCostPerIncident);
    const annualQualityLoss = dailyQualityLoss * inputs.workingDaysPerYear;
    
    // Customer retention impact (lifetime value loss)
    const retentionGap = Math.max(0, 95 - inputs.customerRetentionRate); // Gap from 95% benchmark
    const annualRetentionLoss = (retentionGap / 100) * inputs.avgCustomerLifetimeValue * inputs.lostCustomersPerDay * inputs.workingDaysPerYear;
    
    const totalAnnualLoss = (dailyRevenueLoss * inputs.workingDaysPerYear) + annualQualityLoss + annualRetentionLoss;
    
    setDailyLoss(dailyRevenueLoss);
    setQualityLoss(annualQualityLoss);
    setRetentionLoss(annualRetentionLoss);
    setResult(totalAnnualLoss);
    
    updateCalculatorData('service', {
      id: 'service',
      result: totalAnnualLoss,
      inputs: { ...inputs, totalEmployees: inputs.locations * 10 }, // Estimate employees
      type: 'service',
      timestamp: new Date()
    });
  }, [inputs.lostCustomersPerDay, inputs.locations, inputs.avgRevenuePerCustomer, inputs.qualityFailureRate, inputs.reworkCostPerIncident, inputs.workingDaysPerYear, inputs.customerRetentionRate, inputs.avgCustomerLifetimeValue]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-pink-600" />
          <span className="font-semibold text-pink-900">How it works</span>
        </div>
        <p className="text-pink-800 text-sm">
          Calculates the total cost of quality failures, service issues, and customer loss - including immediate revenue impact, rework costs, and long-term retention damage.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Loss Section */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Impact</h4>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lost Customers per Day
          </label>
          <input
            type="number"
            value={inputs.lostCustomersPerDay}
            onChange={(e) => handleInputChange('lostCustomersPerDay', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Revenue per Customer (£)
          </label>
          <input
            type="number"
            value={inputs.avgRevenuePerCustomer}
            onChange={(e) => handleInputChange('avgRevenuePerCustomer', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Retention Rate (%)
          </label>
          <select
            value={inputs.customerRetentionRate}
            onChange={(e) => handleInputChange('customerRetentionRate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value={70}>70% (Poor service)</option>
            <option value={80}>80% (Below average)</option>
            <option value={85}>85% (Average)</option>
            <option value={90}>90% (Good)</option>
            <option value={95}>95% (Excellent)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Customer Lifetime Value (£)
          </label>
          <input
            type="number"
            value={inputs.avgCustomerLifetimeValue}
            onChange={(e) => handleInputChange('avgCustomerLifetimeValue', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="1200"
          />
        </div>

        {/* Quality Issues Section */}
        <div className="md:col-span-2 mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quality & Service Issues</h4>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality Failures per Day per Location
          </label>
          <input
            type="number"
            value={inputs.qualityFailureRate}
            onChange={(e) => handleInputChange('qualityFailureRate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="5"
          />
          <div className="text-xs text-gray-500 mt-1">
            Include defects, complaints, rework incidents
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cost per Quality Incident (£)
          </label>
          <input
            type="number"
            value={inputs.reworkCostPerIncident}
            onChange={(e) => handleInputChange('reworkCostPerIncident', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="150"
          />
          <div className="text-xs text-gray-500 mt-1">
            Staff time, materials, management effort
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Locations/Stores
          </label>
          <input
            type="number"
            value={inputs.locations}
            onChange={(e) => handleInputChange('locations', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operating Days per Year
          </label>
          <select
            value={inputs.workingDaysPerYear}
            onChange={(e) => handleInputChange('workingDaysPerYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value={365}>365 (Daily)</option>
            <option value={310}>310 (6 days a week)</option>
            <option value={260}>260 (5 days a week)</option>
          </select>
        </div>
      </div>

      {/* Detailed Cost Breakdown */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-sm font-medium text-gray-600">Daily Revenue Loss</div>
          <div className="text-xl font-bold text-pink-600">£{dailyLoss.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Lost customers</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-sm font-medium text-gray-600">Annual Quality Cost</div>
          <div className="text-xl font-bold text-red-600">£{qualityLoss.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Rework & failures</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-sm font-medium text-gray-600">Retention Impact</div>
          <div className="text-xl font-bold text-purple-600">£{retentionLoss.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Lifetime value loss</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Total Annual Quality & Service Cost</h4>
            <div className="text-3xl font-bold">£{result.toLocaleString()}</div>
            <p className="text-pink-100 mt-2 text-sm">
              Revenue Loss (£{(dailyLoss * inputs.workingDaysPerYear).toLocaleString()}) + 
              Quality Issues (£{qualityLoss.toLocaleString()}) + 
              Retention Impact (£{retentionLoss.toLocaleString()})
            </p>
          </div>
          <Calculator className="w-12 h-12 text-pink-200" />
        </div>
      </div>

    </div>
  );
};

export default ServiceLossCalculator;