import React, { useEffect, useState } from 'react';

const PopUp = ({ type = 'info', message = '', duration = 4000, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-green-100 dark:bg-green-900',
      border: 'border-green-500 dark:border-green-700',
      text: 'text-green-900 dark:text-green-100',
      icon: 'text-green-600',
      label: 'Success - ',
    },
    info: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      border: 'border-blue-500 dark:border-blue-700',
      text: 'text-blue-900 dark:text-blue-100',
      icon: 'text-blue-600',
      label: 'Info - ',
    },
    warning: {
      bg: 'bg-yellow-100 dark:bg-yellow-900',
      border: 'border-yellow-500 dark:border-yellow-700',
      text: 'text-yellow-900 dark:text-yellow-100',
      icon: 'text-yellow-600',
      label: 'Warning - ',
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900',
      border: 'border-red-500 dark:border-red-700',
      text: 'text-red-900 dark:text-red-100',
      icon: 'text-red-600',
      label: 'Error - ',
    },
  };

  const current = typeStyles[type] || typeStyles.info;

  return (
    <div
className={`fixed z-50 left-1/2 transform -translate-x-1/2 transition-all duration-300
  ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
  top-10 sm:top-14 md:top-16 lg:top-20
`}

    >
      <div
        role="alert"
        className={`max-w-lg w-[95vw] sm:w-auto ${current.bg} ${current.border} ${current.text} px-5 py-4 rounded-lg flex items-center shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out hover:brightness-105`}
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className={`h-6 w-6 flex-shrink-0 mr-3 ${current.icon}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <p className="text-sm font-medium leading-snug">
          <span className="font-bold">{current.label}</span>{message}
        </p>
      </div>
    </div>
  );
};

export default PopUp;
