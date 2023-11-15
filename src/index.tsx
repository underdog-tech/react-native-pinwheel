import React from 'react';
// @ts-ignore-next-line
import Pinwheel from './pinwheel-wrapper';
import {SafeAreaView, StyleSheet} from 'react-native';
import { VERSION } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const PINWHEEL_MESSAGE_TYPES = {
  PINWHEEL_EXIT: 'PINWHEEL_EXIT',
  PINWHEEL_MODAL_CLOSE: 'PINWHEEL_MODAL_CLOSE',
  PINWHEEL_LOAD_COMPLETE: 'PINWHEEL_LOAD_COMPLETE',
  PINWHEEL_SUCCESS: 'PINWHEEL_SUCCESS',
  PINWHEEL_EVENT: 'PINWHEEL_EVENT',
};

export type LinkResult = {
  accountId: string;
  platformId: string;
  job: string;
  params: {
    amount?: { value: number; unit: '%' | '$' };
  };
};

export type ScreenTransition = {
  screenName: string;
  selectedEmployerId?: string;
  selectedEmployerName?: string;
  selectedPlatformId?: string;
  selectedPlatformName?: string;
}

/**
 * @deprecated This type will be removed in version 2.4. Use the renamed type `PinwheelErrorType`
 * instead.
 */
export type ErrorType =
  | 'clientError'
  | 'systemError'
  | 'userActionRequired'
  | 'platformError'
  | 'invalidAccountsConfiguration'
  | 'invalidUserInput'
  | 'invalidLinkToken';

export type PinwheelErrorType = ErrorType

/**
 * @deprecated The type should not be used as it clashes with the native JS `Error` object.
 * You should use `PinwheelError` instead. `Error` will be removed in version 2.4
 */
export type Error = {
  type: PinwheelErrorType;
  code: string;
  message: string;
  pendingRetry: boolean;
};

// Export `Error` as `PinwheelError` to avoid native `Error` namespace clash
export type PinwheelError = Error

export type EmptyPayloadObject = Record<string, never>

export type EventPayload =
  | { selectedEmployerId: string; selectedEmployerName: string }
  | { selectedPlatformId: string; selectedPlatformName: string }
  | { value: number; unit: '%' | '$' }
  | LinkResult
  | { accountId: string; platformId: string }
  | ScreenTransition
  | PinwheelError
  | EmptyPayloadObject
  | undefined

type PinwheelProps = {
  linkToken: string,
  onLogin?: (result: { accountId: string; platformId: string }) => void;
  onLoginAttempt?: (result: { platformId: string }) => void;
  onSuccess?: (result: LinkResult) => void;
  onError?: (error: PinwheelError) => void;
  onExit?: (error: PinwheelError | EmptyPayloadObject) => void;
  onEvent?: (eventName: string, payload: EventPayload) => void;
}

type NativeEvent = {
  data: string
}

type WebViewEvent = {
  nativeEvent: NativeEvent 
}

export default ({linkToken, onLogin, onLoginAttempt, onSuccess, onError, onExit, onEvent}: PinwheelProps) => {

  const handleEvent = (event: any) => {
    if (!event) {
      // first event is always an empty string
      return;
    }

    const { name, payload } = event;

    onEvent && onEvent(name, payload);

    switch (name.toLowerCase()) {
      case 'exit':
        // console.log(`case: exit, onExit: ${onExit}`);
        onExit && onExit(payload);
        break;
      case 'success':
        // console.log(`case: success, onSuccess: ${onSuccess}`);
        onSuccess && onSuccess(payload);
        break;
      case 'login':
        // console.log(`case: login, onLogin: ${onLogin}`);
        onLogin && onLogin(payload);
        break;
      case 'login_attempt':
        // console.log(`case: login_attempt, onLoginAttempt: ${onLoginAttempt}`);
        onLoginAttempt && onLoginAttempt(payload);
        break;
      case 'error':
        // console.log(`case: error, onError: ${onError}`);
        onError && onError(payload);
        break;
      default:
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {linkToken && <Pinwheel token={linkToken} style={{flex: 1}} onEvent={handleEvent} />}
    </SafeAreaView>
  );
};
