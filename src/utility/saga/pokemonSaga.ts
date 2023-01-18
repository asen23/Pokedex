import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPokemon,
  fetchPokemonError,
  fetchPokemonSuccess,
} from '../../views/detail/redux/redux';
import { pokeApi } from '../axios';
import { PokemonDetail } from '../type';

const getPokemon = async (url: string) => await pokeApi.get<PokemonDetail>(url);

function* fetchPokemonSaga(action: PayloadAction<string>) {
  try {
    const response: Awaited<ReturnType<typeof getPokemon>> = yield call(
      getPokemon,
      action.payload,
    );
    yield put(fetchPokemonSuccess(response.data));
  } catch (e) {
    console.log(e);
    yield put(fetchPokemonError());
  }
}

function* pokemonSaga() {
  yield all([takeLatest(fetchPokemon.type, fetchPokemonSaga)]);
}

export default pokemonSaga;
