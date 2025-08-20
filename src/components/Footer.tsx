import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href="mailto:kate@hrimpactlab.com" className="text-gray-300 hover:text-white transition-colors duration-200">
              kate@hrimpactlab.com
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 HR Impact Lab People Strategy ROI Calculator
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;