import React from 'react';
import {WebView} from 'react-native-webview';
import {Linking, Platform, SafeAreaView, StyleSheet} from 'react-native';
import { LINK_PAGE_URL, PINWHEEL_DOMAIN, VERSION } from './constants';

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

  const handleEvent = (event: WebViewEvent) => {
    if (!event) {
      // first event is always an empty string
      return;
    }
    let eventData;
    try {
      eventData = JSON.parse(event.nativeEvent.data);
    } catch(_error) {
      let error: PinwheelError = (_error as PinwheelError);
      console.error(error);
      onExit && onExit(error);
      onError && onError(error);
      onEvent && onEvent('error', error);
      return;
    }

    const { type, eventName, payload } = eventData;

    if (type === 'PINWHEEL_EVENT') {
      onEvent && onEvent(eventName, payload);

      switch (eventName) {
        case 'exit':
          onExit && onExit(payload);
          break;
        case 'success':
          onSuccess && onSuccess(payload);
          break;
        case 'login':
          onLogin && onLogin(payload);
          break;
        case 'login_attempt':
          onLoginAttempt && onLoginAttempt(payload);
          break;
        case 'error':
          onError && onError(payload);
          break;
        default:
      }
    }
  }
  const now = Date.now();
  const [major, minor, patch] = VERSION.split('.').map(x => Number(x));
  const runFirst = `
      const uuidKey = 'pinwheel-uuid';
      const localStorage = window.localStorage;
      let uuid = localStorage.getItem(uuidKey);
      if(!uuid) {
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
        localStorage.setItem(uuidKey, uuid);
      }
      try {
        window.addEventListener('message', event => {
          window.ReactNativeWebView.postMessage(JSON.stringify(event.data))
        });
        window.postMessage(
          { 
            type: 'PINWHEEL_INIT', 
            payload: { 
              platform: "${Platform.OS}",
              sdk: 'react native',
              version: {
                major: ${major},
                minor: ${minor},
                patch: ${patch}
              },
              initializationOptions: {
                hasOnSuccess: ${!!onSuccess},
                hasOnEvent: ${!!onEvent},
                hasOnExit: ${!!onExit},
                hasOnError: ${!!onError},
                hasOnLogin: ${!!onLogin},
              },
              linkToken: '${linkToken}', 
              uniqueUserId: uuid,
              initializationTimestamp: ${now}
            } 
          }
        );
      } catch (err) {
        console.error(err);
      }
      true;
    `;
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: LINK_PAGE_URL}}
        onMessage={handleEvent}
        injectedJavaScript={runFirst}
        onShouldStartLoadWithRequest={(request) => {
          const targetURL = request.url;
          const isLinkPage = targetURL.includes(PINWHEEL_DOMAIN);
          if (!isLinkPage) {
            Linking.canOpenURL(targetURL).then(supported => {
              if (supported) {
                  Linking.openURL(targetURL).then(() => {});
              } else {
                  console.warn('Don\'t know how to open URL: ' + targetURL);
              }
              return false
            }).catch(err => console.error('An error occurred ', err));
          }
          return isLinkPage;
        }}
      />
    </SafeAreaView>
  );
};
