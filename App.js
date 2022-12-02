import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import MeuPicker from "./src/components/MeuPicker";
import api from "./src/services/api";

export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get("all");

      let arrayMoedas = [];
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });
      });

      // console.log(arrayMoedas); ja mostra o array de objetos que é o array com as moedas e suas propriedades

      // console.log(Object.keys(response.data)); vai pegar as keys "USD" e transformar em um array para jogar no picker

      setMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();
  }, []);

  async function converter() {
    if (moedaSelecionada === null || moedaBValor === 0) {
      alert("Escolha uma moeda e digite um valor a ser convertido.");
      return;
    }

    const response = await api.get(`all/${moedaSelecionada}-BRL`);
    //como a gente tem uma chave chamado USD por exemplo e dentro dele nos temos os objetos que queremos como o ask(preço)
    //nos temos que transformar senao poderia ser somente responde.data.ask
    //entrar dentro de um item de um array pra selecionar o ask console.log(responde.data)

    let resultado =
      response.data[moedaSelecionada].ask * parseFloat(moedaBValor);
    // console.log(resultado);
    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    setValorMoeda(moedaBValor);
    Keyboard.dismiss();
  }

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator color="#000" size={45} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={styles.titulo}>Selecione uma moeda</Text>
          <MeuPicker
            moedas={moedas}
            onChange={(moeda) => setMoedaSelecionada(moeda)}
          />
        </View>
        <View style={styles.areaValor}>
          <Text style={([styles.titulo], { marginLeft: 14 })}>
            Digite um valor para ser convertido em (R$)
          </Text>
          <TextInput
            placeholder="EX:150"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(valor) => setMoedaBValor(valor)}
          />
        </View>
        <TouchableOpacity style={styles.botaoArea} onPress={converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        {valorConvertido !== 0 && (
          <View style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {valorMoeda}
              {moedaSelecionada}
            </Text>
            <Text
              style={([styles.valorConvertido], { fontSize: 20, margin: 10 })}
            >
              Corresponde a:
            </Text>
            <Text style={styles.valorConvertido}>{valorConvertido}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101215",
    alignItems: "center",
    paddingTop: 40,
  },
  areaMoeda: {
    width: "90%",
    backgroundColor: "#F9f9f9",
    padding: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
    marginTop: 30,
  },
  titulo: {
    fontSize: 15,
    color: "#000",
    paddingTop: 5,
    paddingLeft: 5,
  },
  areaValor: {
    width: "90%",
    backgroundColor: "#F9f9f9",
    paddingBottom: 9,
    paddingTop: 9,
  },
  input: {
    width: "100%",
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: "#000",
  },
  botaoArea: {
    width: "90%",
    backgroundColor: "#fb4b57",
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoTexto: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  areaResultado: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    borderRadius: 9,
  },
  valorConvertido: {
    fontSize: 39,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 4,
  },
});
