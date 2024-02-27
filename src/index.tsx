import React from 'react';
// @ts-ignore-next-line
import Pinwheel from './pinwheel-wrapper';
import {SafeAreaView, StyleSheet} from 'react-native';
import { LinkOptions } from './client-events/client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PinwheelProps = {} & LinkOptions

export default ({linkToken, onLogin, onLoginAttempt, onSuccess, onError, onExit, onEvent}: PinwheelProps) => {
  const handleEvent = (event: any) => {
    if (!event) {
      // first event is always an empty string
      return;
    }

    const { name, payload } = event;
    // Our Android SDK, since the beginning, has been firing events with upper case.
    // Since we are now wrapping the Android SDK to create the RN SDK, we need to reconcile
    // the event names here.
    const normalizedName = name.toLowerCase()
    onEvent && onEvent(normalizedName, payload);

    switch (normalizedName) {
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
