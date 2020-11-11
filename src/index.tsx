import React from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView, StyleSheet} from 'react-native';

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

type PinwheelProps = {
  linkToken: string,
  onSuccess: (event: Object) => void,
  onExit: (event: Object) => void,
  onEvent: (event: Object) => void
}

type NativeEvent = {
  data: string
}

type WebViewEvent = {
  nativeEvent: NativeEvent 
}

export default ({linkToken, onSuccess, onExit, onEvent}: PinwheelProps) => {

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
      onExit(error);
      return;
    }
    onEvent(eventData);
    switch (eventData.type) {
      case PINWHEEL_MESSAGE_TYPES.PINWHEEL_MODAL_CLOSE:
      case PINWHEEL_MESSAGE_TYPES.PINWHEEL_EXIT:
        onExit(eventData);
        break;
      case PINWHEEL_MESSAGE_TYPES.PINWHEEL_SUCCESS:
        onSuccess(eventData);

    }
  }
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
              fullScreen: true, 
              linkToken: '${linkToken}', 
              uniqueUserId: uuid
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
        source={{uri: 'https://cdn.getpinwheel.com/link-v2.html'}}
        onMessage={handleEvent}
        injectedJavaScript={runFirst}
      />
    </SafeAreaView>
  );
};
