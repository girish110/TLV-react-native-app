import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SSTBTCalc = () => {
  const route = useRoute();
  const { temperature, unit } = route.params;
  const navigation = useNavigation();

  // Setting the screen title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Result',
    });
  }, [navigation]);

  // Validation: Check temperature range for Fahrenheit
  

  // Calculation functions for Saturated Steam Temperature, Latent Heat, and Enthalpy
  // const calculateSteamTemperature = () => {
  //   switch (unit) {
  //     case '°C':
  //       return 0.000657 * temperature;
  //     case '°F':
  //       return 38.7197 * temperature; 
  //     default:
  //       return 'Unit not supported';
  //   }
  // };

  const calculateSteamTemperature = (temperature) => {
    // Check if the temperature is within the valid range
    // if (temperature < 1 || temperature > 100) {
    //   return 'Temperature out of range. Please enter a value between 1°C and 100°C.';
    // }
  
    // Antoine constants for water
    const A = 8.07131;
    const B = 1730.63;
    const C = 233.426;
  
    // Calculate pressure in mmHg using the Antoine equation
    const pressureMmHg = Math.pow(10, A - (B / (C + temperature)));
  
    // Convert mmHg to MPa
    const pressureMPa = pressureMmHg * 0.000133322;
  
    return pressureMPa;
  };
  

  const calculateLatentHeat = () => {
    switch (unit) {
      case '°C':
        // Latent heat formula for °C
        return 2500 - (2.5 * temperature); // Adjust for temperature input in °C
      case '°F':
        // Convert Fahrenheit to Celsius first
        const celsius = (temperature - 32) * 5 / 9;
        // Now calculate the latent heat using the converted Celsius value
        return 2500 - (2.5 * celsius); // Adjust for temperature input in °F
      default:
        return 'Unit not supported';
    }
  };
  
  // const calculateEnthalpy = () => {
  //   switch (unit) {
  //     case '°C':
  //       return 2777.12 * temperature; // Adjust for pressure input
  //     case '°F':
  //       return 2571.25 * temperature; // Adjust for pressure input
  //     default:
  //       return 'Unit not supported';
  //   }
  // };

  const calculateEnthalpy = (temperature) => {
    // Check if the temperature is within the valid range
    switch (unit) {
    case '°C':
        // Latent heat formula for °C
        return 2500.9 + (1.82 * temperature); // Adjust for temperature input in °C
      case '°F':
        // Convert Fahrenheit to Celsius first
        const celsius = (temperature - 32) * 5 / 9;
        // Now calculate the latent heat using the converted Celsius value
        return 2500.9 + (1.82 * celsius); // Adjust for temperature input in °F
      default:
  
    // Calculate specific enthalpy in kJ/kg using the formula
    // const specificEnthalpy = 2500.9 + (1.82 * temperature);
    return temperature;
    }
    
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculated Results:</Text>
      <Text style={styles.result}>Steam Pressure: {temperature} {unit}</Text>
      <Text style={styles.result}>
         Steam Pressure: {calculateSteamTemperature(temperature).toFixed(6)} MPa abs
      </Text>
      <Text style={styles.result}>
        Latent Heat of Steam: {calculateLatentHeat().toFixed(2)} kJ/kg
      </Text>
      <Text style={styles.result}>
        Specific Enthalpy of Saturated Steam: {calculateEnthalpy(temperature).toFixed(2)} kJ/kg
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingLeft: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#BE2BFF',
  },
  result: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});

export default SSTBTCalc;
