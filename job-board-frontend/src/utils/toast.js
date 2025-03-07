import { toast as reactToast } from 'react-toastify';

export const toast = {
  success: (message) => reactToast.success(message),
  error: (message) => reactToast.error(message),
};