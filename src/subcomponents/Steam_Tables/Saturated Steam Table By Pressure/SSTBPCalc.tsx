import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SSTBPCalc = () => {
  const route = useRoute();
  const { pressure, unit } = route.params;
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Result',
    });
  }, [navigation]);

  
  // Calculation functions for Saturated Steam Temperature, Latent Heat, and Enthalpy
  const calculateSteamTemperature = () => {
    switch (unit) {
      case 'MPa abs':
        return 179.886 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 38.7197 * pressure; // Adjust for pressure input
      default:
        return 'Unit not supported';
    }
  };

  const calculateLatentHeat = () => {
    switch (unit) {
      case 'MPa abs':
        return 2014.44 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 2409.06 * pressure; // Adjust for pressure input
      default:
        return 'Unit not supported';
    }
  };

  const calculateEnthalpy = () => {
    switch (unit) {
      case 'MPa abs':
        return 2777.12 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 2571.25 * pressure; // Adjust for pressure input
      default:
        return 'Unit not supported';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculated Results:</Text>
      <Text style={styles.result}>Steam Pressure: {pressure} {unit}</Text>
      <Text style={styles.result}>
        Saturated Steam Temperature: {calculateSteamTemperature().toFixed(2)} °C
      </Text>
      <Text style={styles.result}>
        Latent Heat of Steam: {calculateLatentHeat().toFixed(2)} kJ/kg
      </Text>
      <Text style={styles.result}>
        Specific Enthalpy of Saturated Steam: {calculateEnthalpy().toFixed(2)} kJ/kg
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
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

export default SSTBPCalc;
