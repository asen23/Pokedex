import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './home/Home';

const App = () => {
  return (
    <SafeAreaView style={styles.background}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
