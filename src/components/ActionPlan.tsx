import React, { useState } from 'react';
import { Calendar, Clock, Target, CheckCircle, Plus, X } from 'lucide-react';
import BookCallModal from './BookCallModal';

const ActionPlan = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('90-days');
  const [customGoals, setCustomGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [showBookCallModal, setShowBookCallModal] = useState(false);

  const timeframes = [
    { id: '30-days', label: '30 Days', description: 'Quick wins and foundation building' },
    { id: '90-days', label: '90 Days', description: 'Significant progress and visibility' },
    { id: '6-months', label: '6 Months', description: 'Major transformation milestones' },
    { id: '1-year', label: '1 Year', description: 'Complete strategic transition' }
  ];

  const actionPlans = {
    '30-days': {
      title: '30-Day Foundation Builder',
      goals: [
        'Complete comprehensive skills assessment',
        'Map current role activities (admin vs strategic)',
        'Interview 3 business leaders about HR expectations',
        'Identify one strategic project to volunteer for',
        'Start reading business publications daily',
        'Schedule monthly 1:1s with key stakeholders'
      ],
      focus: 'Assessment and relationship building'
    },
    '90-days': {
      title: '90-Day Strategic Shift',
      goals: [
        'Complete business fundamentals course',
        'Lead first strategic HR initiative',
        'Present business case for HR project to leadership',
        'Establish regular business metrics reporting',
        'Join cross-functional project team',
        'Develop executive communication skills'
      ],
      focus: 'Skill development and strategic project leadership'
    },
    '6-months': {
      title: '6-Month Transformation',
      goals: [
        'Demonstrate measurable business impact from HR initiatives',
        'Become go-to person for strategic HR advice',
        'Speak at internal leadership meetings regularly',
        'Mentor other HR professionals in strategic thinking',
        'Complete advanced business acumen certification',
        'Build reputation as trusted business advisor'
      ],
      focus: 'Establishing strategic credibility and influence'
    },
    '1-year': {
      title: '1-Year Strategic Partner',
      goals: [
        'Secure promotion to strategic HR role',
        'Lead organization-wide transformation initiative',
        'Speak at external industry conferences',
        'Publish thought leadership content',
        'Achieve recognition as strategic business partner',
        'Mentor and develop other strategic HR professionals'
      ],
      focus: 'Full strategic partner recognition and thought leadership'
    }
  };

  const addCustomGoal = () => {
    if (newGoal.trim()) {
      setCustomGoals([...customGoals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const removeCustomGoal = (index: number) => {
    setCustomGoals(customGoals.filter((_, i) => i !== index));
  };

  const handleDownload = () => {
    // TODO: Implement actual PDF download logic here
    console.log('Downloading action plan...');
    
    // Show the book call modal after download
    setTimeout(() => {
      setShowBookCallModal(true);
    }, 500);
  };

  const currentPlan = actionPlans[selectedTimeframe as keyof typeof actionPlans];

  return (
    <section id="action-plan" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Create Your Personal Action Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your timeframe and get a customized roadmap with specific, actionable goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeframe Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Timeframe</h3>
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedTimeframe === timeframe.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{timeframe.label}</span>
                </div>
                <p className="text-sm text-gray-600">{timeframe.description}</p>
              </button>
            ))}
          </div>

          {/* Action Plan Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentPlan.title}</h3>
                  <p className="text-blue-600 font-medium">{currentPlan.focus}</p>
                </div>
              </div>

              {/* Goals Checklist */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900">Key Goals & Milestones:</h4>
                <div className="space-y-3">
                  {currentPlan.goals.map((goal, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                      <button className="mt-1 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-gray-400 hover:text-green-600 transition-colors" />
                      </button>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Goals */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Add Your Custom Goals:</h4>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Enter a custom goal..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addCustomGoal()}
                  />
                  <button
                    onClick={addCustomGoal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {customGoals.length > 0 && (
                  <div className="space-y-2">
                    {customGoals.map((goal, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border border-blue-200">
                        <button className="mt-1 flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-gray-400 hover:text-green-600 transition-colors" />
                        </button>
                        <span className="flex-1 text-gray-700">{goal}</span>
                        <button
                          onClick={() => removeCustomGoal(index)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={handleDownload}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg"
                >
                  Download Action Plan
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Share with Mentor
                </button>
              </div>
            </div>

            {/* Timeline Visualization */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Timeline Overview</h4>
              <div className="space-y-4">
                {currentPlan.goals.slice(0, 4).map((goal, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm">{goal}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Week {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Call Modal */}
      <BookCallModal 
        isOpen={showBookCallModal} 
        onClose={() => setShowBookCallModal(false)} 
      />
    </section>
  );
};

export default ActionPlan;