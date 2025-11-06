import { X, Calendar, CheckCircle } from 'lucide-react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Content */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Plan Downloaded Successfully!
          </h3>
          
          <p className="text-gray-600 mb-6">
            Ready to discuss how to implement these strategies and accelerate your HR transformation?
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Free 30-Minute People Strategy Review</span>
            </div>
            <p className="text-sm text-gray-600 text-left">
              • Personalized guidance on your action plan<br/>
              • Identify your biggest impact opportunities<br/>
              • Get expert advice on implementation
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a
              href="https://outlook.office.com/book/HRImpactLab@kaidos.co.uk/?ismsaljsauthenabled=true"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg flex items-center justify-center space-x-2"
              onClick={() => {
                // Close modal after a short delay
                setTimeout(() => onClose(), 500);
              }}
            >
              <Calendar className="w-5 h-5" />
              <span>Book your free 30-minute people strategy review now</span>
            </a>
            
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCallModal;