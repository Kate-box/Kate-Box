import React from 'react';
import { User, Award, BookOpen, Target, Star, ArrowRight } from 'lucide-react';

const Mentoring = () => {
  const services = [
    {
      title: 'Fractional HR Director',
      description: 'Strategic HR leadership expertise for growing businesses',
      icon: Target
    },
    {
      title: 'HR Consultancy',
      description: 'Practical, impact-driven solutions for business leaders',
      icon: Award
    },
    {
      title: 'Leadership Training',
      description: 'Empowering leadership through collaboration and strategic thinking',
      icon: User
    },
    {
      title: 'Online Courses',
      description: 'Professional development for HR professionals',
      icon: BookOpen
    }
  ];

  const testimonials = [
    {
      text: "Kate's scientific approach to HR has transformed how we think about people strategy.",
      author: "Business Leader"
    },
    {
      text: "Her ability to bridge the gap between people and profit is exactly what our organization needed.",
      author: "CEO"
    }
  ];

  return (
    <section id="mentoring" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Kate Box
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founder and Expert HR Strategist at HR Impact Lab
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Bio */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Kate Box</h3>
                  <p className="text-blue-600 font-medium">HR Impact Lab Founder</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  With a unique background in Biology, Kate brings a scientific approach to HR strategy, 
                  believing that "people are the DNA of your business."
                </p>
                <p>
                  Her expertise lies in strategic HR leadership, focusing on aligning people strategy 
                  with commercial success and bridging the gap between people and profit.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <p className="font-medium text-blue-900 italic">
                    "HR should drive business success, not just support it."
                  </p>
                  <p className="text-sm text-blue-700 mt-2">- Kate Box</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Approach */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Her Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Scientific Method</h4>
                    <p className="text-gray-600">Applying biological principles to understand organizational behavior</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Commercial Focus</h4>
                    <p className="text-gray-600">Aligning people strategy with business success and profitability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Collaborative Leadership</h4>
                    <p className="text-gray-600">Empowering leadership through strategic collaboration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Practical Solutions</h4>
                    <p className="text-gray-600">Delivering impact-driven, actionable strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Mentoring & Consulting Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What People Say
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <p className="text-blue-600 font-medium">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your HR Strategy?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Connect with Kate Box to discover how strategic HR leadership can drive your business success.
            </p>
            <a 
              href="https://www.hrimpactlab.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold"
            >
              <span>Visit HR Impact Lab</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentoring;