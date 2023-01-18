import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

type HomeProps = {
  setDetailUrl: (id: string) => void;
};

const Home = ({ setDetailUrl }: HomeProps) => {
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setDetailUrl(item.url)}>
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
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
