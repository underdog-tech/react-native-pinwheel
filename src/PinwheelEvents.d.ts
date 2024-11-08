import { EmitterSubscription } from 'react-native';
export declare const PinwheelEvents: {
    addListener(callback: (events: any) => void): EmitterSubscription;
    /**
     * (iOS and Android Only)
     * Removes all previously registered listeners and turns off notifications on the native side.
     * ```javascript
     * Clipboard.removeAllListeners();
     * ```
     */
    removeAllListeners(): void;
};
