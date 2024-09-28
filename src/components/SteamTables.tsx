import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SteamTables = () => {
  return (
    <View style={styles.steamTablesContainer}>
      <Text style={styles.steamTablesText}>
        Steam Tables Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    steamTablesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  steamTablesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SteamTables;
