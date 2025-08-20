import React, { useState } from 'react';
import { X, Play, ArrowRight, ArrowLeft, CheckCircle, Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface DemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const Demo: React.FC<DemoProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Sample company data
  const sampleCompany = {
    name: "TechFlow Solutions",
    employees: 100,
    averageSalary: 45000,
    industry: "Technology Services"
  };

  const demoSteps = [
    {
      title: "Welcome to the Demo",
      subtitle: "Let's calculate ROI for TechFlow Solutions",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{sampleCompany.name}</h3>
                <p className="text-gray-600">{sampleCompany.industry}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Employees:</span>
                <span className="font-semibold ml-2">{sampleCompany.employees}</span>
              </div>
              <div>
                <span className="text-gray-500">Avg Salary:</span>
                <span className="font-semibold ml-2">£{sampleCompany.averageSalary.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700">
            We'll walk through how poor communication is costing this company money and 
            demonstrate the potential ROI of improving their people strategy.
          </p>
        </div>
      )
    },
    {
      title: "Step 1: Communication Issues",
      subtitle: "Identifying the problem",
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-bold text-red-800">Current Situation</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Time lost per employee per week:</span>
                <span className="font-semibold">5 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Percentage due to poor communication:</span>
                <span className="font-semibold">60%</span>
              </div>
              <div className="flex justify-between">
                <span>Employees affected:</span>
                <span className="font-semibold">80 (80%)</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Common Signs:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Unclear project requirements leading to rework</li>
              <li>• Multiple meetings to clarify simple tasks</li>
              <li>• Email chains that could be resolved in minutes</li>
              <li>• Delayed decision-making processes</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Calculate the Cost",
      subtitle: "Converting problems into financial impact",
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-800 mb-4">Cost Calculation</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Hourly cost per employee:</span>
                <span className="font-semibold">£21.63</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly loss per affected employee:</span>
                <span className="font-semibold">£64.89</span>
              </div>
              <div className="flex justify-between">
                <span>Total affected employees:</span>
                <span className="font-semibold">80</span>
              </div>
              <hr className="border-yellow-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Weekly company loss:</span>
                <span className="text-red-600">£5,191</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Annual company loss:</span>
                <span className="text-red-600">£269,932</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            This calculation shows the direct salary cost impact. Additional costs like 
            project delays, customer dissatisfaction, and employee stress aren't included.
          </p>
        </div>
      )
    },
    {
      title: "Step 3: The Solution Impact",
      subtitle: "ROI of improved communication",
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-green-800">After Implementation</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Communication improvement:</span>
                <span className="font-semibold">70% reduction in issues</span>
              </div>
              <div className="flex justify-between">
                <span>Time saved per employee per week:</span>
                <span className="font-semibold">3.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Annual savings:</span>
                <span className="font-semibold text-green-600">£188,952</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-blue-800">Investment Required:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Communication training: £15,000</li>
              <li>• Process improvements: £10,000</li>
              <li>• Technology tools: £5,000</li>
              <li>• <strong>Total investment: £30,000</strong></li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: ROI Results",
      subtitle: "The business case for action",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">ROI Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">530%</div>
                  <div className="text-sm opacity-90">Return on Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1.4 months</div>
                  <div className="text-sm opacity-90">Payback Period</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-3">Additional Benefits:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Improved employee satisfaction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Faster project delivery</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Better customer outcomes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Reduced employee turnover</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Calculate Your ROI?",
      subtitle: "Start with your own company data",
      content: (
        <div className="space-y-6 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              This demo showed just one calculator
            </h3>
            <p className="text-gray-700 mb-4">
              Our suite includes 6 different calculators covering communication, engagement, 
              turnover, absence, service loss, and profit per employee.
            </p>
            <p className="text-sm text-gray-600">
              Each calculator provides detailed insights to help you build compelling 
              business cases for HR investments.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onClose}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-semibold"
            >
              Start Calculating Now
            </button>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Interactive Demo</h2>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {demoSteps.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {demoSteps[currentStep].title}
            </h3>
            <p className="text-gray-600">{demoSteps[currentStep].subtitle}</p>
          </div>
          
          {demoSteps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === demoSteps.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === demoSteps.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50 font-medium'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;