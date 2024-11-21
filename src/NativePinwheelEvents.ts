import {
  TurboModule,
  TurboModuleRegistry,
  EmitterSubscription,
  NativeEventEmitter,
} from "react-native";
import type {Int32} from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  setListener(): void;
  removeListener(): void;
  addListener(eventName: string): void;
  removeListeners(count: Int32): void;
}

const PinwheelEventsTurboModule = TurboModuleRegistry.getEnforcing<Spec>("RTNPinwheelEvents");
export default PinwheelEventsTurboModule;

const EVENT_NAME = 'PINWHEEL_EVENT';
const eventEmitter = new NativeEventEmitter(PinwheelEventsTurboModule);

let listenerCount = eventEmitter.listenerCount;

// listenerCount is only available from RN 0.64
// Older versions only have `listeners`
if (!listenerCount) {
  listenerCount = (eventType: string) => {
    // @ts-ignore
    return eventEmitter.listeners(eventType).length;
  };
} else {
  listenerCount = eventEmitter.listenerCount.bind(eventEmitter);
}

const addListener = (callback: (event: any) => void): EmitterSubscription => {
  if (listenerCount(EVENT_NAME) === 0) {
    PinwheelEventsTurboModule.setListener();
  }

  let res = eventEmitter.addListener(EVENT_NAME, callback);

  // Path the remove call to also remove the native listener
  // if we no longer have listeners
  // @ts-ignore
  res._remove = res.remove;
  res.remove = function () {
    // @ts-ignore
    this._remove();
    if (listenerCount(EVENT_NAME) === 0) {
      PinwheelEventsTurboModule.removeListener();
    }
  };

  return res;
};

const removeAllListeners = () => {
  eventEmitter.removeAllListeners(EVENT_NAME);
  PinwheelEventsTurboModule.removeListener();
};

export {addListener, removeAllListeners};
