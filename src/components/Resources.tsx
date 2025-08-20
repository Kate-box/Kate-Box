import React, { useState } from 'react';
import { BookOpen, Video, Users, Download, ExternalLink, Search, Filter } from 'lucide-react';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: Video },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'tools', label: 'Tools', icon: Download }
  ];

  const resources = [
    {
      id: 1,
      title: 'Business Acumen for HR Professionals',
      type: 'courses',
      description: 'Comprehensive course covering financial literacy, business models, and commercial thinking for HR leaders.',
      provider: 'AIHR Academy',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.8,
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'The HR Business Partner Handbook',
      type: 'books',
      description: 'Essential guide to transitioning from traditional HR to strategic business partnership.',
      provider: 'Dave Ulrich',
      duration: '320 pages',
      level: 'All Levels',
      rating: 4.6,
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Strategic HR Community',
      type: 'communities',
      description: 'Join 50,000+ HR professionals discussing strategic transformation and business partnership.',
      provider: 'LinkedIn Group',
      duration: 'Ongoing',
      level: 'All Levels',
      rating: 4.7,
      link: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Executive Influence Masterclass',
      type: 'courses',
      description: 'Learn to influence without authority and communicate effectively with C-level executives.',
      provider: 'Strategic HR Institute',
      duration: '6 weeks',
      level: 'Advanced',
      rating: 4.9,
      link: '#',
      featured: true
    },
    {
      id: 5,
      title: 'HR Analytics Dashboard Template',
      type: 'tools',
      description: 'Ready-to-use Excel template for tracking and presenting HR metrics to business leaders.',
      provider: 'HR Metrics Pro',
      duration: 'Instant',
      level: 'Intermediate',
      rating: 4.5,
      link: '#',
      featured: false
    },
    {
      id: 6,
      title: 'AIHR Professional Community',
      type: 'communities',
      description: 'Premium community for HR professionals focused on strategic development and career growth.',
      provider: 'AIHR',
      duration: 'Ongoing',
      level: 'All Levels',
      rating: 4.8,
      link: '#',
      featured: false
    },
    {
      id: 7,
      title: 'Strategic Thinking for HR Leaders',
      type: 'books',
      description: 'Develop foresight, trend analysis, and strategic planning capabilities.',
      provider: 'Harvard Business Review',
      duration: '280 pages',
      level: 'Advanced',
      rating: 4.7,
      link: '#',
      featured: false
    },
    {
      id: 8,
      title: 'Business Case Builder Tool',
      type: 'tools',
      description: 'Interactive tool to help you build compelling business cases for HR initiatives.',
      provider: 'Strategic HR Tools',
      duration: 'Instant',
      level: 'Intermediate',
      rating: 4.6,
      link: '#',
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'courses': return Video;
      case 'books': return BookOpen;
      case 'communities': return Users;
      case 'tools': return Download;
      default: return BookOpen;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Learning Resources & Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Curated collection of courses, books, communities, and tools to accelerate your strategic HR transformation
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        {activeCategory === 'all' && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.filter(r => r.featured).map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <div key={resource.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.provider}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{resource.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(resource.level)}`}>
                        {resource.level}
                      </span>
                      <span className="text-sm text-gray-500">{resource.duration}</span>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2">
                      <span>Access Resource</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.label}
            <span className="text-lg font-normal text-gray-500 ml-2">({filteredResources.length})</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <div key={resource.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{resource.provider}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                    <span className="text-sm text-gray-500">{resource.duration}</span>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <span>View Resource</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Transformation?</h3>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of HR professionals who've successfully made the transition to strategic business partners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Start Assessment
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;