import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeatCalculations = () => {
  return (
    <View style={styles.heatCalculationsContainer}>
      <Text style={styles.heatCalculationsText}>
      Heat Calculations Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    heatCalculationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heatCalculationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HeatCalculations;
