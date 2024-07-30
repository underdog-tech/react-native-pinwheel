import React, {useEffect, useRef} from 'react';
import {
    UIManager,
    findNodeHandle,
    NativeEventEmitter,
    NativeModules
} from 'react-native';

import {RNTPinwheel, RNTPinwheelProps} from './pinwheel-view';
import {EmitterSubscription} from "react-native/Libraries/vendor/emitter/EventEmitter";


const createFragment = (viewId: number) => {
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
    const eventListenerRef = useRef<EmitterSubscription | null>(null);
    useEffect(() => {
        setTimeout(() => {
            const viewId = findNodeHandle(ref.current);
            if (viewId) {
                createFragment(viewId);
            }

            // events
            const {RNTPinwheelEvents} = NativeModules;
            const eventEmitter = new NativeEventEmitter(RNTPinwheelEvents);
            eventListenerRef.current = eventEmitter.addListener('PINWHEEL_EVENT', (event) => {
                props.onEvent(event);
            });
        }, 10);

        return () => {
            eventListenerRef.current?.remove();
        }
    }, []);

    return <RNTPinwheel {...props} ref={ref}/>;
}

export default RNTPinwheelView;
