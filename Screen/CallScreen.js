import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import InCallManager from 'react-native-incall-manager';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import * as Contacts from 'expo-contacts'; // Import Contacts from Expo

const { width } = Dimensions.get('window');
const buttonWidth = width / 3 - 20; // Calculate button width based on screen width

const CallScreen = () => {
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHold, setIsHold] = useState(false);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
      });
      if (data.length > 0) {
        // For simplicity, use the first contact in the array
        setContact(data[0]);
      }
    }
  };

  const toggleSpeaker = () => {
    InCallManager.setSpeakerphoneOn(!isSpeakerOn);
    setIsSpeakerOn(!isSpeakerOn);
  };

  const toggleMute = () => {
    if (isMuted) {
      InCallManager.setMicrophoneMute(false);
    } else {
      InCallManager.setMicrophoneMute(true);
    }
    setIsMuted(!isMuted);
  };

  const toggleHold = () => {
    if (isHold) {
      InCallManager.stop();
    } else {
      InCallManager.start({ media: 'audio', auto: false });
    }
    setIsHold(!isHold);
  };

  const handleAddCall = () => {
    // Logic to add another call
    console.log("Adding another call");
  };

  const handleKeypad = () => {
    // Logic to open keypad
    console.log("Opening keypad");
  };

  const handleEndCall = () => {
    InCallManager.stop();
    // Logic to end the call
    console.log("Ending the call");
  };

  const handleVideoCall = () => {
    // Logic to start a video call
    console.log("Starting video call");
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      {contact && contact.image && <Image source={{ uri: contact.image.uri }} style={styles.profilePic} />}
      {!contact?.image && <Image source={require('../assets/penguin.png')} style={styles.profilePic} />}

      {/* Name and Phone Number */}
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{contact?.name || 'Unknown'}</Text>
        <Text style={styles.phoneNumber}>{contact?.phoneNumbers?.[0]?.number || ''}</Text>
      </View>

      {/* Call Status */}
      <Text style={styles.callStatus}>00:45</Text>

      <View style={styles.buttonContainer}>
        {/* Speaker Button */}
        <TouchableOpacity style={styles.button} onPress={toggleSpeaker}>
          <Ionicons name={isSpeakerOn ? 'volume-high' : 'volume-mute'} size={24} color="white" />
          <Text style={styles.buttonText}>{isSpeakerOn ? 'Speaker Off' : 'Speaker On'}</Text>
        </TouchableOpacity>

        {/* Add Another Call Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddCall}>
          <Ionicons name="add-call" size={24} color="white" />
          <Text style={styles.buttonText}>Add Call</Text>
        </TouchableOpacity>

        {/* Keypad Button */}
        <TouchableOpacity style={styles.button} onPress={handleKeypad}>
          <Ionicons name="keypad" size={24} color="white" />
          <Text style={styles.buttonText}>Keypad</Text>
        </TouchableOpacity>

        {/* Mute Button */}
        <TouchableOpacity style={styles.button} onPress={toggleMute}>
          <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={24} color="white" />
          <Text style={styles.buttonText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
        </TouchableOpacity>

        {/* Hold Button */}
        <TouchableOpacity style={styles.button} onPress={toggleHold}>
          <Ionicons name={isHold ? 'pause' : 'play'} size={24} color="white" />
          <Text style={styles.buttonText}>{isHold ? 'Unhold' : 'Hold'}</Text>
        </TouchableOpacity>

        {/* Video Call Button */}
        <TouchableOpacity style={[styles.button, styles.videoCallButton]} onPress={handleVideoCall}>
          <Ionicons name="videocam" size={24} color="white" />
          <Text style={styles.buttonText}>Video Call</Text>
        </TouchableOpacity>

        {/* End Call Button */}
        <TouchableOpacity style={[styles.button, styles.endCallButton]} onPress={handleEndCall}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.buttonText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  phoneNumber: {
    fontSize: 25,
    color: 'white',
  },
  callStatus: {
    fontSize: 35,
    marginBottom: 80,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: buttonWidth,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
  },
  endCallButton: {
    backgroundColor: 'red',
  },
});

export default CallScreen;
