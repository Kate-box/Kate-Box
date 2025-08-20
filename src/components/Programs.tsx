import React from 'react';
import { Target, Users, Lightbulb, TrendingUp, MessageSquare, Award } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: Target,
      title: 'Business Acumen Mastery',
      description: 'Develop commercial thinking skills to understand P&L impact, business models, and speak the language of senior leadership.',
      features: ['Financial Literacy for HR', 'Business Model Analysis', 'ROI Measurement', 'Commercial Decision Making'],
      price: '$2,497',
      duration: '8 weeks'
    },
    {
      icon: MessageSquare,
      title: 'Executive Influence Program',
      description: 'Master the art of influencing without authority. Learn to sell your ideas, build coalitions, and drive strategic initiatives.',
      features: ['Stakeholder Mapping', 'Persuasion Techniques', 'Executive Communication', 'Coalition Building'],
      price: '$1,997',
      duration: '6 weeks'
    },
    {
      icon: TrendingUp,
      title: 'Strategic HR Transformation',
      description: 'Complete roadmap from reactive admin to proactive business partner. Includes mentorship and practical application.',
      features: ['Strategic Planning Skills', 'Change Leadership', 'Business Partnership', '1:1 Mentorship'],
      price: '$4,997',
      duration: '12 weeks'
    },
    {
      icon: Users,
      title: 'HR Business Partner Bootcamp',
      description: 'Intensive program for new HRBPs struggling in their first 90 days. Get immediate practical support and frameworks.',
      features: ['Consultative Approach', 'Relationship Building', 'Problem-Solving Frameworks', 'Quick Wins Strategy'],
      price: '$1,497',
      duration: '4 weeks'
    },
    {
      icon: Lightbulb,
      title: 'Strategic Thinking Workshop',
      description: 'Develop foresight, trend analysis, and strategic planning capabilities to move beyond reactive responses.',
      features: ['Trend Analysis', 'Strategic Planning', 'Future-State Visioning', 'Scenario Planning'],
      price: '$997',
      duration: '2 weeks'
    },
    {
      icon: Award,
      title: 'Executive Coaching Track',
      description: 'One-on-one coaching for senior HR leaders preparing for C-suite roles or major organizational transformations.',
      features: ['Personal Brand Building', 'Executive Presence', 'Board Readiness', 'Leadership Strategy'],
      price: '$12,997',
      duration: '6 months'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Development Programs That Actually Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop being viewed as reactive order-takers. Our programs focus on business acumen and strategic thinking - not traditional HR skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 group hover:border-blue-200 relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <program.icon className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {program.title}
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{program.price}</div>
                  <div className="text-sm text-gray-500">{program.duration}</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {program.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-orange-50 px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-gray-700">💡 Not sure which program fits? Take our 2-minute assessment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;