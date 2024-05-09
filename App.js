import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './Navigation/AppNavigator';
import DialpadScreen from './Screen/DialpadScreen';
import ContactScreen from './Screen/ContactScreen';
import CallHistoryScreen from './Screen/CallHistoryScreen';
import CallScreen from './Screen/CallScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CallScreen/>
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
