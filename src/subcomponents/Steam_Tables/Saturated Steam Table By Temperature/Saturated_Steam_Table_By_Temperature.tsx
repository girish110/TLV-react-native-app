import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const SaturatedSteamTableByTemperature = () => {
  const [isValid, setIsValid] = useState(true);
  const [temperature, settemperature] = useState('1');
  const [unit, setUnit] = useState('°C');
  const pickerRef = useRef(); // Ref to trigger picker dropdown programmatically
  const navigation = useNavigation();

  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Saturated Steam Table By Temperature',
    });
  }, [navigation]);

  const handleCalculate = () => {
    // Navigate to SSTBCalc and pass the pressure and unit as route parameters
    // navigation.navigate('SSTBTCalc', { temperature: parseFloat(temperature), unit });
    let valid=true;
    if (unit === '°F' && (temperature <= 32 || temperature > 1472)) {
      // Show error alert if temperature is outside the valid range
      valid=false;
      Alert.alert(
        'Error',
        'Please enter a fahrenheit between 32°F and 1472°F.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      
    }
    else if (unit === '°C' && (temperature <= 0 || temperature >= 801)) {
        // Show error alert if temperature is outside the valid range
        valid=false;
        Alert.alert(
          'Error',
          'Please enter a celsius between 0°C and 800°C.',
          [{ text: 'OK' }],
          { cancelable: true }
        );
      }

      else if (unit === 'K' && (temperature <= 273.15 || temperature >= 1073.15)) {
        // Show error alert if temperature is outside the valid range
        valid=false;
        Alert.alert(
          'Error',
          'Please enter Kelvin Value between 273.15 and 1073.15.',
          [{ text: 'OK' }],
          { cancelable: true }
        );
      }
      
      if (!valid) {
        setIsValid(false); // Set input as invalid if validation fails
        return; // Exit function if the input is invalid
      }
      setIsValid(true); // If everything is valid, set the input as valid
      navigation.navigate('SSTBTCalc', { temperature: parseFloat(temperature), unit });
    

    // else{
    //   navigation.navigate('SSTBTCalc', { temperature: parseFloat(temperature), unit });
    // }
    
  };

  const handleTempratureChange = (text) => {
    // Regular expression to validate the input:
    // - Only allows numbers, up to one decimal point, and one optional leading negative sign
    const validInputPattern = /^-?\d*\.?\d{0,}$/;

    // Check if the input matches the valid pattern
    if (validInputPattern.test(text)) {
      settemperature(text); // Update state only if the input is valid
      setIsValid(true);  // Set input as valid
    } else {
      setIsValid(false); // Set input as invalid
    }
  };

  const openPicker = () => {
    if (pickerRef.current) {
      pickerRef.current.togglePicker(); // Open picker programmatically
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label,!isValid && styles.labelInvalid]}>Steam Temperature</Text>
        <TextInput
          style={styles.input}
          value={temperature}
          onChangeText={handleTempratureChange}
          keyboardType="numeric"
        />

        {/* <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}> */}
          <Text style={styles.unitLabel}>{unit}</Text>
          <RNPickerSelect
            ref={pickerRef}
            onPress={openPicker}
            onValueChange={(value) => setUnit(value)}
            items={[
              { label: '°C', value: '°C' },
              { label: '°F', value: '°F' }, 
              { label: 'K', value: 'K' }, 
              // Add other units as needed
            ]} 
            style={pickerSelectStyles}
            value={unit}
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
  labelInvalid: {
    color: 'red', // Highlight the label in red when input is invalid
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
    marginRight: 20, // Space between label and picker
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
    borderWidth: 4,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    width: '30%',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default SaturatedSteamTableByTemperature;
