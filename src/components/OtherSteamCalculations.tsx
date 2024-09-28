import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherSteamCalculations = () => {
  return (
    <View style={styles.otherSteamCalculationsContainer}>
      <Text style={styles.otherSteamCalculationsText}>
      Other Steam Calculations
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    otherSteamCalculationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherSteamCalculationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
});

export default OtherSteamCalculations;
