import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'VP of People, TechForward Inc.',
      company: 'Promoted from HR Manager',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      content: 'I was stuck doing admin work for 5 years. This program taught me to think like a business leader. Within 6 months, I was promoted to VP and now I\'m part of the executive team making strategic decisions.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      title: 'Chief People Officer, HealthCare Plus',
      company: 'Promoted from HRBP',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      content: 'The business acumen training was a game-changer. I learned to speak the CEO\'s language and connect HR initiatives to revenue impact. Now I have a seat at the table for all major business decisions.',
      rating: 5
    },
    {
      name: 'Emily Thompson',
      title: 'Senior HR Business Partner, Global Corp',
      company: 'Transformed from Generalist',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: 'I was drowning in my first HRBP role. The influence training and mentorship gave me the confidence and skills to build real partnerships with business leaders. My performance review went from "needs improvement" to "exceeds expectations."',
      rating: 5
    },
    {
      name: 'David Park',
      title: 'Director of Talent Strategy, Financial Services',
      company: 'Career Pivot Success',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      content: 'After 10 years in traditional HR roles, I thought I was stuck. This program showed me how to position myself strategically. I landed a director role with a 40% salary increase and finally feel respected as a business partner.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Real Transformations, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how HR professionals just like you broke free from administrative roles and became strategic business partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="w-8 h-8 text-blue-600 opacity-20 absolute top-6 right-6" />
              
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.title}</div>
                  <div className="text-sm text-orange-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-full">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">4.9/5 average rating from 2,500+ HR professionals</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;