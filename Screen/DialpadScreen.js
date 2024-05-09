import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

const DialpadScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNumberPress = (number) => {
    setPhoneNumber(phoneNumber + number);
  };

  const handleDeletePress = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };

  const handleCallPress = () => {
    if (phoneNumber.trim() !== '') {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
              <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.keyboardContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('*')}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('#')}>
            <Text style={styles.buttonText}>#</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row1}>
          <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align content at the bottom
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    
  },
  inputContainer: {
    flexDirection: 'row',
    width: '85%',
    marginBottom: 50,
      alignItems: 'center',
     justifyContent:'space-between',
  },
  phoneNumber: {
    fontSize: 45,
      color: 'white',
      fontWeight: "bold",
      marginLeft: 70,
  },
  keyboardContainer: {
    flexDirection: 'column',
    width: '85%',
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    width: '100%',
    },
   row1: {
    flexDirection: 'row',
    marginBottom: 75,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: width * 0.15, // Make button round
    height: width * 0.16, // Make button square
    width: width * 0.16, // Make button square
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold', // Make text bold
    color: 'white',
  },
    deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red', // Set button background to red
    borderRadius: width * 0.15, // Make button round
    height: width * 0.10, // Make button square
    width: width * 0.10, // Make button square
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: 'bold', // Make text bold
    color: 'black', // Set text color to black
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green', // Set button background to green
    borderRadius: width * 0.15, // Make button round
    height: width * 0.20, // Make button square
    width: width * 0.20, // Make button square
      alignSelf: 'center', // Align the call button to the center horizontally
    marginTop:25,
  },
  callButtonText: {
    fontSize: 20,
    fontWeight: 'bold', // Make text bold
    color: 'black', // Set text color to black
  },
});



export default DialpadScreen;
