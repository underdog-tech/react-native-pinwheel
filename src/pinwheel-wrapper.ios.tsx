import React, { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

import { RNTPinwheel, RNTPinwheelProps } from './pinwheel-view';

const RNTPinwheelView = (props: RNTPinwheelProps) => {
  useEffect(() => {
    const { RNTPinwheelEvents } = NativeModules;
    const eventEmitter = new NativeEventEmitter(RNTPinwheelEvents);
    const eventListener = eventEmitter.addListener('PINWHEEL_EVENT', (event) => {
      props.onEvent(event);
    });

    return () => {
      eventListener.remove(); 
    };
  }, []);


  return <RNTPinwheel {...props} />;
}


export default RNTPinwheelView;
