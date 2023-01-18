import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './redux';

interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggle } = themeSlice.actions;
export const useIsDarkTheme = () =>
  useSelector((state: RootState) => state.theme.isDarkTheme);
