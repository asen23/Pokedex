import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailParams } from '../views/detail/Detail';
import { HomeParams } from '../views/home/Home';

export type RootStackParamList = {
  Home: HomeParams;
  Detail: DetailParams;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
