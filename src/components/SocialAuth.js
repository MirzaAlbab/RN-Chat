// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/

// Import React in our code
import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setUser} from '../screen/Login/reducer/action';
import {useDispatch, useSelector} from 'react-redux';
const SocialAuth = ({navigation}) => {
  const {loading} = useSelector(state => state.global);

  const dispatch = useDispatch();

  useEffect(() => {
    // _isSignedIn();
  }, []);

  // const _isSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (isSignedIn) {
  //     alert('User is already signed in');
  //     // Set User Info if user is already signed in
  //     _getCurrentUserInfo();
  //   } else {
  //     console.log('Please Login');
  //   }
  //   setGettingLoginStatus(false);
  // };

  // const _getCurrentUserInfo = async () => {
  //   try {
  //     let info = await GoogleSignin.signInSilently();
  //     console.log('User Info --> ', info);
  //     setUserInfo(info);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //       alert('User has not signed in yet');
  //       console.log('User has not signed in yet');
  //     } else {
  //       alert("Unable to get user's info");
  //       console.log("Unable to get user's info");
  //     }
  //   }
  // };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUser(userInfo));
      navigation.navigate('Main');
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  // const _signOut = async () => {
  //   setGettingLoginStatus(true);
  //   // Remove user session from the device.
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     // Removing user Info
  //     setUserInfo(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setGettingLoginStatus(false);
  // };

  // if (gettingLoginStatus) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // } else {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 300, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={_signIn}
        />
      </View>
    </SafeAreaView>
  );
};
// };

export default SocialAuth;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});
