import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackScreenProps } from '../../config/routeParam';
import HomeRow from './components/HomeRow';

type PokemonResponse = {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

export type HomeParams = undefined;

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const [data, setData] = useState<Pokemon[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const pokemonResponse: PokemonResponse = await response.json();
      setData(pokemonResponse.results);
    };
    getData();
  }, []);

  return (
    <>
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', {
                  url: item.url,
                })
              }
            >
              <HomeRow name={item.name} url={item.url} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.url}
        />
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
});

export default Home;
