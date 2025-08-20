import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Circle, Target, Users, Lightbulb, TrendingUp, MessageSquare, Award } from 'lucide-react';

const TransitionSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: 'Self-Assessment & Gap Analysis',
      icon: Target,
      duration: '1-2 weeks',
      description: 'Identify where you are now versus where you need to be as a strategic HR partner.',
      details: [
        'Complete comprehensive skills assessment',
        'Analyze current role responsibilities',
        'Identify business acumen gaps',
        'Set specific career goals',
        'Create baseline metrics'
      ],
      actions: [
        'Take the HR Strategic Readiness Assessment',
        'Map your current activities (admin vs strategic)',
        'Interview 3 business leaders about HR expectations',
        'Document your career vision and timeline'
      ]
    },
    {
      id: 2,
      title: 'Business Acumen Development',
      icon: TrendingUp,
      duration: '2-3 months',
      description: 'Learn to think like a business leader and understand commercial drivers.',
      details: [
        'Financial literacy for HR professionals',
        'Understanding P&L impact',
        'Business model analysis',
        'ROI measurement frameworks',
        'Commercial decision making'
      ],
      actions: [
        'Complete business fundamentals course',
        'Shadow a business leader for a week',
        'Analyze your company\'s financial statements',
        'Create ROI framework for HR initiatives'
      ]
    },
    {
      id: 3,
      title: 'Influence & Communication Skills',
      icon: MessageSquare,
      duration: '1-2 months',
      description: 'Master the art of influencing without authority and executive communication.',
      details: [
        'Stakeholder mapping and management',
        'Executive communication techniques',
        'Persuasion and negotiation skills',
        'Coalition building strategies',
        'Presentation and storytelling'
      ],
      actions: [
        'Practice executive-level presentations',
        'Build relationships with key stakeholders',
        'Join cross-functional project teams',
        'Develop your personal brand internally'
      ]
    },
    {
      id: 4,
      title: 'Strategic Project Leadership',
      icon: Lightbulb,
      duration: '3-6 months',
      description: 'Lead strategic initiatives that demonstrate business impact.',
      details: [
        'Strategic planning methodologies',
        'Change management leadership',
        'Project management excellence',
        'Data-driven decision making',
        'Cross-functional collaboration'
      ],
      actions: [
        'Volunteer for strategic business projects',
        'Lead a high-visibility HR transformation',
        'Implement measurement and analytics',
        'Present results to executive team'
      ]
    },
    {
      id: 5,
      title: 'Continuous Growth & Recognition',
      icon: Award,
      duration: 'Ongoing',
      description: 'Establish yourself as a trusted strategic advisor and continue developing.',
      details: [
        'Thought leadership development',
        'Industry networking and visibility',
        'Mentoring and knowledge sharing',
        'Advanced certifications',
        'Executive coaching'
      ],
      actions: [
        'Speak at industry conferences',
        'Publish thought leadership content',
        'Mentor other HR professionals',
        'Pursue advanced certifications'
      ]
    }
  ];

  const toggleStepCompletion = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(i => i !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  return (
    <section id="steps" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Your 5-Step Transformation Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow this proven roadmap to transition from reactive administrator to strategic business partner
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Steps Navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStepCompletion(index);
                    }}
                    className="flex-shrink-0"
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <Circle className="w-8 h-8 text-gray-400 hover:text-blue-600 transition-colors" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <step.icon className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                    activeStep === index ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-white" })}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep].title}</h3>
                <p className="text-blue-600 font-medium">{steps[activeStep].duration}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{steps[activeStep].description}</p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Focus Areas:</h4>
                <ul className="space-y-2">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Action Items:</h4>
                <ul className="space-y-2">
                  {steps[activeStep].actions.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => toggleStepCompletion(activeStep)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  completedSteps.includes(activeStep)
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {completedSteps.includes(activeStep) ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              
              {activeStep < steps.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-700">
              {completedSteps.length} of {steps.length} steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransitionSteps;