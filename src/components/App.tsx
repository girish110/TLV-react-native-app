import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UnitConversion from '../components/UnitConversion';
import SteamTables from '../components/SteamTables';
import SteamPipeSizing from '../components/SteamPipeSizing';
import CondensatePipeSizing from '../components/CondensatePipeSizing';
import HeatCalculations from '../components/HeatCalculations';
import ValveFlowCalculations from '../components/ValveFlowCalculations';
import OtherSteamCalculations from '../components/OtherSteamCalculations';
import Pressure from '../subcomponents/Unit_Conversion/Pressure/Pressure';
import Temperature from '../subcomponents/Unit_Conversion/Temperature/Temperature';
import Saturated_Steam_Table_By_Pressure from '../subcomponents/Steam_Tables/Saturated Steam Table By Pressure/Saturated_Steam_Table_By_Pressure';
import Saturated_Steam_Table_By_Temperature from '../subcomponents/Steam_Tables/Saturated Steam Table By Temperature/Saturated_Steam_Table_By_Temperature';
import SSTBTCalc from '../subcomponents/Steam_Tables/Saturated Steam Table By Temperature/SSTBTCalc';
import SSTBPCalc from '../subcomponents/Steam_Tables/Saturated Steam Table By Pressure/SSTBPCalc';

import Pressure_Loss_For_Steam from '../subcomponents/Steam_Pipe_Sizing/Pressure Loss For Steam/Pressure_Loss_For_Steam';
import Pressure_Loss_Calc from '../subcomponents/Steam_Pipe_Sizing/Pressure Loss For Steam/Pressure_Loss_Calc';
import Continuous from '../subcomponents/Heat_Calculations/Heating Liquid (Continuous)/Continuous';
import Continuous_Calc from '../subcomponents/Heat_Calculations/Heating Liquid (Continuous)/Continuous_Calc';
import Batch from '../subcomponents/Heat_Calculations/Heating Liquid (Batch)/Batch';
import Batch_Calc from '../subcomponents/Heat_Calculations/Heating Liquid (Batch)/Batch_Calc';
import Velocity_For_Steam from '../subcomponents/Steam_Pipe_Sizing/Velocity For Steam/Velocity_For_Steam';
import Velocity_Calc from '../subcomponents/Steam_Pipe_Sizing/Velocity For Steam/Velocity_Calc';
import Equipment_and_Trap from '../subcomponents/Condensate_Pipe_Sizing/Equipment and Trap/Equipment_and_Trap';
import Calc from '../subcomponents/Condensate_Pipe_Sizing/Equipment and Trap/Calc';
import Recovery_Line_By_Pressure_Loss from '../subcomponents/Condensate_Pipe_Sizing/Recovery Line By Pressure Loss/Recovery_Line_By_Pressure_Loss';
import Calci from '../subcomponents/Condensate_Pipe_Sizing/Recovery Line By Pressure Loss/Calci';
import Cv_Kvs_Values from '../subcomponents/Valve_Flow_Calculations(Steam)/Valve and Orifice Cv & Kvs Values for Steam/Cv_Kvs_Values';
import Cv_Kvs_Calc from '../subcomponents/Valve_Flow_Calculations(Steam)/Valve and Orifice Cv & Kvs Values for Steam/Cv_Kvs_Calc';
import Steam_Flow_Rate_Valve from '../subcomponents/Valve_Flow_Calculations(Steam)/Steam Flow Rate through a Valve/Steam_Flow_Rate_Valve';
import Valve_Calc from '../subcomponents/Valve_Flow_Calculations(Steam)/Steam Flow Rate through a Valve/Valve_Calc';
import Pressure_Reduction from '../subcomponents/Other_Steam_Calculations/Improved Steam Dryness From Pressure Reduction/Pressure_Reduction';
import Pressure_Reduction_Calc from '../subcomponents/Other_Steam_Calculations/Improved Steam Dryness From Pressure Reduction/Pressure_Reduction_Calc';
import Drop_Based from '../subcomponents/Other_Steam_Calculations/Temperature Drop Based on Air % of Total Volume/Drop_Based';
import Drop_Based_Calc from '../subcomponents/Other_Steam_Calculations/Temperature Drop Based on Air % of Total Volume/Drop_Based_Calc';

const Stack = createNativeStackNavigator();

// Sample data for the grid items
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
const GridItem = ({ title, icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.gridItem}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{title}</Text>
    </View>
  </TouchableOpacity>
);

