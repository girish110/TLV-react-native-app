import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CondensatePipeSizing = () => {
  return (
    <View style={styles.condensatePipeSizingContainer}>
      <Text style={styles.condensatePipeSizingText}>
        Condensate Pipe Sizing Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    condensatePipeSizingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  condensatePipeSizingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CondensatePipeSizing;
