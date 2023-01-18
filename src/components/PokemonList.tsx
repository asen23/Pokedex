import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Pokemon } from '../utility/type';
import HomeRow from '../views/home/components/HomeRow';

type PokemonListProps = {
  data: Pokemon[];
  loading?: boolean;
  onEndReached?: () => void;
};

const PokemonList = ({ data, onEndReached, loading }: PokemonListProps) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
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
