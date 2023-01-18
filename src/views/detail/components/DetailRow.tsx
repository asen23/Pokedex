import React from 'react';
import { StyleSheet, Text } from 'react-native';

type DetailRowProps = {
  title: string;
  description: string;
};

const DetailRow = ({ title, description }: DetailRowProps) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
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
});
