import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Pressure = () => {
  const [pressure, setPressure] = useState('');
  const [pressureUnit, setPressureUnit] = useState('MPa');
  const [result, setResult] = useState('');
  const [resultUnit, setResultUnit] = useState('MPa');

  const conversionFactor = 145.033; // Conversion logic

  // Function to handle conversion based on pressure value and selected units
  const convertPressure = (pressureValue, fromUnit, toUnit) => {
    if (!isNaN(pressureValue)) {
      let convertedValue;
      if (fromUnit === 'MPa' && toUnit === 'psi') {
        convertedValue = pressureValue * conversionFactor;
      } else if (fromUnit === 'psi' && toUnit === 'MPa') {
        convertedValue = pressureValue / conversionFactor;
      } else {
        convertedValue = pressureValue; // Same unit, no conversion
      }
      setResult(convertedValue.toFixed(2).toString());
    } else {
      setResult('');
    }
  };

  // Handle pressure input changes
  const handlePressureChange = (value) => {
    setPressure(value);
    const pressureValue = parseFloat(value);
    convertPressure(pressureValue, pressureUnit, resultUnit);
  };

  // Handle changes in pressure unit
  const handlePressureUnitChange = (value) => {
    setPressureUnit(value);
    const pressureValue = parseFloat(pressure);
    convertPressure(pressureValue, value, resultUnit);
  };

  // Handle changes in result unit
  const handleResultUnitChange = (value) => {
    setResultUnit(value);
    const pressureValue = parseFloat(pressure);
    convertPressure(pressureValue, pressureUnit, value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pressure</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pressure}
          onChangeText={handlePressureChange}
          placeholder="0"
        />
        <Text style={styles.unitLabel}>{pressureUnit}</Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            inputIOS: {
              ...pickerSelectStyles.inputIOS,
              borderColor: pressureUnit ? '#2B18FF' : 'black', // Change to blue when a unit is selected
            },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
              color: pressureUnit ? '#2B18FF' : 'black', // Change to blue when a unit is selected
            },
          }}
          onValueChange={handlePressureUnitChange}
          items={[
            { label: 'MPa abs', value: 'MPa' },
            { label: 'psi abs', value: 'psi' },
          ]}
          value={pressureUnit}
        />
      </View>

      <Text style={styles.label}>Result</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={result}
          editable={false}
          placeholder="0"
        />
        <Text style={styles.unitLabel}>{resultUnit}</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={handleResultUnitChange}
          items={[
            { label: 'MPa abs', value: 'MPa' },
            { label: 'psi abs', value: 'psi' },
          ]}
          value={resultUnit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  unitLabel: {
    fontSize: 16,
    marginRight: 10,
    alignSelf: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping the icon
  },
});

export default Pressure;
