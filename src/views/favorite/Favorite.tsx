import React from 'react';
import PokemonList from '../../components/PokemonList';
import { useAppSelector } from '../../config/redux/redux';
import { selectFavorites } from './redux';

export type FavoriteParams = undefined;

const Favorite = () => {
  const favorites = useAppSelector(selectFavorites);
  return (
    <>
      <PokemonList data={favorites} />
    </>
  );
};

export default Favorite;
