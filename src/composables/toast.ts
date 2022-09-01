import { toastController, ToastOptions } from '@ionic/vue';
import {
  closeCircleOutline,
  alertCircleOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  warningOutline
} from 'ionicons/icons';

type ToastType = 'info' | 'success' | 'warning' | 'error';
type ToastMessage = string;

function getToastOpions(toastMessage: ToastMessage, toastType: ToastType) {
  const typeLookupMap = {
    info: {
      header: 'Info',
      color: 'light',
      icon: informationCircleOutline
    },
    success: {
      header: 'Success',
      color: 'success',
      icon: checkmarkCircleOutline
    },
    warning: {
      header: 'Warning',
      color: 'warning',
      icon: warningOutline
    },
    error: {
      header: 'Error',
      color: 'danger',
      icon: alertCircleOutline
    }
  };

  const options: ToastOptions = {
    header: typeLookupMap[toastType].header,
    message: toastMessage,
    animated: true,
    color: typeLookupMap[toastType].color,
    icon: typeLookupMap[toastType].icon,
    position: 'top',
    duration: 2000, // auto dismiss after 2s
    buttons: [
      {
        icon: closeCircleOutline,
        role: 'cancel',
        side: 'end'
      }
    ]
  };

  return options;
}

export function useToast() {
  function show(toastMessage: ToastMessage, toastType: ToastType) {
    toastController.create(getToastOpions(toastMessage, toastType)).then((controller) => {
      controller.present();
    });
  }

  return { show };
}
