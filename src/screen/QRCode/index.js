// Barcode and QR Code Scanner using Camera in React Native
// https://aboutreact.com/react-native-scan-qr-code/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

// import CameraKitCameraScreen
import {CameraScreen} from 'react-native-camera-kit';

const QRCode = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setOpneScanner(true);
        setQrvalue('');
      } else {
        alert('Camera permission denied');
      }
    } catch (err) {
      alert('Camera permission err', err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {opneScanner ? (
        <View style={{flex: 1}}>
          <CameraScreen
            // Barcode props
            scanBarcode={true}
            onReadCode={event =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            } // optional
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor="red" // (default red) optional, color of laser in scanner frame
            frameColor="white" // (default white) optional, color of border of scanner frame
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleText}>Barcode and QR Code Scanner</Text>
          <TouchableOpacity
            onPress={requestCameraPermission}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
          </TouchableOpacity>
          {qrvalue ? (
            <Text style={{marginTop: 16, color: 'white', marginBottom: -16}}>
              Scanned Result:{' '}
            </Text>
          ) : null}
          <Text style={styles.textStyle}>{qrvalue ? qrvalue : ''}</Text>
          {qrvalue.includes('https://') ||
          qrvalue.includes('http://') ||
          qrvalue.includes('geo:') ? (
            <TouchableOpacity onPress={onOpenlink}>
              <Text style={styles.textLinkStyle}>
                {qrvalue.includes('geo:') ? 'Open in Map' : 'Open in Browser'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
};
export default QRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B368E',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    padding: 5,
    minWidth: 250,
    marginTop: 16,
    borderRadius: 5,
    width: '80%',
    backgroundColor: '#1da',
  },
  buttonTextStyle: {
    padding: 5,
    color: 'black',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'black',
    width: '100%',
    backgroundColor: '#1da',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    padding: 10,
    marginTop: -16,
  },
});
