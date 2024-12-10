import { toast, type ToastOptions, type ToastPosition } from 'react-toastify';

const defaultToastOptions: ToastOptions = {
  position: 'top-right' as ToastPosition,
  autoClose: 3000,
  hideProgressBar: true,
};

export const showToastError = (message: string) => {
  toast.error(message, defaultToastOptions);
};

export const showToastSuccess = (message: string) => {
  toast.success(message, defaultToastOptions);
};
