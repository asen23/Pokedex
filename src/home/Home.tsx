import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import HomeRow from './components/HomeRow';

const data = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise',
  'caterpie',
  'metapod',
  'butterfree',
  'weedle',
  'kakuna',
  'beedrill',
  'pidgey',
  'pidgeotto',
  'pidgeot',
  'rattata',
  'raticate',
];

const Home = () => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <HomeRow name={item} />}
        keyExtractor={item => item}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#bbb',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Home;
