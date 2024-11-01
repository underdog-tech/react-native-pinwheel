import { StyleSheet, View } from 'react-native';

import Pinwheel from '@pinwheel/react-native-pinwheel';

const token = '';

export default function App() {
  return (
    <View style={styles.container}>
      <Pinwheel linkToken={token}></Pinwheel>
    </View>
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
