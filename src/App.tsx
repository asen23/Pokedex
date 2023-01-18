import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Dark from './assets/Dark';
import Light from './assets/Light';
import { RootStackParamList } from './config/routeParam';
import Detail from './views/detail/Detail';
import Home from './views/home/Home';

export const DarkTheme = createContext(false);
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const DarkThemeToggle = useMemo(
    () => (
      <TouchableOpacity onPress={() => setDarkTheme(v => !v)}>
        {isDarkTheme ? <Dark /> : <Light />}
      </TouchableOpacity>
    ),
    [isDarkTheme],
  );
  return (
    <DarkTheme.Provider value={isDarkTheme}>
      <NavigationContainer>
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
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => DarkThemeToggle,
            }}
          />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
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
