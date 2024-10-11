import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Temperature = () => {
  const [temperature, setTemperature] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [result, setResult] = useState('');
  const [resultUnit, setResultUnit] = useState('°C');

  // Conversion logic for temperature
  const convertTemperature = (temperatureValue, fromUnit, toUnit) => {
    if (!isNaN(temperatureValue)) {
      let convertedValue;
      if (fromUnit === '°C' && toUnit === '°F') {
        convertedValue = (temperatureValue * 9/5) + 32;
      } else if (fromUnit === '°C' && toUnit === 'K') {
        convertedValue = temperatureValue + 273.15;
      } else if (fromUnit === '°F' && toUnit === '°C') {
        convertedValue = (temperatureValue - 32) * 5/9;
      } else if (fromUnit === '°F' && toUnit === 'K') {
        convertedValue = (temperatureValue - 32) * 5/9 + 273.15;
      } else if (fromUnit === 'K' && toUnit === '°C') {
        convertedValue = temperatureValue - 273.15;
      } else if (fromUnit === 'K' && toUnit === '°F') {
        convertedValue = (temperatureValue - 273.15) * 9/5 + 32;
      } else {
        convertedValue = temperatureValue; // Same unit, no conversion
      }
      setResult(convertedValue.toFixed(2).toString());
    } else {
      setResult('');
    }
  };

  // Handle temperature input changes
  const handleTemperatureChange = (value) => {

    const validInputPattern = /^(\d+(\.\d{0,})?)?$/;

    if (validInputPattern.test(value)) {
    setTemperature(value);
    const temperatureValue = parseFloat(value);
    convertTemperature(temperatureValue, temperatureUnit, resultUnit);
    }
  };

  // Handle changes in temperature unit
  const handleTemperatureUnitChange = (value) => {
    setTemperatureUnit(value);
    const temperatureValue = parseFloat(temperature);
    convertTemperature(temperatureValue, value, resultUnit);
  };

  // Handle changes in result unit
  const handleResultUnitChange = (value) => {
    setResultUnit(value);
    const temperatureValue = parseFloat(temperature);
    convertTemperature(temperatureValue, temperatureUnit, value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Temperature</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={temperature}
          onChangeText={handleTemperatureChange}
          placeholder="0"
        />
        <Text style={styles.unitLabel}>{temperatureUnit}</Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            inputIOS: {
              ...pickerSelectStyles.inputIOS,
              borderColor: temperatureUnit ? '#007AFF' : 'gray', // Blue when selected
            },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
              borderColor: temperatureUnit ? '#007AFF' : 'gray', // Blue when selected
            },
          }}
          onValueChange={handleTemperatureUnitChange}
          items={[
            { label: 'Celsius (°C)', value: '°C' },
            { label: 'Fahrenheit (°F)', value: '°F' },
            { label: 'Kelvin (K)', value: 'K' },
          ]}
          value={temperatureUnit}
        />
      </View>

      <Text style={styles.label}>Result</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.resultInput}
          keyboardType="numeric"
          value={result}
          editable={false}
          placeholder="0"
        />
        <Text style={styles.unitLabel}>{resultUnit}</Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            inputIOS: {
              ...pickerSelectStyles.inputIOS,
              borderColor: resultUnit ? '#007AFF' : 'gray', // Blue when selected
            },
            inputAndroid: {
              ...pickerSelectStyles.inputAndroid,
              borderColor: resultUnit ? '#007AFF' : 'gray', // Blue when selected
            },
          }}
          onValueChange={handleResultUnitChange}
          items={[
            { label: 'Celsius (°C)', value: '°C' },
            { label: 'Fahrenheit (°F)', value: '°F' },
            { label: 'Kelvin (K)', value: 'K' },
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
    paddingLeft: 30,
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 0,
    color: '#BE2BFF',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  unitLabel: {
    fontSize: 16,
    marginRight: 10,
    alignSelf: 'center',
    color: 'black',
  },
  resultInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
    color: '#9083FF',
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

export default Temperature;
