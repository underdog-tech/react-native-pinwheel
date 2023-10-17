import React from 'react';
import { requireNativeComponent } from 'react-native';

interface RNTPinwheelProps {
  token: string;
  style: any;
}

const RNTPinwheel = requireNativeComponent<RNTPinwheelProps>('RNTPinwheel');


class RNTPinwheelView extends React.Component<RNTPinwheelProps> {
  render() {
    return <RNTPinwheel {...this.props} />;
  }
}

export default RNTPinwheelView;
