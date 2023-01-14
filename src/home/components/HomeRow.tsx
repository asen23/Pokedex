import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type HomeRowProps = {
  name: string;
};

const HomeRow = ({ name }: HomeRowProps) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Text style={styles.cardText}>{name}</Text>
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
