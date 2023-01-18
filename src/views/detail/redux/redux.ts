import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../config/redux/redux';
import { PokemonDetail } from '../../../utility/type';

interface DetailState {
  loading: boolean;
  pokemon: PokemonDetail | null;
  error: boolean;
}

const initialState: DetailState = {
  loading: false,
  pokemon: null,
  error: false,
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchPokemon: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchPokemonSuccess: (state, action: PayloadAction<PokemonDetail>) => {
      state.pokemon = action.payload;
      state.loading = false;
    },
    fetchPokemonError: state => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { fetchPokemon, fetchPokemonSuccess, fetchPokemonError } =
  detailSlice.actions;
export const selectPokemonDetail = (state: RootState) => state.detail.pokemon;
export const selectPokemonLoading = (state: RootState) => state.detail.loading;
export const selectPokemonError = (state: RootState) => state.detail.error;
