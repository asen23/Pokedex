import React from 'react';
import { StyleSheet, Text } from 'react-native';

type DetailRowProps = {
  title: string;
  description: string;
  isDarkTheme: boolean;
};

const DetailRow = ({ title, description, isDarkTheme }: DetailRowProps) => {
  return (
    <>
      <Text style={[styles.title, isDarkTheme ? styles.textDark : {}]}>
        {title}
      </Text>
      <Text style={[styles.description, isDarkTheme ? styles.textDark : {}]}>
        {description}
      </Text>
    </>
  );
};

export default DetailRow;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  textDark: {
    color: 'white',
  },
});
