import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type Event = {
  name: string;
};

export interface NativeProps extends ViewProps {
  token: string;
  handleInsets: boolean;
  useDarkMode: boolean;
}

export default codegenNativeComponent<NativeProps>(
  'RTNPinwheel'
) as HostComponent<NativeProps>;
