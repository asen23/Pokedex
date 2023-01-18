import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DarkTheme } from '../../App';
import ArrowLeft from '../../assets/ArrowLeft';
import DetailRow from './components/DetailRow';

interface PokemonDetail {
  abilities: Ability[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  species: Species;
  sprites: Sprites;
  types: Type[];
  weight: number;
}

interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
}

interface Type {
  slot: number;
  type: Species;
}

type DetailProps = {
  url: string;
  setDetailUrl: (url: string | null) => void;
};

const Detail = ({ url, setDetailUrl }: DetailProps) => {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const isDarkTheme = useContext(DarkTheme);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const pokemonResponse: PokemonDetail = await response.json();
      setData(pokemonResponse);
    };
    getData();
  }, [url]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setDetailUrl(null);
        return true;
      },
    );

    () => subscription.remove();
  }, [setDetailUrl]);

  return (
    <>
      <View style={[styles.header, isDarkTheme ? styles.headerDark : {}]}>
        <TouchableOpacity onPress={() => setDetailUrl(null)}>
          <ArrowLeft
            style={styles.arrow}
            fill={isDarkTheme ? 'white' : undefined}
          />
        </TouchableOpacity>
        <Text
          style={[styles.headerText, isDarkTheme ? styles.headerTextDark : {}]}
        >
          Detail
        </Text>
      </View>
      {data ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={{
              height: Dimensions.get('screen').width,
              width: Dimensions.get('screen').width,
            }}
            source={{
              uri: data.sprites.front_default,
            }}
          />
          <View style={styles.typeContainer}>
            {data.types
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
            <DetailRow title="Name" description={data.name} />
            <View style={styles.separator} />
            <DetailRow title="Species" description={data.species.name} />
            <View style={styles.separator} />
            <DetailRow title="Height" description={`${data.height}`} />
            <View style={styles.separator} />
            <DetailRow title="Weight" description={`${data.weight}`} />
            <View style={styles.separator} />
            <DetailRow
              title="BaseExperience"
              description={`${data.base_experience}`}
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
            {data.abilities.map(ability => (
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
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
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
