/**
 *@format
 */
import React, {useState} from 'react';
import axios from 'axios';
import {request, PERMISSIONS} from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import DeviceInfo from 'react-native-device-info';
import {RNCamera} from 'react-native-camera';

import {
  View,
  Text,
  ScrollView,
  Button,
  Platform,
  TextInput,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
} from 'react-native';

const QRCodeScannerScreen = () => {
  const baseURL = 'https://umar-qrcode.herokuapp.com';
  const [loading, setLoading] = useState(false);

  const onSuccess = async e => {
    setLoading(true);
    const qr_code_data = JSON.parse(e.data);
    const {id} = qr_code_data;
    let mac_address = await DeviceInfo.getMacAddress();
    // mac_address = mac_address.toString();
    console.log(mac_address);
    // console.log(JSON.stringify(mac_address));

    try {
      const {data} = await axios.post(`${baseURL}/attendance/mark`, {
        id,
        mac_address,
      });
      if (data) {
        Alert.alert('Attendance', 'Successfully marked', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        setLoading(false);
        throw new Error('failed to mark attendance');
      }
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setLoading(false);
      Alert.alert('Attendance', message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };
  return (
    <ScrollView>
      <View>
        {loading ? (
          <Text> Marking attendance</Text>
        ) : (
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            fadeIn={true}
            showMarker={true}
            cameraProps={{captureAudio: false}}
            permissionDialogTitle={'hello'}
            permissionDialogMessage={'Need camera'}
            topContent={
              <Text style={styles.centerText}>
                <Text style={styles.textBold}>
                  Scan and register attendance
                </Text>
                QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>
                  Scan and register attendance
                </Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRCodeScannerScreen;
