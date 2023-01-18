import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Dark from '../../assets/Dark';
import HeartOutline from '../../assets/HeartOutline';
import Light from '../../assets/Light';
import PokemonList from '../../components/PokemonList';
import { RootStackScreenProps } from '../../config/navigation/routeParam';
import { useAppDispatch } from '../../config/redux/redux';
import { toggle, useIsDarkTheme } from '../../config/redux/theme';

type PokemonResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};

export type HomeParams = undefined;

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const [data, setData] = useState<Pokemon[] | null>(null);
  const dispatch = useAppDispatch();
  const isDarkTheme = useIsDarkTheme();

  const HeaderRight = useMemo(
    () => (
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
          <HeartOutline fill={isDarkTheme ? 'white' : undefined} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(toggle())}
          style={styles.themeToggle}
        >
          {isDarkTheme ? <Dark /> : <Light />}
        </TouchableOpacity>
      </View>
    ),
    [dispatch, navigation, isDarkTheme],
  );

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const pokemonResponse: PokemonResponse = await response.json();
      setData(pokemonResponse.results);
    };
    getData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => HeaderRight,
    });
  }, [navigation, HeaderRight]);

  return (
    <>
      {data ? (
        <PokemonList data={data} />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDark: {
    borderColor: '#fff',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  textDark: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
  },
  themeToggle: {
    marginLeft: 8,
  },
});

export default Home;
