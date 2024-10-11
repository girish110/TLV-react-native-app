import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const SSTBPCalc = () => {
  const route = useRoute();
  const { pressure: initialPressure, unit: initialUnit } = route.params;
  const [pressure, setPressure] = useState(initialPressure);
  const [unit, setUnit] = useState(initialUnit);
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const navigation = useNavigation();
  


  useLayoutEffect(() => {
    
    if (initialPressure) setPressure(initialPressure.toString()); // Convert to string for TextInput
    if (initialUnit) setUnit(initialUnit);
    navigation.setOptions({
      title: 'Result',
    });
  }, [navigation]);

  useEffect(() => {
    setPressure(initialPressure);
    setUnit(initialUnit);
  }, [initialPressure, initialUnit]);
  
  // Calculation functions for Saturated Steam Temperature, Latent Heat, and Enthalpy
  const calculateSteamTemperature = () => {
    const A = 8.07131;
    const B = 1730.63;
    const C = 233.426;

    switch (unit) {
      case 'MPa abs':
        const temperature = (B / (A - Math.log10(7500.75*pressure))) - C;
        return temperature; 
      case 'psi abs':
        const pressureMPa = pressure * 0.00689476;
      const temperaturePsi = (B / (A - Math.log10(7500.75 * pressureMPa))) - C;
      return temperaturePsi; 
      default:
        return NaN;
    }
  };

  const calculateLatentHeat = () => {
    switch (unit) {
      case 'MPa abs':
        return 2014.44 * pressure; 
      case 'psi abs':
        return 2409.06 * pressure; 
      default:
        return NaN;
    }
  };

  const calculateEnthalpy = () => {
    switch (unit) {
      case 'MPa abs':
        return 2777.12 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 2571.25 * pressure; // Adjust for pressure input
      default:
        return NaN;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calculated Results </Text>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Steam Pressure </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: 'grey' } ]}
          value={pressure.toString()}
          // onChangeText={calculateSteamTemperature}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={unit}
          onValueChange={(itemValue) => setSelectedUnit(itemValue)}
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
      <Text style={styles.result}>Saturated Steam Temperature </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateSteamTemperature().toFixed(2)}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="°C" value="°C" />
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
          value={calculateLatentHeat().toFixed(2)}
          editable={false} 
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="kJ/kg" value="kJ/kg" />
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
          value={calculateEnthalpy().toFixed(2)}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
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

export default SSTBPCalc;
