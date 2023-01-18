import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchMorePokemons,
  fetchPokemons,
  fetchPokemonsError,
  fetchPokemonsSuccess,
  fetchPokemonsSuccessConcat,
  selectPokemonsNextUrl,
} from '../../views/home/redux/redux';
import { pokeApi } from '../axios';
import { PokemonResponse } from '../type';

const getPokemons = async (url: string) =>
  await pokeApi.get<PokemonResponse>(url);

function* fetchPokemonsSaga() {
  try {
    const response: Awaited<ReturnType<typeof getPokemons>> = yield call(
      getPokemons,
      'pokemon',
    );
    yield put(fetchPokemonsSuccess(response.data));
  } catch (e) {
    console.log(e);
    yield put(fetchPokemonsError());
  }
}

function* fetchMorePokemonsSaga() {
  try {
    const nextUrl: ReturnType<typeof selectPokemonsNextUrl> = yield select(
      selectPokemonsNextUrl,
    );
    if (!nextUrl) {
      return;
    }
    const response: Awaited<ReturnType<typeof getPokemons>> = yield call(
      getPokemons,
      nextUrl,
    );
    yield put(fetchPokemonsSuccessConcat(response.data));
  } catch (e) {
    console.log(e);
    yield put(fetchPokemonsError());
  }
}

function* pokemonsSaga() {
  yield all([
    takeLatest(fetchPokemons.type, fetchPokemonsSaga),
    takeLatest(fetchMorePokemons.type, fetchMorePokemonsSaga),
  ]);
}

export default pokemonsSaga;
