import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Detail from './views/detail/Detail';
import Home from './views/home/Home';

const App = () => {
  const [detailUrl, setDetailUrl] = useState<string | null>(null);
  return (
    <SafeAreaView style={styles.background}>
      {detailUrl ? (
        <Detail url={detailUrl} setDetailUrl={setDetailUrl} />
      ) : (
        <Home setDetailUrl={setDetailUrl} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
