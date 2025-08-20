import React, { useState } from 'react';
import { Menu, X, Calculator } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Calculators', href: '#calculators' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Mentoring', href: '#mentoring' },
  ];

  const scrollToCalculators = () => {
    const calculatorsSection = document.getElementById('calculators');
    if (calculatorsSection) {
      calculatorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://hrimpactlab.com/wp-content/uploads/2025/06/hril.png" 
                alt="HR Impact Lab Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <a href="#hero" className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-200">People Strategy ROI</a>
              <p className="text-xs text-gray-500">Profit-Loss Impact Calculator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200 hover:scale-105"
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={scrollToCalculators}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={() => {
                scrollToCalculators();
                setIsMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 mt-4"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;