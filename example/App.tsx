/* eslint-disable @typescript-eslint/no-shadow */
/**
 * Pinwheel React Native SDK Example
 * @format
 */

import React, {useRef, useState} from 'react';
import PinwheelLink from '@pinwheel/react-native-pinwheel';
import {Text, View, StyleSheet, Button} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import API_SECRET from './env';
import {TokenParams} from './types';
import TokenParamsView from './components/TokenParamsView';
import useFetch from './hooks/useFetch';
import EventListView from './components/EventListView';

if (!API_SECRET) {
  throw new Error('Please add your sandbox api secret to example/env.js');
}

type TokenViewProps = TokenParams & {
  onComplete: () => void;
};

const TokenView: React.FC<TokenViewProps> = ({
  account_number,
  account_type,
  job,
  mode,
  org_name,
  routing_number,
  skip_exit_survey,
  skip_intro_screen,
  onComplete,
}) => {
  const events = useRef([]);
  const [isPinwheelOpen, setIsPinwheelOpen] = useState(true);

  const onEvent = (eventName: string, payload: any) => {
    console.log(`name: ${eventName}, payload: ${JSON.stringify(payload)}`);
    // @ts-ignore
    events.current.push({eventName, payload});
  };
  const onExit = (error: any) => {
    console.log('onExit', error);
    setIsPinwheelOpen(false);
  };
  const onSuccess = (result: any) => {
    console.log('onSuccess', result);
  };
  const onLogin = (result: any) => {
    console.log('onLogin', result);
  };
  const onLoginAttempt = (result: any) => {
    console.log('onLoginAttempt', result);
  };
  const onError = (result: any) => {
    console.log('onError', result);
  };

  const apiResponse = useFetch(
    'https://sandbox.getpinwheel.com/v1/link_tokens',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-SECRET': API_SECRET,
      },
      body: JSON.stringify({
        account_number,
        account_type,
        job,
        mode,
        org_name,
        routing_number,
        skip_exit_survey,
        skip_intro_screen,
      }),
    },
  );

  const {error, response} = apiResponse;

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text>Error:</Text>
        <Text>error</Text>
      </View>
    );
  }

  if (!response?.data?.token) {
    return (
      <View style={styles.centeredView}>
        <Text>Loading Token…</Text>
      </View>
    );
  }

  if (!isPinwheelOpen) {
    return (
      <>
        <EventListView events={events.current} />
        <Button title={'Link Again'} onPress={() => onComplete()} />
      </>
    );
  }

  return (
    <PinwheelLink
      linkToken={response.data.token}
      onSuccess={onSuccess}
      onExit={onExit}
      onEvent={onEvent}
      onLogin={onLogin}
      onLoginAttempt={onLoginAttempt}
      onError={onError}
    />
  );
};

const App = () => {
  const [tokenParams, setTokenParams] = useState<TokenParams | null>(null);

  const handleTokenParamsSubmit = (tokenParams: TokenParams) => {
    setTokenParams(tokenParams);
  };

  const onComplete = () => {
    setTokenParams(null);
  };

  if (tokenParams) {
    return <TokenView {...tokenParams} onComplete={onComplete} />;
  }

  return (
    <View style={styles.centeredView}>
      <TokenParamsView onSubmit={handleTokenParamsSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
