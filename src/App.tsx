import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import PokeGuess from 'pokeguess';
import React, { createContext } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootStackParamList } from './config/navigation/routeParam';
import { persistor, store } from './config/redux/redux';
import { useIsDarkTheme } from './config/redux/theme';
import Detail from './views/detail/Detail';
import Favorite from './views/favorite/Favorite';
import Home from './views/home/Home';

export const DarkTheme = createContext(false);
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Providers = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const isDarkTheme = useIsDarkTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? 'gray' : undefined,
        },
        headerTitleStyle: {
          color: isDarkTheme ? 'white' : undefined,
        },
        headerTintColor: isDarkTheme ? 'white' : undefined,
        contentStyle: [
          styles.background,
          isDarkTheme ? styles.backgroundDark : {},
        ],
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="PokeGuess" component={PokeGuess} />
    </Stack.Navigator>
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

export default Providers;
