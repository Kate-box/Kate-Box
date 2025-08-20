import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, TrendingUp, PoundSterling, Target, AlertTriangle } from 'lucide-react';
import { useCalculatorContext } from '../context/CalculatorContext';

const ROICalculator = () => {
  const { calculatorData, sharedInputs } = useCalculatorContext();
  const [calculatorType, setCalculatorType] = useState('communication');
  // Function to get data from Interactive Calculators or use defaults
  const getSharedData = useCallback(() => {
    return {
      // Shared employee and salary data
      employees: sharedInputs.totalEmployees,
      avgSalary: sharedInputs.avgSalary,
      
      // Communication data from Interactive Calculator
      communicationLossPercentage: calculatorData.communication?.inputs?.lossPercentage || 12,
      
      // Engagement data from Interactive Calculator  
      engagementRate: calculatorData.engagement?.inputs?.engagementRate || 33,
      productivityLoss: calculatorData.engagement?.inputs?.productivityLoss || 25,
      
      // Turnover data from Interactive Calculator
      annualDepartures: calculatorData.turnover?.inputs?.leavers || 10,
      replacementCostPercentage: calculatorData.turnover?.inputs?.replacementCostPercentage || 100,
      
      // Absence data from Interactive Calculator  
      avgAbsenceDays: calculatorData.absence?.inputs?.avgAbsenceDays || 6,
      
      // Service data from Interactive Calculator
      lostCustomersPerDay: calculatorData.service?.inputs?.lostCustomersPerDay || 10,
      avgRevenuePerCustomer: calculatorData.service?.inputs?.avgRevenuePerCustomer || 50,
      qualityFailureRate: calculatorData.service?.inputs?.qualityFailureRate || 5,
      reworkCostPerIncident: calculatorData.service?.inputs?.reworkCostPerIncident || 150,
      locations: calculatorData.service?.inputs?.locations || 1
    };
  }, [calculatorData, sharedInputs]);

  const sharedData = getSharedData();

  const [inputs, setInputs] = useState({
    // Communication Training - using shared data
    employees: sharedData.employees,
    avgSalary: sharedData.avgSalary,
    productivityLoss: sharedData.communicationLossPercentage,
    trainingCost: 30000,
    improvementTarget: 25,
    
    // Engagement Program - using shared data
    engagementRate: sharedData.engagementRate,
    targetEngagementRate: 60,
    programCost: 75000,
    
    // Retention Program - using shared data
    annualDepartures: sharedData.annualDepartures,
    replacementCost: sharedData.avgSalary * (sharedData.replacementCostPercentage / 100),
    retentionProgramCost: 100000,
    targetReduction: 5,
    
    // Quality & Service Program - using shared data
    lostCustomersPerDay: sharedData.lostCustomersPerDay,
    avgRevenuePerCustomer: sharedData.avgRevenuePerCustomer,
    qualityFailureRate: sharedData.qualityFailureRate,
    reworkCostPerIncident: sharedData.reworkCostPerIncident,
    locations: sharedData.locations,
    workingDaysPerYear: 365,
    qualityProgramCost: 50000,
    targetReduction: 35
  });

  // Update inputs when shared data changes
  useEffect(() => {
    const currentSharedData = getSharedData();
    setInputs(prev => ({
      ...prev,
      // Update shared fields
      employees: currentSharedData.employees,
      avgSalary: currentSharedData.avgSalary,
      productivityLoss: currentSharedData.communicationLossPercentage,
      engagementRate: currentSharedData.engagementRate,
      annualDepartures: currentSharedData.annualDepartures,
      replacementCost: currentSharedData.avgSalary * (currentSharedData.replacementCostPercentage / 100),
      lostCustomersPerDay: currentSharedData.lostCustomersPerDay,
      avgRevenuePerCustomer: currentSharedData.avgRevenuePerCustomer,
      qualityFailureRate: currentSharedData.qualityFailureRate,
      reworkCostPerIncident: currentSharedData.reworkCostPerIncident,
      locations: currentSharedData.locations
    }));
  }, [getSharedData]);

  const calculatorTypes = [
    {
      id: 'communication',
      name: 'Communication Training',
      description: 'Calculate ROI for communication improvement programs',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 'engagement',
      name: 'Engagement Program',
      description: 'Measure returns from employee engagement initiatives',
      icon: Target,
      color: 'green'
    },
    {
      id: 'retention',
      name: 'Retention Initiative',
      description: 'Calculate savings from turnover reduction programs',
      icon: PoundSterling,
      color: 'purple'
    },
    {
      id: 'quality',
      name: 'Quality & Service Initiative',
      description: 'Calculate ROI for quality improvement and service excellence programs',
      icon: AlertTriangle,
      color: 'pink'
    }
  ];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateCommunicationROI = () => {
    const annualLoss = inputs.employees * inputs.avgSalary * (inputs.productivityLoss / 100);
    const employeeTimeCost = inputs.employees * 8 * (inputs.avgSalary / 1920); // 8 hours training
    const totalInvestment = inputs.trainingCost + employeeTimeCost;
    const annualSavings = annualLoss * (inputs.improvementTarget / 100);
    const roi = ((annualSavings - totalInvestment) / totalInvestment) * 100;
    const paybackPeriod = (totalInvestment / annualSavings) * 12;

    return {
      annualLoss,
      totalInvestment,
      annualSavings,
      roi,
      paybackPeriod,
      employeeTimeCost
    };
  };

  const calculateEngagementROI = () => {
    const fullyEngaged = Math.round(inputs.employees * (inputs.engagementRate / 100));
    const partiallyEngaged = inputs.employees - fullyEngaged;
    const currentProductivityLoss = partiallyEngaged * inputs.avgSalary * 0.25; // 25% loss for disengaged
    
    const targetFullyEngaged = Math.round(inputs.employees * (inputs.targetEngagementRate / 100));
    const targetPartiallyEngaged = inputs.employees - targetFullyEngaged;
    const targetProductivityLoss = targetPartiallyEngaged * inputs.avgSalary * 0.25;
    
    const annualSavings = currentProductivityLoss - targetProductivityLoss;
    const roi = ((annualSavings - inputs.programCost) / inputs.programCost) * 100;
    const paybackPeriod = (inputs.programCost / annualSavings) * 12;

    return {
      currentProductivityLoss,
      targetProductivityLoss,
      annualSavings,
      roi,
      paybackPeriod,
      fullyEngaged,
      targetFullyEngaged
    };
  };

  const calculateRetentionROI = () => {
    const annualTurnoverCost = inputs.annualDepartures * inputs.replacementCost;
    const annualSavings = inputs.targetReduction * inputs.replacementCost;
    const totalInvestment = inputs.retentionProgramCost;
    const roi = ((annualSavings - totalInvestment) / totalInvestment) * 100;
    const paybackPeriod = (totalInvestment / annualSavings) * 12;

    return {
      annualTurnoverCost,
      annualSavings,
      totalInvestment,
      roi,
      paybackPeriod
    };
  };

  const calculateQualityROI = () => {
    // Revenue loss from lost customers
    const dailyRevenueLoss = inputs.lostCustomersPerDay * inputs.locations * inputs.avgRevenuePerCustomer;
    const annualRevenueLoss = dailyRevenueLoss * inputs.workingDaysPerYear;
    
    // Quality failure costs
    const dailyQualityLoss = inputs.qualityFailureRate * inputs.locations * inputs.reworkCostPerIncident;
    const annualQualityLoss = dailyQualityLoss * inputs.workingDaysPerYear;
    
    // Total current cost
    const totalAnnualLoss = annualRevenueLoss + annualQualityLoss;
    
    // Expected savings from improvement
    const annualSavings = totalAnnualLoss * (inputs.targetReduction / 100);
    const roi = ((annualSavings - inputs.qualityProgramCost) / inputs.qualityProgramCost) * 100;
    const paybackPeriod = (inputs.qualityProgramCost / annualSavings) * 12;

    return {
      totalAnnualLoss,
      annualRevenueLoss,
      annualQualityLoss,
      annualSavings,
      roi,
      paybackPeriod
    };
  };

  const getCurrentCalculation = () => {
    switch (calculatorType) {
      case 'communication':
        return calculateCommunicationROI();
      case 'engagement':
        return calculateEngagementROI();
      case 'retention':
        return calculateRetentionROI();
      case 'quality':
        return calculateQualityROI();
      default:
        return {};
    }
  };

  const renderCommunicationInputs = () => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
        <input
          type="number"
          value={inputs.employees}
          onChange={(e) => handleInputChange('employees', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Average Salary (£)</label>
        <input
          type="number"
          value={inputs.avgSalary}
          onChange={(e) => handleInputChange('avgSalary', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Productivity Loss (%)</label>
        <select
          value={inputs.productivityLoss}
          onChange={(e) => handleInputChange('productivityLoss', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10% (Mild communication issues)</option>
          <option value={14}>14% (Industry average)</option>
          <option value={18}>18% (Significant problems)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Training Investment (£)</label>
        <input
          type="number"
          value={inputs.trainingCost}
          onChange={(e) => handleInputChange('trainingCost', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Improvement (%)</label>
        <select
          value={inputs.improvementTarget}
          onChange={(e) => handleInputChange('improvementTarget', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value={20}>20% (Conservative)</option>
          <option value={25}>25% (Realistic)</option>
          <option value={30}>30% (Optimistic)</option>
        </select>
      </div>
    </div>
  );

  const renderEngagementInputs = () => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
        <input
          type="number"
          value={inputs.employees}
          onChange={(e) => handleInputChange('employees', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Average Salary (£)</label>
        <input
          type="number"
          value={inputs.avgSalary}
          onChange={(e) => handleInputChange('avgSalary', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Engagement Rate (%)</label>
        <select
          value={inputs.engagementRate}
          onChange={(e) => handleInputChange('engagementRate', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value={15}>15% (Poor)</option>
          <option value={20}>20% (Below Average)</option>
          <option value={33}>33% (Global Average - Gallup)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Engagement Rate (%)</label>
        <select
          value={inputs.targetEngagementRate}
          onChange={(e) => handleInputChange('targetEngagementRate', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value={40}>40% (Improvement)</option>
          <option value={50}>50% (Good)</option>
          <option value={60}>60% (Excellent)</option>
          <option value={70}>70% (World Class)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Program Investment (£)</label>
        <input
          type="number"
          value={inputs.programCost}
          onChange={(e) => handleInputChange('programCost', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );

  const renderRetentionInputs = () => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Departures</label>
        <input
          type="number"
          value={inputs.annualDepartures}
          onChange={(e) => handleInputChange('annualDepartures', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Replacement Cost per Person (£)</label>
        <input
          type="number"
          value={inputs.replacementCost}
          onChange={(e) => handleInputChange('replacementCost', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Retention Program Cost (£)</label>
        <input
          type="number"
          value={inputs.retentionProgramCost}
          onChange={(e) => handleInputChange('retentionProgramCost', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Reduction (Departures Prevented)</label>
        <input
          type="number"
          value={inputs.targetReduction}
          onChange={(e) => handleInputChange('targetReduction', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );

  const renderQualityInputs = () => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lost Customers per Day</label>
        <input
          type="number"
          value={inputs.lostCustomersPerDay}
          onChange={(e) => handleInputChange('lostCustomersPerDay', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Average Revenue per Customer (£)</label>
        <input
          type="number"
          value={inputs.avgRevenuePerCustomer}
          onChange={(e) => handleInputChange('avgRevenuePerCustomer', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quality Failures per Day per Location</label>
        <input
          type="number"
          value={inputs.qualityFailureRate}
          onChange={(e) => handleInputChange('qualityFailureRate', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Quality Incident (£)</label>
        <input
          type="number"
          value={inputs.reworkCostPerIncident}
          onChange={(e) => handleInputChange('reworkCostPerIncident', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Locations</label>
        <input
          type="number"
          value={inputs.locations}
          onChange={(e) => handleInputChange('locations', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Operating Days per Year</label>
        <select
          value={inputs.workingDaysPerYear}
          onChange={(e) => handleInputChange('workingDaysPerYear', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value={365}>365 (Daily)</option>
          <option value={310}>310 (6 days a week)</option>
          <option value={260}>260 (5 days a week)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Quality Program Investment (£)</label>
        <input
          type="number"
          value={inputs.qualityProgramCost}
          onChange={(e) => handleInputChange('qualityProgramCost', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Cost Reduction (%)</label>
        <select
          value={inputs.targetReduction}
          onChange={(e) => handleInputChange('targetReduction', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value={25}>25% (Conservative)</option>
          <option value={35}>35% (Realistic)</option>
          <option value={45}>45% (Optimistic)</option>
        </select>
      </div>
    </div>
  );

  const calculation = getCurrentCalculation();
  const activeCalculator = calculatorTypes.find(calc => calc.id === calculatorType);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-8">
        <Calculator className="w-8 h-8 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-900">ROI Calculator Templates</h3>
      </div>

      {/* Calculator Type Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {calculatorTypes.map((calc) => {
          const IconComponent = calc.icon;
          return (
            <button
              key={calc.id}
              onClick={() => setCalculatorType(calc.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                calculatorType === calc.id
                  ? `border-${calc.color}-500 bg-${calc.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className={`w-6 h-6 text-${calc.color}-600 mb-2`} />
              <div className="font-semibold text-gray-900">{calc.name}</div>
              <div className="text-sm text-gray-600">{calc.description}</div>
            </button>
          );
        })}
      </div>

      {/* Calculator Inputs */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {activeCalculator?.name} Inputs
        </h4>
        {calculatorType === 'communication' && renderCommunicationInputs()}
        {calculatorType === 'engagement' && renderEngagementInputs()}
        {calculatorType === 'retention' && renderRetentionInputs()}
        {calculatorType === 'quality' && renderQualityInputs()}
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`bg-gradient-to-r from-${activeCalculator?.color}-500 to-${activeCalculator?.color}-600 rounded-lg p-4 text-white`}>
          <div className="text-sm opacity-90">Annual Savings</div>
          <div className="text-2xl font-bold">
            £{(calculation.annualSavings || 0).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-sm text-gray-600">Investment</div>
          <div className="text-2xl font-bold text-gray-900">
            £{(calculation.totalInvestment || inputs.programCost || inputs.retentionProgramCost || inputs.qualityProgramCost || 0).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-green-100 rounded-lg p-4">
          <div className="text-sm text-green-600">ROI</div>
          <div className="text-2xl font-bold text-green-900">
            {(calculation.roi || 0).toFixed(0)}%
          </div>
        </div>
        
        <div className="bg-blue-100 rounded-lg p-4">
          <div className="text-sm text-blue-600">Payback Period</div>
          <div className="text-2xl font-bold text-blue-900">
            {(calculation.paybackPeriod || 0).toFixed(1)} months
          </div>
        </div>
      </div>

      {/* Business Case Summary and Root Causes */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Business Case Summary</h4>
          <div className="text-sm text-gray-700 space-y-2">
            {calculatorType === 'communication' && (
              <>
                <p>Current productivity loss from communication inefficiency: £{(calculation.annualLoss || 0).toLocaleString()} annually</p>
                <p>Proposed {inputs.improvementTarget}% improvement through targeted communication training</p>
                <p>Total investment including employee time: £{(calculation.totalInvestment || 0).toLocaleString()}</p>
                <p><strong>Expected return: £{(calculation.annualSavings || 0).toLocaleString()} annually ({(calculation.roi || 0).toFixed(0)}% ROI)</strong></p>
              </>
            )}
            {calculatorType === 'engagement' && (
              <>
                <p>Current engagement: {inputs.engagementRate}% ({calculation.fullyEngaged} fully engaged employees)</p>
                <p>Target engagement: {inputs.targetEngagementRate}% ({calculation.targetFullyEngaged} fully engaged employees)</p>
                <p>Productivity recovery potential: £{(calculation.annualSavings || 0).toLocaleString()} annually</p>
                <p><strong>Program investment: £{inputs.programCost.toLocaleString()} delivers {(calculation.roi || 0).toFixed(0)}% ROI</strong></p>
              </>
            )}
            {calculatorType === 'retention' && (
              <>
                <p>Current turnover cost: £{(calculation.annualTurnoverCost || 0).toLocaleString()} annually ({inputs.annualDepartures} departures)</p>
                <p>Target: Prevent {inputs.targetReduction} departures annually</p>
                <p>Program investment: £{inputs.retentionProgramCost.toLocaleString()}</p>
                <p><strong>Annual savings: £{(calculation.annualSavings || 0).toLocaleString()} ({(calculation.roi || 0).toFixed(0)}% ROI)</strong></p>
              </>
            )}
            {calculatorType === 'quality' && (
              <>
                <p>Current quality and service costs: £{(calculation.totalAnnualLoss || 0).toLocaleString()} annually</p>
                <p>Revenue loss from customer issues: £{(calculation.annualRevenueLoss || 0).toLocaleString()}</p>
                <p>Quality failure costs (rework, complaints): £{(calculation.annualQualityLoss || 0).toLocaleString()}</p>
                <p>Target: {inputs.targetReduction}% reduction through quality and service improvement program</p>
                <p><strong>Program investment: £{inputs.qualityProgramCost.toLocaleString()} delivers £{(calculation.annualSavings || 0).toLocaleString()} annually ({(calculation.roi || 0).toFixed(0)}% ROI)</strong></p>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Root Causes Analysis</h4>
          <div className="text-sm text-gray-700">
            {calculatorType === 'communication' && (
              <ul className="space-y-1">
                <li>• <strong>Leadership gaps:</strong> Poor management communication skills</li>
                <li>• <strong>Information silos:</strong> Departments not sharing critical information</li>
                <li>• <strong>Unclear processes:</strong> Ambiguous procedures and expectations</li>
                <li>• <strong>Technology barriers:</strong> Inadequate communication tools and systems</li>
                <li>• <strong>Cultural issues:</strong> Lack of open communication culture</li>
                <li>• <strong>Meeting inefficiency:</strong> Too many unproductive meetings</li>
                <li>• <strong>Feedback deficits:</strong> Limited two-way communication channels</li>
              </ul>
            )}
            {calculatorType === 'engagement' && (
              <ul className="space-y-1">
                <li>• <strong>Recognition gaps:</strong> Insufficient appreciation and rewards</li>
                <li>• <strong>Career stagnation:</strong> Limited growth and development opportunities</li>
                <li>• <strong>Poor management:</strong> Inadequate leadership and support from supervisors</li>
                <li>• <strong>Work-life imbalance:</strong> Excessive workload and stress</li>
                <li>• <strong>Misaligned values:</strong> Company culture doesn't match employee expectations</li>
                <li>• <strong>Lack of autonomy:</strong> Micromanagement and limited decision-making power</li>
                <li>• <strong>Unclear purpose:</strong> Employees don't understand their impact or meaning</li>
              </ul>
            )}
            {calculatorType === 'retention' && (
              <ul className="space-y-1">
                <li>• <strong>Compensation issues:</strong> Below-market salaries and benefits</li>
                <li>• <strong>Limited progression:</strong> No clear career advancement pathways</li>
                <li>• <strong>Poor onboarding:</strong> Inadequate new employee integration</li>
                <li>• <strong>Manager relationships:</strong> Conflict or poor relationship with direct supervisor</li>
                <li>• <strong>Skills mismatch:</strong> Job requirements don't match capabilities</li>
                <li>• <strong>Workplace culture:</strong> Toxic environment or poor team dynamics</li>
                <li>• <strong>External opportunities:</strong> Better offers from competitors</li>
              </ul>
            )}
            {calculatorType === 'quality' && (
              <ul className="space-y-1">
                <li>• <strong>Training deficits:</strong> Inadequate skills development and quality training</li>
                <li>• <strong>Process failures:</strong> Unclear or outdated quality procedures</li>
                <li>• <strong>Resource constraints:</strong> Insufficient time, tools, or materials</li>
                <li>• <strong>Communication breakdown:</strong> Poor information flow about quality standards</li>
                <li>• <strong>Accountability gaps:</strong> No clear ownership of quality outcomes</li>
                <li>• <strong>System limitations:</strong> Inadequate quality monitoring and feedback systems</li>
                <li>• <strong>Cultural issues:</strong> Lack of quality-first mindset and customer focus</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;