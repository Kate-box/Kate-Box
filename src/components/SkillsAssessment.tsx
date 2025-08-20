import React, { useState } from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Users, Lightbulb, Target } from 'lucide-react';

const SkillsAssessment = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const categories = [
    {
      name: 'Business Acumen',
      icon: TrendingUp,
      color: 'blue',
      questions: [
        'I understand my company\'s business model and revenue streams',
        'I can read and interpret financial statements (P&L, Balance Sheet)',
        'I regularly analyze the ROI of HR initiatives',
        'I understand how HR decisions impact business outcomes',
        'I can speak confidently about business metrics with executives'
      ]
    },
    {
      name: 'Strategic Thinking',
      icon: Target,
      color: 'indigo',
      questions: [
        'I proactively identify future workforce trends and challenges',
        'I develop long-term HR strategies aligned with business goals',
        'I can anticipate the business impact of external changes',
        'I regularly contribute to strategic business discussions',
        'I think beyond immediate HR problems to systemic solutions'
      ]
    },
    {
      name: 'Influence & Communication',
      icon: Users,
      color: 'purple',
      questions: [
        'I can influence decisions without formal authority',
        'I effectively communicate HR value to business leaders',
        'I build strong relationships across all organizational levels',
        'I can negotiate and find win-win solutions',
        'I present complex HR topics in business-friendly language'
      ]
    },
    {
      name: 'Innovation & Problem Solving',
      icon: Lightbulb,
      color: 'green',
      questions: [
        'I regularly propose innovative solutions to business challenges',
        'I use data and analytics to drive HR decisions',
        'I challenge traditional HR approaches when needed',
        'I collaborate effectively with other business functions',
        'I lead change initiatives successfully'
      ]
    }
  ];

  const handleResponse = (questionIndex: number, value: number) => {
    const key = `${currentCategory}-${questionIndex}`;
    setResponses({ ...responses, [key]: value });
  };

  const calculateResults = () => {
    const results = categories.map((category, categoryIndex) => {
      const categoryResponses = category.questions.map((_, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        return responses[key] || 0;
      });
      
      const total = categoryResponses.reduce((sum, score) => sum + score, 0);
      const average = total / category.questions.length;
      const percentage = (average / 5) * 100;
      
      return {
        name: category.name,
        score: average,
        percentage: Math.round(percentage),
        level: percentage >= 80 ? 'Advanced' : percentage >= 60 ? 'Intermediate' : percentage >= 40 ? 'Developing' : 'Beginner'
      };
    });
    
    return results;
  };

  const results = showResults ? calculateResults() : [];
  const overallScore = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length) : 0;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      indigo: 'from-indigo-500 to-indigo-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="assessment" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Strategic HR Readiness Assessment
          </h2>
          <p className="text-xl text-gray-600">
            Evaluate your current capabilities across key strategic HR competencies
          </p>
        </div>

        {!showResults ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCategory(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentCategory === index
                      ? `bg-gradient-to-r ${getColorClasses(category.color)} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Current Category */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(categories[currentCategory].color)} rounded-xl flex items-center justify-center`}>
                  {React.createElement(categories[currentCategory].icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{categories[currentCategory].name}</h3>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {categories[currentCategory].questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="space-y-3">
                    <p className="font-medium text-gray-900">{question}</p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleResponse(questionIndex, value)}
                          className={`w-12 h-12 rounded-lg font-semibold transition-all duration-200 ${
                            responses[`${currentCategory}-${questionIndex}`] === value
                              ? `bg-gradient-to-r ${getColorClasses(categories[currentCategory].color)} text-white shadow-lg scale-110`
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentCategory(Math.max(0, currentCategory - 1))}
                  disabled={currentCategory === 0}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {currentCategory === categories.length - 1 ? (
                  <button
                    onClick={() => setShowResults(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg"
                  >
                    View Results
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentCategory(Math.min(categories.length - 1, currentCategory + 1))}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Strategic HR Readiness Score</h3>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallScore / 100) * 314} 314`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{overallScore}%</span>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                {overallScore >= 80 ? 'Excellent! You\'re ready for strategic roles.' :
                 overallScore >= 60 ? 'Good foundation. Focus on key development areas.' :
                 overallScore >= 40 ? 'Developing well. Significant growth opportunities ahead.' :
                 'Great starting point. Lots of room for strategic growth.'}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getColorClasses(categories[index].color)} rounded-lg flex items-center justify-center`}>
                      {React.createElement(categories[index].icon, { className: "w-5 h-5 text-white" })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{result.name}</h4>
                      <span className="text-sm text-gray-500">{result.level}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">{result.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${getColorClasses(categories[index].color)} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowResults(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Retake Assessment
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg">
                Create Development Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsAssessment;