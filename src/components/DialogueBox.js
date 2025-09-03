import React from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DialogueBox = ({ 
  isOpen, 
  onClose, 
  type = 'success', // 'success' or 'error'
  title,
  message,
  autoClose = true,
  autoCloseDelay = 3000 
}) => {
  // Auto close functionality
  React.useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isSuccess ? 'border-green-200' : 'border-red-200';
  const iconColor = isSuccess ? 'text-green-600' : 'text-red-600';
  const titleColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const messageColor = isSuccess ? 'text-green-700' : 'text-red-700';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Center the modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel */}
        <div className={`inline-block align-bottom ${bgColor} rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 border ${borderColor}`}>
          <div>
            {/* Close button */}
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="bg-transparent rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Icon and content */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4">
              {isSuccess ? (
                <CheckCircleIcon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
              ) : (
                <XCircleIcon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
              )}
            </div>

            <div className="text-center">
              <h3 className={`text-lg leading-6 font-medium ${titleColor} mb-2`}>
                {title}
              </h3>
              <div className="mt-2">
                <p className={`text-sm ${messageColor}`}>
                  {message}
                </p>
              </div>
            </div>
          </div>

          {/* Optional manual close button */}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
                isSuccess 
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                  : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              }`}
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
