import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const VelocityForSteam = () => {
  const [pipeGrade, setPipeGrade] = useState('DIN 2448');
  const [steamPressure, setSteamPressure] = useState('0');
  const [steamFlowRate, setSteamFlowRate] = useState('0');
  const [maxVeloctiy, setMaxVelocity] = useState('0');
  const [pipeLength, setPipeLength] = useState('0');
  const [unit, setUnit] = useState('mm');
  const [isValid, setIsValid] = useState(true); // State to track input validity
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Pipe Sizing By Velocity For Steam',
      headerTitleStyle: {
        fontSize: 16, // Set the desired font size here
      },
    });
  }, [navigation]);
  
  const handleCalculate = () => {
    // Navigate to SSTBCalc and pass the pressure and unit as route parameters
    //console.log('Navigate to PressureLossCalc with params:', steamPressure, unit);
    navigation.navigate('Velocity_Calc', { pressure: steamPressure, unit: unit });
  };

  const validateInput = (text) => {
    const validInputPattern = /^\d*\.?\d{0,}$/;
    return validInputPattern.test(text);
  };

  // The following 4 functions are written to validate inputs for individual input fields 
  const handleSteamPressureChange = (text) => {
    if (validateInput(text)) {
      setSteamPressure(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSteamFlowRateChange = (text) => {
    if (validateInput(text)) {
      setSteamFlowRate(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleMaxVelocityChange = (text) => {
    if (validateInput(text)) {
      setMaxVelocity(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handlePipeLengthChange = (text) => {
    if (validateInput(text)) {
      setPipeLength(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pipe Grade</Text>
        <Picker
          selectedValue={pipeGrade}
          onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="DIN 2448" value="DIN 2448" />
          {/* <Picker.Item label="Other Grade" value="Other" /> */}
        </Picker>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Steam Pressure</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={steamPressure}
          onChangeText={handleSteamPressureChange}
          //placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pipeGrade}
          onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="MPa abs" value="MPa abs" />
          <Picker.Item label="MPaG" value="MPaG" />
        </Picker>
        </View>
      </View>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Steam Flow Rate</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={steamFlowRate}
          onChangeText={handleSteamFlowRateChange}
          //placeholder="Enter Flow Rate"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pipeGrade}
          onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="kg/h" value="kg/h" />
        </Picker>
      </View>
      </View>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Maximum Allowable Velocity</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={maxVeloctiy}
          onChangeText={handleMaxVelocityChange}
          //placeholder="Enter Pressure Loss"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pipeGrade}
          onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="m/s" value="m/s" />
          <Picker.Item label="km/h" value="km/h" />
        </Picker>
      </View>
      </View>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pipe Length*</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={pipeLength}
          onChangeText={handlePipeLengthChange}
          //placeholder="Enter Length"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={pipeGrade}
          onValueChange={(itemValue) => setPipeGrade(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="m" value="m" />
          <Picker.Item label="cm" value="cm" />
        </Picker>
      </View>
      </View>
      </View>

      <Pressable style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </Pressable>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Equation(s) / Note(s)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  rowContainer: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputHalf: {
    flex: 0.7, // Adjust the size of the TextInput relative to the Picker
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10, // Adds space between TextInput and Picker
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  inputContainer: {
    marginVertical: -2,
  },
  label: {
    fontSize: 16,
    marginBottom: 2,
    color: 'black',
  },
  labelMax: {
    color: 'black',
    fontSize: 13.57,

  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 20,
    // paddingVertical: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },
  inputPicker: {
    flex: 0.5, // Adjust size of the Picker relative to the TextInput
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
  },
  button: {
    backgroundColor: '#BE2BFF',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default VelocityForSteam;
