import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const DropBasedCalc = () => {
  const route = useRoute();
  const { pressure, unit } = route.params;
  const [ pipeSize, setPipeSize] = useState('DN6');
  const navigation = useNavigation();
  


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Drop Based Result',
    });
  }, [navigation]);

  
  // Calculation functions for Saturated Steam Temperature, Latent Heat, and Enthalpy
  
  const calculateTemperatureDrop = () => {
    switch (unit) {
      case 'MPa abs':
        return 179.886 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 38.7197 * pressure; // Adjust for pressure input
      default:
        return NaN;
    }
  };
/*
  const calculateLatentHeat = () => {
    switch (unit) {
      case 'MPa abs':
        return 2014.44 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 2409.06 * pressure; // Adjust for pressure input
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
  */

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Calculated Results</Text>

   <View  style={styles.rowContainer}>
    <View style={styles.inputContainer}>
    <Text style={styles.result}>Temperature Drop</Text>
    <View style={styles.inputRow}>
    <TextInput
        style={[styles.inputHalf, { color: '#9083FF' } ]}
        value={calculateTemperatureDrop().toFixed(2)}
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
        <Picker.Item label="°F" value="°F" />
        <Picker.Item label="K" value="K" />
      </Picker>
      </View>
  </View>
  </View>

  <View  style={styles.rowContainer}>
    <View style={styles.inputContainer}>
    <Text style={styles.result}>Mixture Temperature</Text>
    <View style={styles.inputRow}>
    <TextInput
        style={[styles.inputHalf, { color: '#9083FF' } ]}
        value={calculateTemperatureDrop().toFixed(2)}
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
        <Picker.Item label="°F" value="°F" />
        <Picker.Item label="K" value="K" />
      </Picker>
      </View>
  </View>
  </View>

  <View  style={styles.rowContainer}>
    <View style={styles.inputContainer}>
    <Text style={styles.result}>Partial Pressure of Vapor</Text>
    <View style={styles.inputRow}>
    <TextInput
        style={[styles.inputHalf, { color: '#9083FF' } ]}
        value={calculateTemperatureDrop().toFixed(2)}
        editable={false} 
        // placeholder="Enter Pressure"
        keyboardType="numeric"
      />
      <Picker
        selectedValue={pressure}
        // onValueChange={(itemValue) => setPipeGrade(itemValue)}
        style={styles.inputPicker}
      >
        <Picker.Item label="kPa abs" value="kPa abs" />
        <Picker.Item label="MPa abs" value="MPa abs" />
      </Picker>
      </View>
  </View>
  </View>

  <View  style={styles.rowContainer}>
    <View style={styles.inputContainer}>
    <Text style={styles.result}>Saturated Steam Temperature</Text>
    <View style={styles.inputRow}>
    <TextInput
        style={[styles.inputHalf, { color: '#9083FF' } ]}
        value={calculateTemperatureDrop().toFixed(2)}
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
        <Picker.Item label="°F" value="°F" />
        <Picker.Item label="K" value="K" />
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
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: '#F5F5F5',
  // paddingLeft: 30,
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 50,
  color: '#BE2BFF',
  alignSelf: 'center',
},
result: {
  fontSize: 16,
  marginBottom: 0,
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


export default DropBasedCalc;
