import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Calculator, Copy, CheckCircle, Lightbulb } from 'lucide-react';

const BusinessTranslator = () => {
  const [hrInput, setHrInput] = useState('');
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Business terminology and transformations from the HR guide
  const transformationPatterns = {
    // Financial Impact Terms
    'employee satisfaction': 'productivity improvement with measurable ROI',
    'employee morale': 'engagement levels affecting business performance',
    'staff development': 'capability building with quantifiable returns',
    'training program': 'performance optimization initiative',
    'work-life balance': 'retention strategy reducing turnover costs',
    'team building': 'collaboration efficiency improvement',
    'communication training': 'productivity enhancement through information flow optimization',
    
    // Strategic replacements
    'our people': 'our workforce capability',
    'greatest asset': 'key performance driver',
    'right thing to do': 'strategically aligned investment',
    'improve culture': 'optimize organizational performance',
    'better workplace': 'enhanced productivity environment',
    'invest in people': 'develop human capital for competitive advantage',
    
    // Outcome focused language
    'help employees': 'enhance workforce effectiveness',
    'support staff': 'optimize team performance',
    'develop skills': 'build competitive capabilities',
    'improve relationships': 'strengthen stakeholder alignment'
  };

  const businessTerms = [
    {
      term: 'ROI (Return on Investment)',
      translation: 'For every £1 we invest, we get £X back',
      usage: 'This leadership development program delivers 280% ROI within 18 months'
    },
    {
      term: 'Cost Per Hire',
      translation: 'Total cost to fill each position',
      usage: 'Optimizing recruitment reduces cost per hire from £3,000 to £2,200, saving £80,000 annually'
    },
    {
      term: 'Productivity Loss',
      translation: 'Money lost through inefficient work',
      usage: 'Poor communication causes productivity losses of 10% - 18% of employee salaries annually'
    },
    {
      term: 'EBITDA Impact',
      translation: 'How HR decisions affect company profits before taxes',
      usage: 'This retention program protects £500,000 in EBITDA annually'
    },
    {
      term: 'Competitive Advantage',
      translation: 'What makes us better than competitors',
      usage: 'Our talent development creates sustainable competitive advantage in attracting top performers'
    }
  ];

  const templates = [
    {
      id: 'productivity',
      name: 'Productivity Initiative',
      template: `Subject: "Productivity Initiative: £[X] Annual Return Opportunity"

I've identified a significant productivity opportunity based on industry benchmarks.

Current Situation: Our [area] analysis reveals we're losing £[X]k annually in productivity due to [specific issue] (£[X] per employee average).

Proposed Solution: [Your HR initiative]
Investment Required: £[X]
Expected Annual Return: £[X] 
ROI: [X]%
Payback Period: [X] months

Key Business Benefits:
• [X]% improvement in [specific metric]
• [X]% reduction in [cost area]
• [X]% increase in [efficiency measure]

Implementation Timeline: [X] weeks
Measurement: [Specific business metrics]`
    },
    {
      id: 'engagement',
      name: 'Engagement Program',
      template: `Subject: "Employee Engagement: £[X] Productivity Recovery"

Following our discussion about productivity challenges, I've analyzed our engagement data against industry benchmarks.

Current Impact:
• Only [X]% of our workforce is fully engaged (vs. [X]% industry average)
• This represents £[X] in lost productivity annually
• Research shows this is recoverable through targeted engagement

Strategic Solution: [Your engagement program]
Investment: £[X]
Projected Recovery: £[X] annually
ROI: [X]%

Business Outcomes:
• Move from [X]% to [X]% engagement (above industry average)
• Reduce productivity loss by [X]%
• Improve customer satisfaction through more engaged staff

Success Metrics:
• Monthly engagement pulse surveys
• Productivity metrics by department
• Customer satisfaction scores

This aligns directly with our growth strategy and competitive positioning.`
    },
    {
      id: 'retention',
      name: 'Retention Initiative', 
      template: `Subject: "Retention Strategy: £[X] Annual Savings Opportunity"

Our exit interview analysis reveals a retention opportunity with significant financial impact.

Current Cost:
• [X] departures annually
• Average replacement cost: £[X] per person
• Total annual cost: £[X]

Root Cause Analysis:
• [X]% cite [specific issue]
• [X]% mention [specific problem]
• [X]% report [specific concern]

Proposed Solution: [Your retention program]
Investment: £[X]
Target: Reduce departures by [X] annually
Annual Savings: £[X]
ROI: [X]%

Strategic Benefits:
• Retain institutional knowledge
• Maintain team continuity
• Reduce recruitment and training costs
• Improve team morale and productivity

This initiative directly supports our operational efficiency goals.`
    }
  ];

  const translateText = () => {
    if (!hrInput.trim()) return;

    let translated = hrInput;
    
    // Apply transformation patterns
    Object.entries(transformationPatterns).forEach(([hrTerm, businessTerm]) => {
      const regex = new RegExp(hrTerm, 'gi');
      translated = translated.replace(regex, businessTerm);
    });

    // Add business context and structure
    if (translated.length > 50) {
      // For longer inputs, structure as business case
      const businessVersion = `Business Case Summary:

Current Situation: ${translated}

Expected Business Impact:
• Measurable productivity improvement
• Quantifiable cost reduction
• Strategic alignment with business objectives
• Clear ROI and payback period

Recommendation: Implement targeted intervention with defined success metrics and regular progress reviews.`;
      
      setTranslatedOutput(businessVersion);
    } else {
      // For shorter inputs, just apply terminology transformation
      setTranslatedOutput(translated);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedOutput);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const loadTemplate = (template) => {
    setSelectedTemplate(template.id);
    setTranslatedOutput(template.template);
  };

  const quickTransformations = [
    {
      hr: "We need to invest in our people because they're our greatest asset",
      business: "A £50,000 investment in development training delivers £375,000 in productivity gains - that's 650% ROI"
    },
    {
      hr: "Employee morale is low and affecting the workplace",
      business: "Low engagement is costing us £800,000 annually in lost productivity. We can recover £400,000 through targeted interventions"
    },
    {
      hr: "We should provide better work-life balance",
      business: "Work-life balance improvements reduce turnover by 30%, saving £270,000 in replacement costs annually"
    },
    {
      hr: "This training will help people develop their skills",
      business: "This training reduces time-to-productivity by 3 weeks, delivering £45,000 value per cohort of 10 new hires"
    },
    {
      hr: "We need better communication in the organization",
      business: "Communication inefficiency costs us £560K annually. A structured program can recover 25% of this loss"
    }
  ];

  return (
    <section id="translator" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Business Language Translator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your HR initiatives from cost centers to profit drivers. Speak CFO and CEO language to get your proposals approved.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Input Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">HR Language</h3>
            </div>
            
            <textarea
              value={hrInput}
              onChange={(e) => setHrInput(e.target.value)}
              placeholder="Enter your HR initiative or proposal in everyday language..."
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            
            <button
              onClick={translateText}
              className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Translate to Business Language</span>
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Calculator className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Business Language</h3>
              </div>
              {translatedOutput && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copiedToClipboard ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>
            
            <div className="h-40 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto whitespace-pre-wrap text-sm">
              {translatedOutput || "Your business-focused translation will appear here..."}
            </div>
          </div>
        </div>

        {/* Business Case Templates */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Business Case Templates</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => loadTemplate(template)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{template.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Professional template with ROI calculations
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Key Business Terms Reference */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Business Terms</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessTerms.map((term, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="font-semibold text-blue-600 mb-2">{term.term}</div>
                <div className="text-sm text-gray-600 mb-3">{term.translation}</div>
                <div className="text-xs text-gray-500 italic">"{term.usage}"</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Transformation Examples */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-900">Before & After Examples</h3>
          </div>
          
          <div className="space-y-6">
            {quickTransformations.map((example, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-600 mb-2">❌ HR Language:</div>
                  <div className="text-sm text-gray-700 italic">"{example.hr}"</div>
                </div>
                <div>
                  <div className="font-medium text-green-600 mb-2">✅ Business Language:</div>
                  <div className="text-sm text-gray-700 font-medium">"{example.business}"</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Key Transformation Principles:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Always include specific financial impact (£ amounts)</li>
              <li>• Show clear ROI calculations and payback periods</li>
              <li>• Focus on measurable business outcomes, not activities</li>
              <li>• Use industry benchmarks for context and credibility</li>
              <li>• Connect HR initiatives to strategic business goals</li>
              <li>• Provide clear success metrics and accountability measures</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BusinessTranslator;