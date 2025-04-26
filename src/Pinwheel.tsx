import React, { useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
const RTNPinwheel = require('./RTNPinwheelNativeComponent').default;
import { PinwheelEvents } from './PinwheelEvents';
import { LinkOptions } from './client-events/client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const Pinwheel = ({
  linkToken,
  onLogin,
  onLoginAttempt,
  onSuccess,
  onError,
  onExit,
  onEvent,
  handleInsets,
  useDarkMode,
}: LinkOptions & {
  handleInsets?: boolean;
  useDarkMode?: boolean;
}) => {
  const eventsListener = useCallback(
    (event: any) => {
      if (!event) {
        return;
      }

      const { name, payload } = event;
      if (!name) {
        return;
      }

      // Our Android SDK, since the beginning, has been firing events with upper case.
      // Since we are now wrapping the Android SDK to create the RN SDK, we need to reconcile
      // the event names here.
      const normalizedName = name.toLowerCase();
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
    },
    [onError, onEvent, onExit, onLogin, onLoginAttempt, onSuccess]
  );

  useEffect(() => {
    const listener = PinwheelEvents.addListener(eventsListener);

    return () => {
      listener.remove();
    };
  }, [eventsListener]);

  return (
    <SafeAreaView style={styles.container}>
      {linkToken && (
        <RTNPinwheel
          style={{ flex: 1 }}
          token={linkToken}
          handleInsets={handleInsets ?? true}
          useDarkMode={useDarkMode ?? false}
        />
      )}
    </SafeAreaView>
  );
};

export default Pinwheel;
