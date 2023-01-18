import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export type RootStackParamList = {
  PokeGuess: PokeGuessParams;
};

type PokeGuessParams = {
  name: string;
  url: string;
};

const PokeGuess = ({
  route: {
    params: { name, url },
  },
}: NativeStackScreenProps<RootStackParamList, 'PokeGuess'>) => {
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const textInput = useRef<TextInput | null>(null);
  return (
    <>
      <Text style={styles.title}>Guess The Pokemon</Text>
      {correct === null ? (
        <View style={styles.inputField}>
          <TextInput
            ref={textInput}
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
          />
          <Button
            title="Submit"
            onPress={() => {
              setCorrect(answer.toLowerCase() === name.toLowerCase());
              textInput.current?.blur();
            }}
          />
        </View>
      ) : correct ? (
        <Text style={styles.result}>Your answer is correct!</Text>
      ) : (
        <Text style={styles.result}>Your answer is incorrect!</Text>
      )}
      {correct !== null && <Text style={styles.name}>{name}</Text>}
      <Image
        source={{
          uri: url,
        }}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').width,
        }}
        blurRadius={correct === null ? 5 : 0}
      />
    </>
  );
};

export default PokeGuess;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 36,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
  },
  inputField: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
