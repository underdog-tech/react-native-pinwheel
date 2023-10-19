import React, { useEffect } from 'react';
import { requireNativeComponent, NativeEventEmitter, NativeModules } from 'react-native';

interface RNTPinwheelProps {
  token: string;
  style: any;
}

const RNTPinwheel = requireNativeComponent<RNTPinwheelProps>('RNTPinwheel');

const RNTPinwheelView = (props: RNTPinwheelProps) => {
  useEffect(() => {
    const { RNTPinwheelEvents } = NativeModules;
    const eventEmitter = new NativeEventEmitter(RNTPinwheelEvents);
    const eventListener = eventEmitter.addListener('MyEvent', (event) => {
      console.log(event); // Log the event data received from the native module
    });

    return () => {
      eventListener.remove(); // Remove the listener when the component unmounts
    };
  }, []); // The empty array causes this effect to only run on mount and unmount


  return <RNTPinwheel {...props} />;
}


export default RNTPinwheelView;
