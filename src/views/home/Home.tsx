import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DarkTheme } from '../../App';
import Dark from '../../assets/Dark';
import Light from '../../assets/Light';
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
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
  setDetailUrl: (id: string) => void;
};

const Home = ({ setDarkTheme, setDetailUrl }: HomeProps) => {
  const [data, setData] = useState<Pokemon[] | null>(null);
  const isDarkTheme = useContext(DarkTheme);

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
      <View style={[styles.header, isDarkTheme ? styles.headerDark : {}]}>
        <Text style={[styles.headerText, isDarkTheme ? styles.textDark : {}]}>
          Home
        </Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => setDarkTheme(v => !v)}>
            {isDarkTheme ? <Dark /> : <Light />}
          </TouchableOpacity>
        </View>
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
