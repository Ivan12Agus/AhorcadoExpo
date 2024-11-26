import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable } from 'react-native';

const palabras = ["EXPO", "JUEGO", "AHORCADO", "REACT", "NATIVO"]; // Palabras predefinidas

export default function App() {
  const [palabraSecreta, setPalabraSecreta] = useState(
    palabras[Math.floor(Math.random() * palabras.length)]
  );
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
  const [intentosRestantes, setIntentosRestantes] = useState(6);
  const [letraInput, setLetraInput] = useState("");

  const reiniciarJuego = () => {
    setPalabraSecreta(palabras[Math.floor(Math.random() * palabras.length)]);
    setLetrasAdivinadas([]);
    setIntentosRestantes(6);
    setLetraInput("");
  };

  const manejarInput = () => {
    const letra = letraInput.toUpperCase();
    setLetraInput("");

    if (letrasAdivinadas.includes(letra)) {
      Alert.alert("Ya intentaste esa letra.");
      return;
    }

    setLetrasAdivinadas([...letrasAdivinadas, letra]);

    if (!palabraSecreta.includes(letra)) {
      setIntentosRestantes(intentosRestantes - 1);
    }
  };

  const mostrarPalabra = () => {
    return palabraSecreta
      .split("")
      .map((letra) => (letrasAdivinadas.includes(letra) ? letra : "_"))
      .join(" ");
  };

  const estadoJuego = () => {
    if (intentosRestantes <= 0) {
      return "PERDISTE";
    }
    if (!mostrarPalabra().includes("_")) {
      return "¡GANASTE!";
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Ahorcado!</Text>
      <Text style={styles.palabra}>{mostrarPalabra()}</Text>
      <Text style={styles.intentos}>Intentos restantes: {intentosRestantes}</Text>

      {estadoJuego() ? (
        <>
          <Text style={styles.resultado}>{estadoJuego()}</Text>
          <Pressable style = {styles.boton} onPress={reiniciarJuego}>
            <Text style = {styles.textoBoton} > Reiniciar juego </Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Ingresa una letra"
            maxLength={1}
            value={letraInput}
            onChangeText={setLetraInput}
          />
          <Pressable style={styles.boton} onPress={manejarInput}>
            <Text style={styles.textoBoton}>Probar letra</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    color: "#CCC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DDD",
    marginBottom: 20
  },

  palabra: {
    fontSize: 32,
    color: "#DDD",
    letterSpacing: 4,
    marginVertical: 20
  },

  intentos: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#CF0033",
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#AAA",
    padding: 10,
    marginVertical: 10,
    width: "80%",
    borderRadius: 15,
    textAlign: "center",
    backgroundColor: "#DDD"
  },

  probar: {

    borderRadius: 15,
    backgroundColor: "#FF00FF",

  },

  resultado: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#DDD",
  },

  boton: {
    backgroundColor: "#CF0033",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 30,
  },

  textoBoton: {
    color: "#DDD", 
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }

});
