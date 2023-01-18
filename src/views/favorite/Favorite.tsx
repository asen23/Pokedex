import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PokemonList from '../../components/PokemonList';
import { RootStackScreenProps } from '../../config/navigation/routeParam';
import { useAppSelector } from '../../config/redux/redux';
import { pokeApi } from '../../utility/axios';
import { PokemonDetail } from '../../utility/hooks';
import { selectFavorites } from './redux';

export type FavoriteParams = undefined;

const Favorite = ({ navigation }: RootStackScreenProps<'Favorite'>) => {
  const favorites = useAppSelector(selectFavorites);

  const HeaderRight = useMemo(
    () => (
      <TouchableOpacity
        onPress={async () => {
          const random =
            favorites[Math.round(Math.random() * (favorites.length - 1))];
          try {
            const response = await pokeApi.get<PokemonDetail>(random.url);
            navigation.navigate('PokeGuess', {
              name: random.name,
              url: response.data.sprites.front_default,
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Text style={styles.randomIcon}>?</Text>
      </TouchableOpacity>
    ),
    [navigation, favorites],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => HeaderRight,
    });
  }, [HeaderRight, navigation]);

  return (
    <>
      <PokemonList data={favorites} />
    </>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  randomIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
