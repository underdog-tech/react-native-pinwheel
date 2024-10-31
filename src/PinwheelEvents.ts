import {EmitterSubscription, Platform} from 'react-native';
import {
  addListener,
  removeAllListeners,
} from './NativePinwheelEvents';


export const PinwheelEvents = {
  addListener(callback: (events: any) => void): EmitterSubscription {
    return addListener(callback);
  },

  /**
   * (iOS and Android Only)
   * Removes all previously registered listeners and turns off notifications on the native side.
   * ```javascript
   * Clipboard.removeAllListeners();
   * ```
   */
  removeAllListeners() {
    removeAllListeners();
  },
};
