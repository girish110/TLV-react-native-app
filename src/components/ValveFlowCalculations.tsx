import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample data for the unit conversion list
const data = [
  { id: '1', title: 'Valve and Orifice Cv & Kvs Values for Steam', screen: 'Cv_Kvs_Values' },
  { id: '2', title: 'Steam Flow Rate through a Valve', screen: 'Steam_Flow_Rate_Valve' },
  // { id: '3', title: 'Length', screen: 'Length' },
  // { id: '4', title: 'Area', screen: 'Area' },
  // { id: '5', title: 'Volume', screen: 'Volume' },
  // { id: '6', title: 'Mass', screen: 'Mass' },
  // { id: '7', title: 'Energy', screen: 'Energy' },
  // { id: '8', title: 'Power', screen: 'Power' },
];


const ValveFlowCalculations = () => {
  const navigation = useNavigation(); // Access the navigation object

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Valve Flow Calculations(Steam)',
    });
  }, [navigation]);
  // Render each list item
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
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
    justifyContent: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
});

export default ValveFlowCalculations;
