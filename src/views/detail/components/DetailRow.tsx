import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { DarkTheme } from '../../../App';

type DetailRowProps = {
  title: string;
  description: string;
};

const DetailRow = ({ title, description }: DetailRowProps) => {
  const isDarkTheme = useContext(DarkTheme);
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
