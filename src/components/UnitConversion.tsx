import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Sample data for the unit conversion list
const data = [
  { id: '1', title: 'Pressure' },
  { id: '2', title: 'Temperature' },
  { id: '3', title: 'Length' },
  { id: '4', title: 'Area' },
  { id: '5', title: 'Volume' },
  { id: '6', title: 'Mass' },
  { id: '7', title: 'Energy' },
  { id: '8', title: 'Power' },
];

// Unit Conversion Component
const UnitConversion = () => {
  // Render each list item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 2,
    // borderBottomLeftRadius: 20,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
});

export default UnitConversion;
