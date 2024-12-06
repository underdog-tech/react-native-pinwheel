import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
export interface NativeProps extends ViewProps {
    token: string;
    handleInsets: boolean;
}
declare const _default: HostComponent<NativeProps>;
export default _default;
