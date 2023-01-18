import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Detail from './views/detail/Detail';
import Home from './views/home/Home';

const App = () => {
  const [detailUrl, setDetailUrl] = useState<string | null>(null);
  const [isDarkTheme, setDarkTheme] = useState(false);
  return (
    <SafeAreaView
      style={[styles.background, isDarkTheme ? styles.backgroundDark : {}]}
    >
      {detailUrl ? (
        <Detail
          url={detailUrl}
          setDetailUrl={setDetailUrl}
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <Home
          setDetailUrl={setDetailUrl}
          isDarkTheme={isDarkTheme}
          setDarkTheme={setDarkTheme}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundDark: {
    backgroundColor: 'black',
  },
});

export default App;
