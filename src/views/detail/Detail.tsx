import React, { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeartFilled from '../../assets/HeartFilled';
import HeartOutline from '../../assets/HeartOutline';
import { RootStackScreenProps } from '../../config/navigation/routeParam';
import { useAppDispatch, useAppSelector } from '../../config/redux/redux';
import { useIsDarkTheme } from '../../config/redux/theme';
import { usePokemonDetail } from '../../utility/hooks';
import { Pokemon } from '../../utility/type';
import { add, remove, selectFavorites } from '../favorite/redux';
import DetailRow from './components/DetailRow';

export type DetailParams = {
  pokemon: Pokemon;
};

const Detail = ({
  route: {
    params: { pokemon },
  },
  navigation,
}: RootStackScreenProps<'Detail'>) => {
  const isDarkTheme = useIsDarkTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.filter(f => f.url === pokemon.url).length === 1;
  const { loading, error, detail } = usePokemonDetail(pokemon.url);

  const FavoriteButton = useMemo(
    () => (
      <TouchableOpacity
        onPress={() =>
          isFavorite ? dispatch(remove(pokemon)) : dispatch(add(pokemon))
        }
      >
        {isFavorite ? (
          <HeartFilled fill={isDarkTheme ? 'white' : undefined} />
        ) : (
          <HeartOutline fill={isDarkTheme ? 'white' : undefined} />
        )}
      </TouchableOpacity>
    ),
    [dispatch, isFavorite, pokemon, isDarkTheme],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => FavoriteButton,
    });
  }, [navigation, FavoriteButton]);

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text>An error has occurred. Please try again</Text>
        </View>
      ) : (
        detail && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              style={{
                height: Dimensions.get('screen').width,
                width: Dimensions.get('screen').width,
              }}
              source={{
                uri: detail.sprites.front_default,
              }}
            />
            <View style={styles.typeContainer}>
              {detail.types
                .map(type => type.type)
                .map(type => (
                  <View
                    style={[
                      styles.typePill,
                      isDarkTheme ? styles.typePillDark : {},
                    ]}
                    key={type.url}
                  >
                    <Text style={isDarkTheme ? styles.typePillTextDark : {}}>
                      {type.name}
                    </Text>
                  </View>
                ))}
            </View>
            <View style={styles.container}>
              <View style={styles.separator} />
              <DetailRow title="Name" description={detail.name} />
              <View style={styles.separator} />
              <DetailRow title="Species" description={detail.species.name} />
              <View style={styles.separator} />
              <DetailRow title="Height" description={`${detail.height}`} />
              <View style={styles.separator} />
              <DetailRow title="Weight" description={`${detail.weight}`} />
              <View style={styles.separator} />
              <DetailRow
                title="BaseExperience"
                description={`${detail.base_experience}`}
              />
              <View style={styles.separator} />
              <Text
                style={[
                  styles.abilityTitle,
                  isDarkTheme ? styles.abilityTitleDark : {},
                ]}
              >
                Abilities
              </Text>
              {detail.abilities.map(ability => (
                <View style={styles.abilityRow} key={ability.ability.url}>
                  <Text
                    style={[
                      styles.abilityText,
                      isDarkTheme ? styles.abilityTextDark : {},
                    ]}
                  >
                    ○ {ability.ability.name}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )
      )}
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDark: {
    borderColor: '#fff',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerTextDark: {
    color: 'white',
  },
  arrow: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  container: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: -8,
  },
  separatorDark: {
    backgroundColor: 'white',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  typePill: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 2,
    paddingHorizontal: 8,
    margin: 4,
  },
  typePillDark: {
    borderColor: 'white',
  },
  typePillTextDark: {
    color: 'white',
  },
  abilityTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  abilityTitleDark: {
    color: 'white',
  },
  abilityRow: {
    marginVertical: 4,
  },
  abilityText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  abilityTextDark: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
