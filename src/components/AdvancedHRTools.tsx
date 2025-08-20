import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ROICalculator from './ROICalculator';

const AdvancedHRTools = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center space-x-3 mx-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span className="text-lg font-semibold">Advanced HR Strategy Tools</span>
            {isExpanded ? 
              <ChevronUp className="w-5 h-5" /> : 
              <ChevronDown className="w-5 h-5" />
            }
          </button>
          <p className="text-gray-600 mt-2">
            Professional ROI calculators and business case builders for strategic HR initiatives
          </p>
        </div>

        {isExpanded && (
          <div className="animate-fadeIn">
            <ROICalculator />
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why These Tools Matter</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">650%</div>
                  <div className="text-sm text-gray-700">Average ROI from communication training programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">433%</div>
                  <div className="text-sm text-gray-700">Typical returns from engagement improvement initiatives</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">200%</div>
                  <div className="text-sm text-gray-700">ROI from comprehensive retention programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">235%</div>
                  <div className="text-sm text-gray-700">Quality improvement program returns</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvancedHRTools;