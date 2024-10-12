import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Calc = () => {
  const route = useRoute();
  const { pressure: initialPressure, unit: initialUnit } = route.params;
  const [pressure, setPressure] = useState(initialPressure);
  const [unit, setUnit] = useState(initialUnit);
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const [ pipeSize, setPipeSize] = useState('DN6');
  const navigation = useNavigation();
  


  useLayoutEffect(() => {
    if (initialPressure) setPressure(initialPressure.toString()); // Convert to string for TextInput
    if (initialUnit) setUnit(initialUnit);
    navigation.setOptions({
      title: 'Result',
    });
  }, [navigation]);

  useEffect(() => {
    setPressure(initialPressure);
    setUnit(initialUnit);
  }, [initialPressure, initialUnit]);
  
  // Calculation functions for Saturated Steam Temperature, Latent Heat, and Enthalpy
  
  const calculatePipeInnerDiameter = () => {
    switch (unit) {
      case 'MPa abs':
        return 179.886 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 38.7197 * pressure; // Adjust for pressure input
      default:
        return NaN;
    }
  };

  const calculateSteamVelocity = () => {
    switch (unit) {
      case 'MPa abs':
        return 2014.44 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 2409.06 * pressure; // Adjust for pressure input
      default:
        return NaN;
    }
  };
/*
  const calculateEnthalpy = () => {
    switch (unit) {
      case 'MPa abs':
        return 2777.12 * pressure; // Adjust for pressure input
      case 'psi abs':
        return 2571.25 * pressure; // Adjust for pressure input
      default:
        return NaN;
    }
  }; 
  */

  return (
    <ScrollView style={styles.container}>
    {/* <View style={styles.container}> */}
      <Text style={styles.title}>Calculated Results </Text>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <View style={styles.customInputRow}>
      <Text style={styles.pipeSizeLabel}>Pipe Size </Text>
        <Picker
          selectedValue={unit}
          onValueChange={(itemValue) => setSelectedUnit(itemValue)}
          style={styles.customInputPicker}
        >
          <Picker.Item label="DN6" value="DN6" />
        </Picker>
        {/* </View> */}
        </View>
    </View>
    </View>

    <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Pipe Inner Diameter</Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculatePipeInnerDiameter().toFixed(2)}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="mm" value="mm" />
        </Picker>
        </View>
    </View>
    </View>

    <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Condensate and Flash Steam Velocity </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateSteamVelocity().toFixed(2)}
          editable={false} 
          keyboardType="numeric"
        />
        {/* <View style={styles.pickerWrapper}> */}
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="m/s" value="m/s" />
          <Picker.Item label="km/h" value="km/h" />
        </Picker>
        {/* </View> */}
        </View>
      {/* <Text style={styles.result}>
        Saturated Steam Temperature: {calculateSteamTemperature().toFixed(2)} °C
      </Text>
      <Text style={styles.result}>
        Latent Heat of Steam: {calculateLatentHeat().toFixed(2)} kJ/kg
      </Text>
      <Text style={styles.result}>
        Specific Enthalpy of Saturated Steam: {calculateEnthalpy().toFixed(2)} kJ/kg 
      </Text>*/}
    </View>
    </View>

    <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Pressure Loss </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateSteamVelocity().toFixed(2)}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        {/* <View style={styles.pickerWrapper}> */}
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="kPa" value="kPa" />
          <Picker.Item label="MPa" value="MPa" />
        </Picker>
        {/* </View> */}
        </View>
      {/* <Text style={styles.result}>
        Saturated Steam Temperature: {calculateSteamTemperature().toFixed(2)} °C
      </Text>
      <Text style={styles.result}>
        Latent Heat of Steam: {calculateLatentHeat().toFixed(2)} kJ/kg
      </Text>
      <Text style={styles.result}>
        Specific Enthalpy of Saturated Steam: {calculateEnthalpy().toFixed(2)} kJ/kg 
      </Text>*/}
    </View>
    </View>
    
    <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.result}>Equivalent Length of Straight Pipe </Text>
      <View style={styles.inputRow}>
      <TextInput
          style={[styles.inputHalf, { color: '#9083FF' } ]}
          value={calculateSteamVelocity().toFixed(2)}
          editable={false} 
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        {/* <View style={styles.pickerWrapper}> */}
        <Picker
          selectedValue={pressure}
          // onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="m" value="m" />
          <Picker.Item label="cm" value="cm" />
        </Picker>
        {/* </View> */}
        </View>
      {/* <Text style={styles.result}>
        Saturated Steam Temperature: {calculateSteamTemperature().toFixed(2)} °C
      </Text>
      <Text style={styles.result}>
        Latent Heat of Steam: {calculateLatentHeat().toFixed(2)} kJ/kg
      </Text>
      <Text style={styles.result}>
        Specific Enthalpy of Saturated Steam: {calculateEnthalpy().toFixed(2)} kJ/kg 
      </Text>*/}
    </View>
    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 5,
    // justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#BE2BFF',
    alignSelf: 'center',
    marginTop: 10,
  },
  result: {
    fontSize: 16,
    marginBottom: -2,
    color: '#333',
  },

  rowContainer: {
    marginVertical: 40,
    paddingTop: 10,
  },
  inputContainer: {
    marginVertical: -60,
  },
  inputHalf: {
    flex: 0.6, // Adjust the size of the TextInput relative to the Picker
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginRight: 10, // Adds space between TextInput and Picker
    // paddingTop: 20,
  },
  inputPicker: {
    flex: 0.5, // Adjust size of the Picker relative to the TextInput
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },
  inputRow: {
    flexDirection: 'row', // Aligns TextInput and Picker horizontally
    alignItems: 'center', // Vertically centers the elements
    paddingTop: 0,
    // paddingEnd: 10,
  },
customInputRow: {
   flexDirection: 'column', // Aligns TextInput and Picker horizontally
    alignItems: 'center', // Vertically centers the elements
    // justifyContent: 'space-between',
    paddingTop: 0,
    marginBottom: 50,
},
customInputPicker: {
  paddingLeft: 5,
  flex: 0.5, // Adjust size of the Picker relative to the TextInput
  height: 50,
  borderColor: '#ccc',
  borderWidth: 10,
  width: 350 ,
  borderBottomWidth: 20,
  borderRadius: 5,
  backgroundColor: 'lightgrey',
},
pipeSizeLabel: {
  fontSize: 16,
  color: '#333',
  marginBottom: 4, // Increased margin for spacing
  alignSelf: 'flex-start',
},
});


export default Calc;
