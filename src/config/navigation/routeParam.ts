import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList as PokeGuessRootParamList } from 'pokeguess';
import { DetailParams } from '../../views/detail/Detail';
import { FavoriteParams } from '../../views/favorite/Favorite';
import { HomeParams } from '../../views/home/Home';

export type RootStackParamList = {
  Home: HomeParams;
  Detail: DetailParams;
  Favorite: FavoriteParams;
} & PokeGuessRootParamList;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
