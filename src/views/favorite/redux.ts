import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../config/redux/redux';
import { Pokemon } from '../../utility/type';

interface FavoriteState {
  favorites: Pokemon[];
}

const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Pokemon>) => {
      state.favorites.push(action.payload);
    },
    remove: (state, action: PayloadAction<Pokemon>) => {
      state.favorites = state.favorites.filter(
        f => f.url !== action.payload.url,
      );
    },
  },
});

export const { add, remove } = favoriteSlice.actions;
export const selectFavorites = (state: RootState) => state.favorite.favorites;
