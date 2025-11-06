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
      // Load Kit's main script
      const existingScript = document.querySelector('script[src="https://f.convertkit.com/ckjs/ck.5.js"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
        document.head.appendChild(script);
        
        script.onload = () => {
          console.log('Kit main script loaded');
        };
        
        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
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
              
              {/* Kit Form - Properly styled */}
              <div 
                dangerouslySetInnerHTML={{
                  __html: `
                    <form action="https://app.kit.com/forms/8722223/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="8722223" data-uid="8a1ab38254" data-format="inline" data-version="5" min-width="400 500 600 700 800" style="background-color: rgb(249, 250, 251); border-radius: 4px; border: 1px solid #e3e3e3; max-width: 700px; position: relative; overflow: hidden;">
                      <div class="formkit-background" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-size: cover; background-position: center; opacity: 0.3; background-image: url('https://embed.filekitcdn.com/e/ncUFuzC99gL3c5F7wDfBSb/eVsCSWT7UWe9ibYKUvkFxp');"></div>
                      <div data-style="minimal" style="padding: 40px; width: 100%; position: relative;">
                        <div class="formkit-header" data-element="header" style="color: rgb(77, 77, 77); font-size: 27px; font-weight: 700; margin: 0 0 27px 0; text-align: center;">
                          <h2>Learn how to calculate your people costs.</h2>
                        </div>
                        <div class="formkit-subheader" data-element="subheader" style="color: rgb(16, 103, 147); font-size: 18px; margin: 18px 0; text-align: center;">
                          <p>Quantify the financial impact of poor communication, low engagement, high turnover, and other people-related costs. Make data-driven decisions, so your People strategy creates profitable impact.</p>
                        </div>
                        <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert" style="background: #f9fafb; border: 1px solid #e3e3e3; border-radius: 5px; list-style: none; margin: 25px auto; padding: 12px; text-align: center; width: 100%; display: none;"></ul>
                        <div data-element="fields" data-stacked="false" class="seva-fields formkit-fields" style="display: flex; flex-wrap: wrap; margin: 25px auto 0 auto; margin-left: -5px; margin-right: -5px;">
                          <div class="formkit-field" style="min-width: 220px; margin: 0 5px 15px 5px; flex: 100 1 auto;">
                            <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="background: #ffffff; font-size: 15px; padding: 12px; border: 1px solid #e3e3e3; flex: 1 0 auto; line-height: 1.4; margin: 0; transition: border-color ease-out 300ms; color: rgb(0, 0, 0); border-radius: 4px; font-weight: 400; width: 100%;">
                          </div>
                          <button data-element="submit" class="formkit-submit" type="submit" style="border: 0; border-radius: 5px; color: #ffffff; cursor: pointer; display: inline-block; text-align: center; font-size: 15px; font-weight: 500; margin: 0 5px 15px 5px; overflow: hidden; padding: 0; position: relative; vertical-align: middle; background-color: rgb(22, 119, 190); flex: 1 1 auto;">
                            <div class="formkit-spinner" style="display: flex; height: 0px; width: 0px; margin: 0 auto; position: absolute; top: 0; left: 0; right: 0; overflow: hidden; text-align: center; transition: all 300ms ease-in-out;"><div style="margin: auto; width: 12px; height: 12px; background-color: #fff; opacity: 0.3; border-radius: 100%; display: inline-block;"></div><div style="margin: auto; width: 12px; height: 12px; background-color: #fff; opacity: 0.3; border-radius: 100%; display: inline-block;"></div><div style="margin: auto; width: 12px; height: 12px; background-color: #fff; opacity: 0.3; border-radius: 100%; display: inline-block;"></div></div>
                            <span style="display: block; transition: all 300ms ease-in-out; padding: 12px 24px;">Subscribe</span>
                          </button>
                        </div>
                        <div class="formkit-guarantee" data-element="guarantee" style="color: rgb(77, 77, 77); font-size: 13px; font-weight: 400; margin: 10px 0 15px 0; text-align: center;">We won't send you spam. Unsubscribe at any time.</div>
                      </div>
                    </form>
                  `
                }}
              />
              
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