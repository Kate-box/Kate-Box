import React, { useState } from 'react';
import { TrendingUp, Award, Target, Calendar, CheckCircle, Clock, Star } from 'lucide-react';

const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const progressData = {
    overall: 65,
    categories: [
      { name: 'Business Acumen', progress: 70, target: 85 },
      { name: 'Strategic Thinking', progress: 60, target: 80 },
      { name: 'Influence Skills', progress: 75, target: 90 },
      { name: 'Leadership', progress: 55, target: 75 }
    ],
    milestones: [
      { title: 'Completed Skills Assessment', date: '2024-01-15', status: 'completed' },
      { title: 'First Strategic Project', date: '2024-02-01', status: 'completed' },
      { title: 'Business Fundamentals Course', date: '2024-02-15', status: 'in-progress' },
      { title: 'Executive Presentation', date: '2024-03-01', status: 'upcoming' },
      { title: 'Strategic Role Transition', date: '2024-04-01', status: 'upcoming' }
    ],
    achievements: [
      { title: 'Strategic Thinker', description: 'Completed strategic thinking assessment', icon: Target, earned: true },
      { title: 'Business Partner', description: 'Led first cross-functional project', icon: TrendingUp, earned: true },
      { title: 'Influencer', description: 'Successfully influenced major decision', icon: Star, earned: false },
      { title: 'Thought Leader', description: 'Published industry article', icon: Award, earned: false }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'milestones', label: 'Milestones', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <section id="progress" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Track Your Progress
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor your development journey and celebrate your achievements
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Overall Progress */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Overall Progress</h3>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#progressGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(progressData.overall / 100) * 440} 440`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{progressData.overall}%</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600">Strategic HR Transformation</p>
              </div>

              {/* Category Progress */}
              <div className="grid md:grid-cols-2 gap-6">
                {progressData.categories.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <span className="text-sm text-gray-500">Target: {category.target}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Progress</span>
                        <span className="font-medium">{category.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${category.progress}%` }}
                        ></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 opacity-50">
                        <div
                          className="bg-gray-400 h-1 rounded-full"
                          style={{ width: `${category.target}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Development Milestones</h3>
              <div className="space-y-4">
                {progressData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                      milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                      <p className="text-sm text-gray-500">{milestone.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {milestone.status.replace('-', ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Badges</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {progressData.achievements.map((achievement, index) => (
                  <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    achievement.earned 
                      ? 'border-yellow-300 bg-yellow-50 shadow-lg' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        achievement.earned 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.earned && (
                      <div className="flex items-center space-x-2 text-yellow-700">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Earned!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg">
            Update Progress
          </button>
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            Share Progress
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;