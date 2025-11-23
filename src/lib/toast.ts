import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      icon: '✅',
    });
  },
  
  error: (message: string) => {
    toast.error(message, {
      icon: '❌',
    });
  },
  
  loading: (message: string) => {
    return toast.loading(message, {
      icon: '⏳',
    });
  },
  
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },

  info: (message: string) => {
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
      },
    });
  },

  warning: (message: string) => {
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
    });
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },

  dismissAll: () => {
    toast.dismiss();
  },
};