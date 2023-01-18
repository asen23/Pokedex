import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { DarkTheme } from '../../../App';

type PokemonDetail = {
  sprites: Sprite;
};

type Sprite = {
  front_default: string;
};

type HomeRowProps = {
  name: string;
  url: string;
};

const HomeRow = ({ name, url }: HomeRowProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const isDarkTheme = useContext(DarkTheme);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const pokemonResponse: PokemonDetail = await response.json();
      setImageUrl(pokemonResponse.sprites.front_default);
    };
    getData();
  }, [url]);
  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image
          style={styles.tinyLogo}
          source={{
            uri: imageUrl,
          }}
        />
      ) : (
        <ActivityIndicator style={styles.tinyLogo} />
      )}
      <Text style={[styles.cardText, isDarkTheme ? styles.textDark : {}]}>
        {name}
      </Text>
    </View>
  );
};

export default HomeRow;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    textTransform: 'capitalize',
    marginLeft: 16,
  },
  textDark: {
    color: 'white',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
