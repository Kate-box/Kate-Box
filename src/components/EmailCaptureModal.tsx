import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

declare global {
  interface Window {
    // Kit script may add properties to window
    [key: string]: any;
  }
}

const EmailCaptureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hrimpactlab-visited');
    
    if (!hasVisited) {
      // Show modal after a brief delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // 2 second delay
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Load Kit's embed script
      const existingScript = document.querySelector('script[data-uid="8a1ab38254"]');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://hrimpactlab.kit.com/8a1ab38254/index.js';
        script.async = true;
        script.setAttribute('data-uid', '8a1ab38254');
        document.body.appendChild(script);

        script.onload = () => {
          console.log('Kit embed script loaded');
        };

        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      }

      // Monitor for Kit form submissions
      const checkForSuccess = setInterval(() => {
        const successMessage = document.querySelector('.formkit-alert-success');
        if (successMessage && !showSuccess) {
          console.log('Kit success detected!');
          setShowSuccess(true);
          setTimeout(() => handleClose(), 3000);
          clearInterval(checkForSuccess);
        }
      }, 500);

      return () => {
        clearInterval(checkForSuccess);
      };
    }
  }, [isOpen, showSuccess]);

  const handleClose = () => {
    setIsOpen(false);
    // Mark user as visited
    localStorage.setItem('hrimpactlab-visited', 'true');
  };

  const handleFormSubmit = () => {
    // This will be called when Kit form is submitted
    handleClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Content */}
        <div className="p-8">
          {showSuccess ? (
            /* Success State */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thanks for joining!
              </h3>
              <p className="text-gray-600">
                Have fun calculating your people costs
              </p>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your Free HR Impact Report
                </h3>
                <p className="text-gray-600">
                  Join thousands of HR professionals getting actionable insights to build business cases and drive strategic impact.
                </p>
              </div>
              
              {/* Kit Form - Loaded via script */}
              <div id="kit-form-container" className="kit-form-wrapper">
                {/* The Kit script will inject the form here */}
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureModal;