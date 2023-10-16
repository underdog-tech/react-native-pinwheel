import { requireNativeComponent } from 'react-native';

interface RNTPinwheelProps {
  token: String;
  style: any;
}

const RNTPinwheel = requireNativeComponent<RNTPinwheelProps>('RNTPinwheel');

export default RNTPinwheel;