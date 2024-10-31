import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import Pinwheel from "@pinwheel/react-native-pinwheel"

const token = ''

export default function App() {
  return (
    // TODO: does not render if wrapped in a view
    // <View style={styles.container}>
      <Pinwheel linkToken={token}></Pinwheel>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
