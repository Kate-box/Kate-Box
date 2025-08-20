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
        <div className="grid lg:grid-cols-1 gap-12 items-center mb-16">
          {/* Approach */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kate's Approach: From HR to Business Partner</h3>
              <p className="text-gray-600 mb-6">
                Kate works with business leaders and HR professionals to shift the perception of HR from a support function to a critical driver of business performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Commercial Alignment</h4>
                    <p className="text-gray-600">Teaching HR leaders how to align people strategies with core business objectives to deliver measurable ROI.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Leadership Influence</h4>
                    <p className="text-gray-600">Equipping HR professionals with the skills to engage and influence the C-suite.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data-Driven Decision Making</h4>
                    <p className="text-gray-600">Leveraging workforce analytics to predict challenges, solve problems, and capitalize on opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">People-Centric Impact</h4>
                    <p className="text-gray-600">Building high-performance cultures that drive productivity, retention, and employee engagement.</p>
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