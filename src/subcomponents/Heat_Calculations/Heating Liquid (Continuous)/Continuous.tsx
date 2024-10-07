import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Continuous = () => {
  
  const [liquidType, setliquidType] = useState('0');
  const [liquidFlowRate,setLiquidFlowRate ] = useState('0');
  const [liquidInletTemp,setLiquidInletTemp ] = useState('0');
  const [liquidOutletTemp,setLiquidOutletTemp] = useState('0');
  const [steamPressure,setSteamPressure] = useState('0');
  const [unit, setUnit] = useState('kg/h');
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Condensate Load From Heating Liquid (Continuous)',
      headerTitleStyle: {
        fontSize: 16, // Set the desired font size here
      },
    });
  }, [navigation]);
  
  const handleCalculate = () => {
    // Navigate to SSTBCalc and pass the pressure and unit as route parameters
    //console.log('Navigate to PressureLossCalc with params:', liquidType, unit);
    navigation.navigate('Continuous_Calc', { pressure: liquidType, unit });
  };

  const validateInput = (text) => {
    const validInputPattern = /^\d*\.?\d{0,}$/;
    return validInputPattern.test(text);
  };

 

  const handleLiquidFlowRateChange = (text) => {
    if (validateInput(text)) {
      setLiquidFlowRate(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleLiquidInletTempChange = (text) => {
    if (validateInput(text)) {
      setLiquidInletTemp(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleLiquidOutletTempChange = (text) => {
    if (validateInput(text)) {
      setLiquidOutletTemp(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSteamPressureChange = (text) => {
    if (validateInput(text)) {
      setSteamPressure(text);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelliquidtype}>Liquid type</Text>
        <Picker
          selectedValue={liquidType}
          onValueChange={(itemValue) => setliquidType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Water(fresh)" value="Water(fresh)" />
          <Picker.Item label="Water(sea)" value="Water(sea)" />
          <Picker.Item label="Kerosene" value="Kerosene" />
        </Picker>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Liquid Flow Rate</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={liquidFlowRate}
          onChangeText={handleLiquidFlowRateChange}
          // placeholder="Enter Pressure"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={liquidType}
          onValueChange={(itemValue) => setliquidType(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="m3/h" value="m3/h" />
          <Picker.Item label="l/h" value="l/h" />
        </Picker>
        </View>
      </View>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Liquid Inlet Temperature</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={liquidInletTemp}
          onChangeText={handleLiquidInletTempChange}
          placeholder="Enter Flow Rate"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={liquidType}
          onValueChange={(itemValue) => setliquidType(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="°C" value="°C" />
          <Picker.Item label="°F" value="°F" />
          <Picker.Item label="K" value="K" />
        </Picker>
      </View>
      </View>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Liquid Outlet Temperature</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={liquidOutletTemp}
          onChangeText={handleLiquidOutletTempChange}
          placeholder="Enter Pressure Loss"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={liquidType}
          onValueChange={(itemValue) => setliquidType(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="°C" value="°C" />
          <Picker.Item label="°F" value="°F" />
          <Picker.Item label="K" value="K" />
        </Picker>
      </View>
      </View>
      </View>

      <View  style={styles.rowContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Steam Pressure</Text>
        <View style={styles.row}>
        <TextInput
          style={styles.inputHalf}
          value={steamPressure}
          onChangeText={handleSteamPressureChange}
          placeholder="Enter Length"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={liquidType}
          onValueChange={(itemValue) => setliquidType(itemValue)}
          style={styles.inputPicker}
        >
          <Picker.Item label="MPaG" value="MPaG" />
          <Picker.Item label="kPaG" value="kPaG" />
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
    padding: 30,
    marginTop: -5,
  },
  inputContainer: {
    marginVertical: -10,
  },
  label: {
    fontSize: 16,
    marginBottom: -7,
    marginTop: 10,
    color: 'black',
  },
  labelliquidtype: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    // marginBottom: 20,

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
    marginBottom: 15,
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

export default Continuous;
