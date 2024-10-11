import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const SSTBTCalc = () => {
  const route = useRoute();
  const { temperature: initialTemperature, unit: initialUnit } = route.params;
  const [temperature, setTemperature] = useState(initialTemperature);
  const [unit, setUnit] = useState(initialUnit);
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const navigation = useNavigation();

  // Setting the screen title
  useLayoutEffect(() => {
    if (initialTemperature) setTemperature(initialTemperature.toString()); // Convert to string for TextInput
    if (initialUnit) setUnit(initialUnit);
    navigation.setOptions({
      title: 'Result',
    });
  }, [navigation]);

  useEffect(() => {
    setTemperature(initialTemperature);
    setUnit(initialUnit);
  }, [initialTemperature, initialUnit]);
 
  const calculateSteamPressure = (temperature) => {
    // Antoine constants for water
    const A = 8.07131;
    const B = 1730.63;
    const C = 233.426;
  
    let temperatureInCelsius;
  
    switch(unit){
      case '°C':
        temperatureInCelsius = temperature;
        break;
  
      case '°F':
        // Convert Fahrenheit to Celsius
        temperatureInCelsius = (temperature - 32) / 1.8;
        break;
  
      case 'K':
        // Convert Kelvin to Celsius
        temperatureInCelsius = temperature - 273.15;
        break;
  
      default:
        return  temperature;
    }
  
    // Calculate pressure in mmHg using the Antoine equation
    const pressureMmHg = Math.pow(10, A - (B / (C + temperatureInCelsius)));
  
    // Convert mmHg to MPa
    const pressureMPa = pressureMmHg * 0.000133322;
    
    return pressureMPa;
  };
  
  

  const calculateLatentHeat = (temperature) => {
    switch (unit) {
      case '°C':
        // Latent heat formula for °C
        return 2500 - (2.5 * temperature); // Adjust for temperature input in °C
      case '°F':
        // Convert Fahrenheit to Celsius first
        const celsius = (temperature - 32) * 5 / 9;
        // Now calculate the latent heat using the converted Celsius value
        return 2500 - (2.5 * celsius); // Adjust for temperature input in °F
        case 'K':
          const celsiusFromKelvin = temperature - 273.15;
          return 2500 - (2.3 * celsiusFromKelvin); 
      default:
        return temperature;
    }
  };
  


  const calculateEnthalpy = (temperature) => {
    // Check if the temperature is within the valid range
    switch (unit) {
    case '°C':
        return 2500.9 + (1.82 * temperature); // Adjust for temperature input in °C
      case '°F':
        const celsius = (temperature - 32) * 5 / 9;
        return 2500.9 + (1.82 * celsius); // Adjust for temperature input in °F
        case 'K':
          const celsiusFromKelvin = temperature - 273.15;
          return 2500.9 + (1.82 * celsiusFromKelvin); 
      default:
  
    // Calculate specific enthalpy in kJ/kg using the formula
    // const specificEnthalpy = 2500.9 + (1.82 * temperature);
    return temperature;
    }
    
  };
  
  
  

  return (
    <ScrollView style={styles.container}>
    {/* <View style={styles.container}> */}
      <Text style={styles.title}>Calculated Results </Text>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Steam Temperature </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: 'grey' } ]}
          value={temperature.toString()}
          // onChangeText={calculateSteamTemperature}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={unit}
          // onValueChange={(itemValue) => setUnit(itemValue)} // When you use setUnit(), the picker unit cannot be changed
          onValueChange={(itemValue) => setSelectedUnit(itemValue)} // When you use setSelectedUnit(), the picker unit can be changed
          style={styles.inputPicker}
        >
          <Picker.Item label="°C" value="°C" />
          <Picker.Item label="°F" value="°F" />
          <Picker.Item label="K" value="K" />
        </Picker>
        {/* </View> */}
        </View>
    </View>
    </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Steam Pressure </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateSteamPressure(temperature).toFixed(7)}
          editable={false} 
          keyboardType="numeric"
        />
        <Picker
          selectedValue={temperature}
          style={styles.inputPicker}
        >
          <Picker.Item label="MPa abs" value="MPa abs" />
          <Picker.Item label="psi abs" value="psi abs" />
        </Picker>
        </View>
    </View>
    </View>

    <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Latent Heat of Steam </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateLatentHeat(temperature).toFixed(4)}
          editable={false} 
          keyboardType="numeric"
        />
        <Picker
          selectedValue={temperature}
          style={styles.inputPicker}
        >
          <Picker.Item label="°C" value="°C" />
        </Picker>
        </View>
    </View>
    </View>

    

    <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Specific Enthalpy of Saturated Steam </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateEnthalpy(temperature).toFixed(4)}
          editable={false} 
          keyboardType="numeric"
        />
        <Picker
          selectedValue={temperature}
          style={styles.inputPicker}
        >
          <Picker.Item label="kJ/kg" value="°kJ/kg" />
        </Picker>
        </View>
    </View>
    </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 5,
    // justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#BE2BFF',
    alignSelf: 'center',
    marginTop: 10,
  },
  result: {
    fontSize: 16,
    marginBottom: -2,
    color: '#333',
  },

  rowContainer: {
    marginVertical: 40,
    paddingTop: 10,
  },
  inputContainer: {
    marginVertical: -60,
  },
  inputHalf: {
    flex: 0.6, // Adjust the size of the TextInput relative to the Picker
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginRight: 10, // Adds space between TextInput and Picker
    // paddingTop: 20,
  },
  inputPicker: {
    flex: 0.5, // Adjust size of the Picker relative to the TextInput
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },
  inputRow: {
    flexDirection: 'row', // Aligns TextInput and Picker horizontally
    alignItems: 'center', // Vertically centers the elements
    paddingTop: 0,
    // paddingEnd: 10,
  },

});
export default SSTBTCalc;


