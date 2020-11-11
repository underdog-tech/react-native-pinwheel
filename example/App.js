/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import PinwheelLink from 'react-native-pinwheel';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Use your API secret here to see the demo work
// DO NOT DO THIS IN YOUR SHIPPING APP
// Your server should retrieve the link token from the
// Pinwheel server, and you should be retrieving the link
// token from your server.
// https://docs.getpinwheel.com/#api-secrets
const API_SECRET = "";

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return {response, error, isLoading};
};

const FieldView = ({ label, value, onChange}) => {
  return (
    <View style={{marginBottom: 10}}>
      <Text>{label}</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChange(text)}
        value={value}
      />
    </View>);
}

const TokenParamsView = ({ onSubmit }) => {
  const [account_number, setAccountNumber] = useState('304119574487');
  const [account_type, setAccountType] = useState('checking');
  const [job, setJob] = useState('direct_deposit_switch');
  const [mode, setMode] = useState('sandbox');
  const [org_name, setOrgName] = useState('Iron Bank of Braavos');
  const [routing_number, setRoutingNumber] = useState('091302966');
  const [skip_exit_survey, setSkipExitSurvey] = useState("false");
  const [skip_intro_screen, setSkipIntroScreen] = useState("false");

  return (
    <SafeAreaView>
      <FieldView label={"account_view"} value={account_number} onChange={setAccountNumber}/>
      <FieldView label={"account_type"} value={account_type} onChange={setAccountType}/>
      <FieldView label={"job"} value={job} onChange={setJob}/>
      <FieldView label={"mode"} value={mode} onChange={setMode}/>
      <FieldView label={"org_name"} value={org_name} onChange={setOrgName}/>
      <FieldView label={"routing_number"} value={routing_number} onChange={setRoutingNumber}/>
      <FieldView label={"skip_exit_survey"} value={skip_exit_survey} onChange={setSkipExitSurvey}/>
      <FieldView label={"skip_intro_screen"} value={skip_intro_screen} onChange={setSkipIntroScreen}/>
      <Button
        title={'Fetch Token'}
        onPress={() => onSubmit({ 
          account_number, 
          account_type,
          job,
          mode,
          org_name,
          routing_number,
          skip_exit_survey: skip_exit_survey === "true",
          skip_intro_screen: skip_intro_screen === "true"
        })}></Button>
    </SafeAreaView>
  )
}

const TokenView = ({ 
  account_number, 
  account_type,
  job,
  mode,
  org_name,
  routing_number,
  skip_exit_survey,
  skip_intro_screen,
  onComplete
}) => {
  const events = useRef([]);
  const [isPinwheelOpen, setIsPinwheelOpen] = useState(true);

  const onEvent = (event) => {
    if (!event) {
      return; // the first event is an empty string
    }
    events.current.push(event);
    console.log(JSON.stringify(events, null, 2));
  };
  const onExit = (event) => {
    setIsPinwheelOpen(false);
  }
  const onSuccess = (event) => {
    setIsPinwheelOpen(false);
    console.log('SUCCESS');
  }

  const apiResponse = useFetch('https://sandbox.getpinwheel.com/v1/link/tokens', {
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
  });

  console.log('tokenResponse: ', apiResponse);

  const { error, response } = apiResponse;
  if (error) {
    <View style={styles.centeredView}>
      <Text>Error:</Text>
      <Text>error</Text>
    </View>
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
      <Button
        title={'Link Again'}
        onPress={() => onComplete()}></Button>
      </>);
  }

  return (
    <PinwheelLink
      linkToken={response.data.token}
      onSuccess={onSuccess}
      onExit={onExit}
      onEvent={onEvent}
    />
  );
};

const App = () => {
  const [tokenParams, setTokenParams] = useState();

  const handleTokenParamsSubmit = (tokenParams) => {
    setTokenParams(tokenParams);
  }
  const onComplete = () => {
    setTokenParams();
  }
  if (tokenParams) {
    return <TokenView {...tokenParams} onComplete={onComplete} />;
  }
  return (
    <View style={styles.centeredView}>
      <TokenParamsView onSubmit={handleTokenParamsSubmit} />
    </View>
  );
};

const EventListView = ({events}) => {
  return (
    <SafeAreaView>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index + '-' + item.type}
        renderItem={({item, index}) => {
          return (
            <View style={{backgroundColor: 'white'}}>
              <Text>
                {item.type} | {item.name}
              </Text>
            </View>
          );
        }}></FlatList>
    </SafeAreaView>
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
