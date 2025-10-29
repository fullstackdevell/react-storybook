import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback, useRef } from 'react';
import Toast from '../components/Toast/Toast';
import type { ToastVariant } from '../components/Toast/Toast.types';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onDismiss: { action: 'dismissed' },
  }
};
export default meta;

type Story = StoryObj<typeof Toast>;

interface ToastItem {
  id: number;
  title: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

const ToastListManager = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  const toastIdRef = useRef<number>(0); 

  const addToast = useCallback((variant: ToastVariant, duration?: number) => {
    const id = toastIdRef.current++;
    const newToast: ToastItem = {
      id,
      variant,
      duration,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
      message: `This is a test message for the ${variant} variant. It will auto-dismiss in ${duration ? duration / 1000 : 5} seconds.`,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []); 

  const dismissToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <>
      <div style={{ padding: '20px', minHeight: '300px' }}>
          <h1>Toast Notification Test Bench</h1>
          <p>Click the buttons below to trigger different toast notifications. They should appear at the bottom right and auto-dismiss.</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => addToast('success')}>Show Success (5s)</button>
              <button onClick={() => addToast('error')}>Show Error (5s)</button>
              <button onClick={() => addToast('warning', 8000)}>Show Warning (8s)</button>
              <button onClick={() => addToast('info', 3000)}>Show Info (3s)</button>
          </div>
      </div>

      <div className="toast-container-wrapper"> 
          {toasts.map((toast) => (
              <Toast
                  key={toast.id}
                  title={toast.title}
                  message={toast.message}
                  variant={toast.variant}
                  duration={toast.duration}
                  onDismiss={() => dismissToast(toast.id)}
              />
          ))}
      </div>
    </>
  );
};

export const ToastTestBench: Story = {
  render: () => <ToastListManager />,
};