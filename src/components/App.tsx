import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UnitConversionList from './UnitConversionList'; 

const Stack = createStackNavigator();
// Sample data for the grid items (you'll replace these with your own icons and labels)
const data = [
  { id: '1', title: 'Unit Conversion', icon: require('../assets/unit_conversion.png') },
  { id: '2', title: 'Steam Tables', icon: require('../assets/steam_table.png') },
  { id: '3', title: 'Steam Pipe Sizing', icon: require('../assets/steam_pipe_sizing.png') },
  { id: '4', title: 'Condensate Pipe Sizing', icon: require('../assets/condensate_pipe_sizing.png') },
  { id: '5', title: 'Heat Calculations', icon: require('../assets/heat_calculations.png') },
  { id: '6', title: 'Valve Flow Calculations(Steam)', icon: require('../assets/valve_flow.png') },
  { id: '7', title: 'Other Steam Calculations', icon: require('../assets/other_calculations.png') },
];

// Grid Item Component
const GridItem = ({ title, icon }) => (
  <View style={styles.gridItem}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.label}>{title}</Text>
  </View>
);
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('../assets/smarttracker.png')} // Update the path based on your file location
          resizeMode="contain"
        />
      </View>

      {/* Grid Layout */}
      <FlatList
        data={data}
        renderItem={({ item }) => <GridItem title={item.title} icon={item.icon} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#FFBFC0', // TLV branding color
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#4A4A4A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gridContainer: {
    padding: 10,
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Centers the text horizontally
    flexWrap: 'wrap', // Allows text to wrap into multiple lines
    width: 150, 
  },
  headerImage: {
    
  },
});

export default App;
