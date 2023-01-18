import React, { createContext, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Detail from './views/detail/Detail';
import Home from './views/home/Home';

export const DarkTheme = createContext(false);

const App = () => {
  const [detailUrl, setDetailUrl] = useState<string | null>(null);
  const [isDarkTheme, setDarkTheme] = useState(false);
  return (
    <DarkTheme.Provider value={isDarkTheme}>
      <SafeAreaView
        style={[styles.background, isDarkTheme ? styles.backgroundDark : {}]}
      >
        {detailUrl ? (
          <Detail url={detailUrl} setDetailUrl={setDetailUrl} />
        ) : (
          <Home setDetailUrl={setDetailUrl} setDarkTheme={setDarkTheme} />
        )}
      </SafeAreaView>
    </DarkTheme.Provider>
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
