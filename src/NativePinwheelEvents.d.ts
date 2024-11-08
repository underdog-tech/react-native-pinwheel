import { TurboModule, EmitterSubscription } from "react-native";
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
export interface Spec extends TurboModule {
    setListener(): void;
    removeListener(): void;
    addListener(eventName: string): void;
    removeListeners(count: Int32): void;
}
declare const PinwheelEventsTurboModule: Spec;
export default PinwheelEventsTurboModule;
declare const addListener: (callback: (event: any) => void) => EmitterSubscription;
declare const removeAllListeners: () => void;
export { addListener, removeAllListeners };
