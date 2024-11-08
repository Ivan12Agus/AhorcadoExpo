import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function App() {
  const [texto, setTexto] = useState(''); // Estado para manejar el texto ingresado
  const [letraAlmacenada, setLetraAlmacenada] = useState(''); //Almacenar la letra

  // Función que restringe la entrada a una sola letra
  const handleTextChange = (input) => {
    // Verifica si el input tiene una longitud mayor a 1, si es así lo recorta a la primera letra
    if (input.length <= 1) {
      setTexto(input); // Solo actualiza el estado si el input tiene una o ninguna letra
    }
  };

  const handleSubmit = () => {

    if (texto) {

      setLetraAlmacenada(texto);
      setTexto('');

    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>La palabra es: {texto}</Text>  
      {/*Aca poner la palabra a adivinar*/}
      
      <TextInput
        style={styles.input}
        placeholder="Escribe una letra..."
        value={texto}
        onChangeText={handleTextChange}  // Usamos la función que restringe la entrada
        maxLength={1}  // Limita el máximo de caracteres a 1
      />

      <Button title = "submit" onPress={handleSubmit}/>
      
      <Text style={styles.output}>Letra introducida: {letraAlmacenada}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  output: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});
