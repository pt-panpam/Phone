import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TextInput, PermissionsAndroid } from 'react-native';
import CallLog from 'react-native-call-log';

const CallHistoryScreen = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    requestCallLogPermission();
  }, []);

  const requestCallLogPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Permission',
          message: 'This app needs access to your call logs to display call history.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchCallHistory();
      } else {
        console.log('Call log permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchCallHistory = async () => {
    try {
      const callLogs = await CallLog.getCallLogs({
        limit: 20,
        offset: 0,
        sortOrder: 'desc',
      });
      setCallHistory(callLogs);
    } catch (error) {
      console.error('Failed to fetch call history:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.callItem}>
      <Image source={require('../assets/penguin.png')} style={styles.callIcon} />
      <View style={styles.callInfo}>
        <Text style={styles.callName}>{item.name}</Text>
        <Text style={styles.callType}>{item.type}</Text>
      </View>
    </View>
  );

  const filteredCallHistory = callHistory.filter((call) =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call History</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search call history..."
        placeholderTextColor="white"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filteredCallHistory}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.callList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: width,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  searchInput: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },
  callList: {
    flexGrow: 1,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  callIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontWeight: 'bold',
    color: 'white',
  },
  callType: {
    color: 'white',
  },
});

export default CallHistoryScreen;
