import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Pokemon } from '../utility/hooks';
import HomeRow from '../views/home/components/HomeRow';

type PokemonListProps = {
  data: Pokemon[];
};

const PokemonList = ({ data }: PokemonListProps) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Detail', {
              pokemon: item,
            })
          }
        >
          <HomeRow name={item.name} url={item.url} />
        </TouchableOpacity>
      )}
      keyExtractor={item => item.url}
    />
  );
};

export default PokemonList;
