import React from 'react';
import { ArrowRight } from 'lucide-react';

const Transformation = () => {
  const steps = [
    {
      number: '01',
      title: 'Assessment & Gap Analysis',
      description: 'We identify exactly where you are now versus where you need to be. No generic solutions - everything is tailored to your specific situation and career goals.',
      details: ['Current role analysis', 'Business acumen assessment', 'Influence skills evaluation', 'Career goal mapping']
    },
    {
      number: '02',
      title: 'Business Acumen Development',
      description: 'Learn to think like a business leader. Understand financials, business models, and how to connect HR initiatives to bottom-line results.',
      details: ['Financial literacy training', 'Business model understanding', 'ROI measurement frameworks', 'Commercial decision making']
    },
    {
      number: '03',
      title: 'Strategic Influence Training',
      description: 'Master the art of influencing without authority. Learn to sell your ideas, build coalitions, and become the trusted advisor executives seek.',
      details: ['Stakeholder management', 'Executive communication', 'Persuasion techniques', 'Coalition building']
    },
    {
      number: '04',
      title: 'Practical Application & Mentorship',
      description: 'Apply your new skills in real business scenarios with ongoing mentorship from strategic HR leaders who\'ve made the transition successfully.',
      details: ['Real project application', 'Peer learning groups', 'Expert mentorship', 'Success measurement']
    }
  ];

  return (
    <section id="transformation" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Your Transformation Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven 4-step process that takes you from reactive administrator to strategic business partner in 90 days or less.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={`https://images.pexels.com/photos/${
                        index === 0 ? '3184328' : 
                        index === 1 ? '3184291' : 
                        index === 2 ? '3184360' : '3184433'
                      }/pexels-photo-${
                        index === 0 ? '3184328' : 
                        index === 1 ? '3184291' : 
                        index === 2 ? '3184360' : '3184433'
                      }.jpeg`}
                      alt={step.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center mt-12">
                  <ArrowRight className="w-8 h-8 text-orange-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Stop Being Viewed as "Just HR"?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join 2,500+ HR professionals who've transformed their careers and gained the respect they deserve.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold">
              Start Your Transformation Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;