import React, {useEffect, useRef} from 'react';
import {
    UIManager,
    findNodeHandle,
    NativeEventEmitter, 
    NativeModules
} from 'react-native';

import { RNTPinwheel, RNTPinwheelProps } from './pinwheel-view';


const createFragment = (viewId: number) => {
    console.log("Dispatching the create command for viewId:", viewId);
    // @ts-ignore
    console.log(`UIManager.RNTPinwheel: ${JSON.stringify(UIManager.RNTPinwheel, null, 2)}`)
    UIManager.dispatchViewManagerCommand(
        viewId,
        // we are calling the 'create' command
        // @ts-ignore
        UIManager.RNTPinwheel.Commands.create.toString(),
        [viewId],
        );
    }
    
    const RNTPinwheelView = (props: RNTPinwheelProps) => {
        const ref = useRef(null);
        useEffect(() => {
            setTimeout(() => {
                const viewId = findNodeHandle(ref.current);
                console.log(`viewId: ${viewId}`)
                if (viewId) {
                    createFragment(viewId);
                }

                // events
                const { RNTPinwheelEvents } = NativeModules;
                console.log(`RNTPinwheelEvents: ${JSON.stringify(RNTPinwheelEvents, null, 2)}`);
                const eventEmitter = new NativeEventEmitter(RNTPinwheelEvents);
                const eventListener = eventEmitter.addListener('PINWHEEL_EVENT', (event) => {
                    console.log(`rawbee: ${JSON.stringify(event, null, 2)}`);
                    // props.onEvent(`rawbee: ${JSON.stringify(event)}`);
                });
            }, 10);
        }, []);
        
        return <RNTPinwheel {...props} onEvent={(event) => {console.log`rawbee: ${JSON.stringify(event)}`}} ref={ref} />;
    }
    
    export default RNTPinwheelView;