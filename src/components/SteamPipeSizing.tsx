import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SteamPipeSizing = () => {
  return (
    <View style={styles.steamPipeSizingContainer}>
      <Text style={styles.steamPipeSizingText}>
        Steam Pipe Sizing Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    steamPipeSizingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  steamPipeSizingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SteamPipeSizing;
