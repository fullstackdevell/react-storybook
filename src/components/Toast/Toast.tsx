import React, { useEffect, useState, useRef } from 'react';
import type { ToastProps, ToastVariant } from './Toast.types';
import './Toast.css';


const variantIcons: Record<ToastVariant, string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const defaultDuration = 5000;
const transitionDuration = 300; 

const Toast: React.FC<ToastProps> = ({
  title,
  message,
  variant = 'info',
  duration = defaultDuration,
  onDismiss,
  showCloseButton = true,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const autoDismissTimeoutRef = useRef<number | undefined>(undefined); 
  const fadeOutTimeoutRef = useRef<number | undefined>(undefined);

  const dismiss = () => {
    clearTimeout(autoDismissTimeoutRef.current);
    clearTimeout(fadeOutTimeoutRef.current);

    setIsVisible(false);

    fadeOutTimeoutRef.current = setTimeout(() => {
        onDismiss();
    }, transitionDuration);
  };

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);


  useEffect(() => {
    autoDismissTimeoutRef.current = setTimeout(() => {
      dismiss();
    }, duration);

    return () => {
      clearTimeout(autoDismissTimeoutRef.current);
      clearTimeout(fadeOutTimeoutRef.current);
    };
  }, [duration]);

  return (
    <div 
      role="alert"
      className={`toast-notification toast-variant-${variant} ${isVisible ? 'is-visible' : 'is-hidden'}`}
      {...rest}
    >
      <div className="toast-icon">
        {variantIcons[variant]}
      </div>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
      </div>
      
      {showCloseButton && (
        <button 
          type="button" 
          className="toast-close-button"
          onClick={dismiss}
          aria-label="Close notification"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Toast;