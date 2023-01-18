import { all, fork } from 'redux-saga/effects';
import pokemonSaga from '../../utility/saga/pokemonSaga';
import pokemonsSaga from '../../utility/saga/pokemonsSaga';

export default function* rootSaga() {
  yield all([fork(pokemonsSaga), fork(pokemonSaga)]);
}