// Home Component with Grid Items
const Home = ({ navigation }) => {
  // Handle grid item click
  const handlePress = (title) => {
    if (title === 'Unit Conversion') {
      navigation.navigate('UnitConversion'); // Navigate to Unit Conversion screen. The arguement navigates to UnitConversion.tsx screen
    }

    if (title === 'Steam Tables') {
      navigation.navigate('SteamTables'); // Navigate to Steam Tables screen
    }
    
    if (title === 'Steam Pipe Sizing') {
      navigation.navigate('SteamPipeSizing'); // Navigate to Steam Pipe Sizing screen
    }

    if (title === 'Condensate Pipe Sizing') {
      navigation.navigate('CondensatePipeSizing'); // Navigate to Condensate Pipe Sizing screen
    }

    if (title === 'Heat Calculations') {
      navigation.navigate('HeatCalculations'); // Navigate to Heat Calculations screen
    }

    if (title === 'Valve Flow Calculations(Steam)') {
      navigation.navigate('ValveFlowCalculations'); // Navigate to Valve Flow Calculations screen
    }

    if (title === 'Other Steam Calculations') {
      navigation.navigate('OtherSteamCalculations'); // Navigate to Other Steam Calculations screen
    }
  };

  // Render each grid item
  const renderItem = ({ item }) => (
    <GridItem
      title={item.title}
      icon={item.icon}
      onPress={() => handlePress(item.title)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Image
          style={styles.headerImage}
          source={require('../assets/smarttracker.png')} // Update the path based on your file location
          resizeMode="contain"
        /> */}
        <Text style={styles.headerText}>SMART TOOLKIT</Text>
      </View>

      {/* Grid Layout */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

// // Unit Conversion Component
// const UnitConversion = () => {
//   return (
//     <View style={styles.unitConversionContainer}>
//       <Text style={styles.unitConversionText}>
//         Unit Conversion Screen
//       </Text>
//     </View>
//   );
// };

// Main App Component with Stack Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} /> 
        {/**header text for home screen is set to false */}
        <Stack.Screen name="UnitConversion" component={UnitConversion} />
         {/* Unit Converison subcomponents */}
        <Stack.Screen name="Pressure" component={Pressure} />
        <Stack.Screen name="Temperature" component={Temperature} />
        <Stack.Screen name="SteamTables" component={SteamTables} />
        {/* Steam Tables subcomponents */}
        <Stack.Screen name="Saturated_Steam_Table_By_Pressure" component={Saturated_Steam_Table_By_Pressure} />
        <Stack.Screen name="SSTBPCalc" component={SSTBPCalc} />
        <Stack.Screen name="Saturated_Steam_Table_By_Temperature" component={Saturated_Steam_Table_By_Temperature} />
        <Stack.Screen name="SSTBTCalc" component={SSTBTCalc} />
         <Stack.Screen name="SteamPipeSizing" component={SteamPipeSizing} />
         {/* Steam Pipe Sizing subcomponents */}
         <Stack.Screen name="Pressure_Loss_For_Steam" component={Pressure_Loss_For_Steam} />
         <Stack.Screen name="Pressure_Loss_Calc" component={Pressure_Loss_Calc} />
         <Stack.Screen name="Velocity_For_Steam" component={Velocity_For_Steam} />
         <Stack.Screen name="Velocity_Calc" component={Velocity_Calc} />
       <Stack.Screen name="CondensatePipeSizing" component={CondensatePipeSizing} />
       {/* Condensate Pipe Sizing subcomponents */}
       <Stack.Screen name="Equipment_and_Trap" component={Equipment_and_Trap} />
       <Stack.Screen name="Calc" component={Calc} />
       <Stack.Screen name="Recovery_Line_By_Pressure_Loss" component={Recovery_Line_By_Pressure_Loss} />
       <Stack.Screen name="Calci" component={Calci} />
         <Stack.Screen name="HeatCalculations" component={HeatCalculations} />
         {/* Heat Calculations subcomponents */}
         <Stack.Screen name="Continuous" component={Continuous} />
         <Stack.Screen name="Continuous_Calc" component={Continuous_Calc} />
         <Stack.Screen name="Batch" component={Batch} />
         <Stack.Screen name="Batch_Calc" component={Batch_Calc} />
        <Stack.Screen name="ValveFlowCalculations" component={ValveFlowCalculations} />
        {/* Valve Flow Calculations subcomponents */}
        <Stack.Screen name="Cv_Kvs_Values" component={Cv_Kvs_Values} />
        <Stack.Screen name="Cv_Kvs_Calc" component={Cv_Kvs_Calc} />
        <Stack.Screen name="Steam_Flow_Rate_Valve" component={Steam_Flow_Rate_Valve} />
        <Stack.Screen name="Valve_Calc" component={Valve_Calc} />
        <Stack.Screen name="OtherSteamCalculations" component={OtherSteamCalculations} />
        {/* Other Steam Calculations subcomponents */}
        <Stack.Screen name="Pressure_Reduction" component={Pressure_Reduction} />
        <Stack.Screen name="Pressure_Reduction_Calc" component={Pressure_Reduction_Calc} />
        <Stack.Screen name="Drop_Based" component={Drop_Based} />
        <Stack.Screen name="Drop_Based_Calc" component={Drop_Based_Calc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#8465FF', // TLV branding color
    padding: 5,
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    alignItems: 'center',
    fontSize: 20,
    color: '#FFBFC0',
    fontWeight: 'bold', // Makes the text bold
  fontFamily: 'serif', // You can use custom fonts if added in the app
  letterSpacing: 2, // Adds spacing between letters for a stylish look
  textShadowColor: 'black', // Black shadow color
  textShadowOffset: { width: 9, height: 2 }, // Adds a subtle shadow effect
  textShadowRadius: 20, // Adjusts the blurriness of the shadow
  },
  gridContainer: {
    padding: 0,
    marginTop: 30,
  },
  gridItem: {
    flex: 1,
    margin: 20,
    // padding: 5,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 0,
    marginTop: -15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Centers the text horizontally
    flexWrap: 'wrap', // Allows text to wrap into multiple lines
    width: 150,
    color: 'black',
  },
  unitConversionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitConversionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
 headerImage: {

 }

});

export default App;
