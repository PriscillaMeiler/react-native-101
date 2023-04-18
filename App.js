import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [text, setText] = useState('Pri');

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
        }}
        style={{width: 200, height: 200}}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu Nome"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={styles.title}>Olha a {text} aprendendo React Native e {isStarted ? 'criando' : 'melhorando'} o primeiro app</Text>
      <Button
        onPress={() => {
          setIsStarted(!isStarted);
        }}
        title={isStarted ? 'Já comecei!' : 'Não comecei, não!'}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#FFF',
    height: 30,
    borderWidth: 1,
    borderColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30
  },
});
