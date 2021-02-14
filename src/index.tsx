import React from 'react';
import {WebView} from 'react-native-webview';
import {Linking, Platform, SafeAreaView, StyleSheet} from 'react-native';
import { version } from '../package.json'

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

const LINK_PAGE_URL = 'https://cdn.getpinwheel.com/link-v3.0.0-beta.html';
const PINWHEEL_DOMAIN = 'getpinwheel.com';

export type LinkResult = {
  accountId: string;
  job: string;
  params: {
    amount?: { value: number; unit: '%' | '$' };
  };
};

export type ErrorType =
  | 'clientError'
  | 'systemError'
  | 'userActionRequired'
  | 'platformError'
  | 'invalidAccountsConfiguration'
  | 'invalidUserInput'
  | 'invalidLinkToken';

export type Error = {
  type: ErrorType;
  code: string;
  message: string;
};

type PinwheelProps = {
  linkToken: string,
  onLogin?: (result: { accountId: string }) => void;
  onSuccess?: (result: LinkResult) => void;
  onError?: (error: Error) => void;
  onExit?: (error?: Error) => void;
  onEvent?: (eventName: string, payload: object) => void;
}

type NativeEvent = {
  data: string
}

type WebViewEvent = {
  nativeEvent: NativeEvent 
}

export default ({linkToken, onLogin, onSuccess, onError, onExit, onEvent}: PinwheelProps) => {

  const handleEvent = (event: WebViewEvent) => {
    if (!event) {
      // first event is always an empty string
      return;
    }
    let eventData;
    try {
      eventData = JSON.parse(event.nativeEvent.data);
    } catch(error) {
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
        case 'error':
          onError && onError(payload);
          break;
        default:
      }
    }
  }
  const now = Date.now();
  const [major, minor, patch] = version.split('.').map(x => Number(x));
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
