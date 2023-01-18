import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { useIsDarkTheme } from '../../../config/redux/theme';
import { usePokemonSprite } from '../../../utility/hooks';

type HomeRowProps = {
  name: string;
  url: string;
};

const HomeRow = ({ name, url }: HomeRowProps) => {
  const { loading, error, sprite } = usePokemonSprite(url);
  const isDarkTheme = useIsDarkTheme();

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator style={styles.tinyLogo} />
      ) : error ? (
        <Text>An error has occurred</Text>
      ) : (
        sprite && (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: sprite,
            }}
          />
        )
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
