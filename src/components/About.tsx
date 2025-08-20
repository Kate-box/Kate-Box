import React from 'react';
import { Award, Users, TrendingUp, Target } from 'lucide-react';
import kateBoxPhoto from '../assets/kate-box.jpg';

const About = () => {
  const stats = [
    { icon: Users, value: '2,500+', label: 'HR Leaders Transformed' },
    { icon: TrendingUp, value: '87%', label: 'Promotion Success Rate' },
    { icon: Award, value: '15+', label: 'Years HR Leadership' },
    { icon: Target, value: '400+', label: 'Strategic Projects Led' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Meet Kate Box: From HR Admin to Strategic Business Partner
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Kate spent 15+ years climbing from HR generalist roles to Chief People Officer positions. She knows exactly what it takes to break free from administrative tasks and become a strategic business partner that drives measurable business results.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-World Experience</h3>
                  <p className="text-gray-600">We've personally made the transition from reactive HR admin to strategic business partner. Every framework we teach has been battle-tested in Fortune 500 companies.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business-First Approach</h3>
                  <p className="text-gray-600">Unlike traditional HR training, we focus on business acumen, commercial thinking, and executive influence - the skills that actually matter for strategic roles.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Measurable Outcomes</h3>
                  <p className="text-gray-600">87% of our participants get promoted within 12 months. We track real career outcomes, not just course completion rates.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={kateBoxPhoto}
                alt="Kate Box - HR Impact Lab Founder"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;