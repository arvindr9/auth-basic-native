import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './components/LoginForm';

global.Buffer = global.Buffer || require('buffer').Buffer;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
