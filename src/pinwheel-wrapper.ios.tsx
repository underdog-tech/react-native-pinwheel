import React, { useEffect } from 'react';
import { requireNativeComponent, NativeEventEmitter, NativeModules } from 'react-native';

export interface RNTPinwheelProps {
  token: string;
  style: any;
  onEvent: (event: any) => void;
}

export const RNTPinwheel = requireNativeComponent<RNTPinwheelProps>('RNTPinwheel');

const RNTPinwheelView = (props: RNTPinwheelProps) => {
  useEffect(() => {
    const { RNTPinwheelEvents } = NativeModules;
    const eventEmitter = new NativeEventEmitter(RNTPinwheelEvents);
    const eventListener = eventEmitter.addListener('PINWHEEL_EVENT', (event) => {
      props.onEvent(event);
    });

    return () => {
      eventListener.remove(); // Remove the listener when the component unmounts
    };
  }, []); // The empty array causes this effect to only run on mount and unmount


  return <RNTPinwheel {...props} />;
}


export default RNTPinwheelView;
