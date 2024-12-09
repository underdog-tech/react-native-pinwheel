import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pinwheel from '@pinwheel/react-native-pinwheel';

const token = ''; // existing token

export default function App(): JSX.Element {
  const handleEvent = (event: string, data: any): void => {
    console.log(event, data);
  };

  return (
    <View
      style={
        StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
          },
        }).container
      }
    >
      <Pinwheel linkToken={token} onEvent={handleEvent}></Pinwheel>
    </View>
  );
}
