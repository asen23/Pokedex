import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../config/redux/redux';
import { Pokemon, PokemonResponse } from '../../../utility/type';

interface HomeState {
  loading: boolean;
  moreLoading: boolean;
  pokemons: Pokemon[];
  nextUrl: string | undefined;
  error: boolean;
}

const initialState: HomeState = {
  loading: false,
  moreLoading: false,
  pokemons: [],
  nextUrl: undefined,
  error: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchPokemons: state => {
      state.loading = true;
    },
    fetchMorePokemons: state => {
      state.moreLoading = true;
    },
    fetchPokemonsSuccess: (state, action: PayloadAction<PokemonResponse>) => {
      state.pokemons = action.payload.results;
      state.loading = false;
      state.nextUrl = action.payload.next;
    },
    fetchPokemonsSuccessConcat: (
      state,
      action: PayloadAction<PokemonResponse>,
    ) => {
      state.pokemons = state.pokemons.concat(action.payload.results);
      state.moreLoading = false;
      state.nextUrl = action.payload.next;
    },
    fetchPokemonsError: state => {
      if (state.moreLoading) {
        state.moreLoading = false;
        return;
      }
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  fetchPokemons,
  fetchMorePokemons,
  fetchPokemonsSuccess,
  fetchPokemonsSuccessConcat,
  fetchPokemonsError,
} = homeSlice.actions;
export const selectPokemons = (state: RootState) => state.home.pokemons;
export const selectPokemonsLoading = (state: RootState) => state.home.loading;
export const selectPokemonsMoreLoading = (state: RootState) =>
  state.home.moreLoading;
export const selectPokemonsError = (state: RootState) => state.home.error;
export const selectPokemonsNextUrl = (state: RootState) => state.home.nextUrl;
