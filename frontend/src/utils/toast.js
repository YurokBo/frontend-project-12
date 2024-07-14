import { toast } from 'react-toastify';

const showToastMessage = (message, toastType = 'success') => {
  toast[toastType](message, {
    position: 'top-right',
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
  });
};

export default showToastMessage;
