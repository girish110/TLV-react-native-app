import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BatchCalc = () => {
  const route = useRoute();
  const { pressure, unit } = route.params;
//   const [ pipeSize, setPipeSize] = useState('DN6');
  const navigation = useNavigation();
  


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Batch Calculation Result',
    });
  }, [navigation]);

  
  // Calculation functions for Saturated Steam Temperature, Latent Heat, and Enthalpy
 /* const calculatePipeInnerDiameter = () => {
    switch (unit) {
      case 'MPa abs':
        return 179.886 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 38.7197 * pressure; // Adjust for pressure input
      default:
        return NaN;
    }
  };

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
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Condensate Load:  kg</Text>
      <Text style={styles.result}>Average Condensate Load:  {unit}</Text>
      {/* <Text style={styles.result}>
      Pipe Inner Diameter :  °C
      </Text>
      <Text style={styles.result}>
        Latent Heat of Steam:  kJ/kg
      </Text>
      <Text style={styles.result}>
        Specific Enthalpy of Saturated Steam:  kJ/kg
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    // paddingLeft: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#BE2BFF',
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
});

export default BatchCalc;
