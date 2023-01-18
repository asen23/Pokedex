import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { detailSlice } from '../../views/detail/redux/redux';
import { favoriteSlice } from '../../views/favorite/redux';
import { homeSlice } from '../../views/home/redux/redux';
import rootSaga from '../saga/saga';
import { themeSlice } from './theme';

const rootReducer = combineReducers({
  favorite: favoriteSlice.reducer,
  theme: themeSlice.reducer,
  home: homeSlice.reducer,
  detail: detailSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
