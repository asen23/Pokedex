import React, { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
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
import { usePokemons } from '../../utility/hooks';

export type HomeParams = undefined;

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const { loading, moreLoading, error, pokemons, fetchMore } = usePokemons();
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
    navigation.setOptions({
      headerRight: () => HeaderRight,
    });
  }, [navigation, HeaderRight]);

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text>An error has occurred. Please try again</Text>
        </View>
      ) : (
        pokemons && (
          <PokemonList
            data={pokemons}
            onEndReached={() => fetchMore()}
            loading={moreLoading}
          />
        )
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
