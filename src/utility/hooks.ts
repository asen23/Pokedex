import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../config/redux/redux';
import {
  fetchPokemon,
  selectPokemonDetail,
  selectPokemonError,
  selectPokemonLoading,
} from '../views/detail/redux/redux';
import {
  fetchMorePokemons,
  fetchPokemons,
  selectPokemons,
  selectPokemonsError,
  selectPokemonsLoading,
  selectPokemonsMoreLoading,
} from '../views/home/redux/redux';
import { useApi } from './axios';
import { PokemonDetail } from './type';

export const usePokemons = () => {
  const pokemons = useSelector(selectPokemons);
  const loading = useSelector(selectPokemonsLoading);
  const moreLoading = useSelector(selectPokemonsMoreLoading);
  const error = useSelector(selectPokemonsError);
  const dispatch = useAppDispatch();
  const fetchMore = () => dispatch(fetchMorePokemons());

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return { error, loading, moreLoading, pokemons, fetchMore };
};

export const usePokemonDetail = (url: string) => {
  const detail = useSelector(selectPokemonDetail);
  const loading = useSelector(selectPokemonLoading);
  const error = useSelector(selectPokemonError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemon(url));
  }, [dispatch, url]);

  return { error, loading, detail };
};

export const usePokemonSprite = (url: string) => {
  const { error, loading, data } = useApi<PokemonDetail>(url);

  return { error, loading, sprite: data?.sprites.front_default };
};
