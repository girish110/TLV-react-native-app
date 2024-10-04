import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';


const SaturatedSteamTableByPressure = () => {
  const [pressure, setPressure] = useState('1');
  const [unit, setUnit] = useState('MPa abs');
  const pickerRef = useRef(); // Ref to trigger picker dropdown programmatically
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Saturated Steam Table By Pressure',
      headerTitleStyle: {
        fontSize: 18, // Set the desired font size here
      },
    });
  }, [navigation]);

  const handleCalculate = () => {
    // Navigate to SSTBCalc and pass the pressure and unit as route parameters
    navigation.navigate('SSTBPCalc', { pressure: parseFloat(pressure), unit });
  };

  const openPicker = () => {
    if (pickerRef.current) {
      pickerRef.current.togglePicker(); // Open picker programmatically
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Steam Pressure</Text>
        <TextInput
          style={styles.input}
          value={pressure}
          onChangeText={(text) => setPressure(text)}
          keyboardType="numeric"
        />

        {/* <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}> */}
          <Text style={styles.unitLabel}>{unit}</Text>
          <RNPickerSelect
            // ref={pickerRef}
            onPress={openPicker}
            onValueChange={(value) => setUnit(value)}
            items={[
              { label: 'MPa abs', value: 'MPa abs' },
              { label: 'psi abs', value: 'psi abs' }, // Add psi abs
              // Add other units as needed
            ]}
            style={pickerSelectStyles}
            Value={unit}
            useNativeAndroidPickerStyle={true} // Prevent default native styling on Android
            
          />
        {/* </TouchableOpacity> */}
      </View>
      <View style={{marginTop: 40}}>
        <Button title="Calculate" 
        onPress={handleCalculate}
        color="#BE2BFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#999',
    width: '30%',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitLabel: {
    fontSize: 16,
    color: '#BE2BFF',
    marginRight: 15, // Space between label and picker
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    width: '30%',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    width: '30%',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default SaturatedSteamTableByPressure;
