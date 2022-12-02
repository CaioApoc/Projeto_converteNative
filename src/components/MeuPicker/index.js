import RNPickerSelect from "react-native-picker-select";
import React from "react";

export default function MeuPicker(props) {
  const placeholder = {
    label: "Selecione a moeda a ser convertida",
    value: null,
    // color: "#000",
  };

  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={props.moedas}
      onValueChange={(valor) => props.onChange(valor)}
      style={{
        inputAndroid: {
          fontSize: 20,
          color: "#000",
        },
        inputIOS: {
          fontSize: 20,
          color: "#000",
        },
      }}
    />
  );
}
