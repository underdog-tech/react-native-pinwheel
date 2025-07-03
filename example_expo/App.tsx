import Pinwheel from '@pinwheel/react-native-pinwheel';
import { StyleSheet, View } from 'react-native';

const token = ''; // existing token

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
