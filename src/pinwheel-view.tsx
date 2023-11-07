import {requireNativeComponent} from 'react-native';

export interface RNTPinwheelProps {
    token: string;
    style: any;
    onEvent: (event: any) => void;
}

export const RNTPinwheel = requireNativeComponent<RNTPinwheelProps>('RNTPinwheel');