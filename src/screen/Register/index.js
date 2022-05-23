import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  //Handles email input
  const handleEmailChange = text => {
    setEmail(text);
  };

  //Handles password input
  const handlePasswordChange = text => {
    setPassword(text);
  };

  //Handles confirm password input
  const handleUsernameChange = text => {
    setUsername(text);
  };

  //Handles sign up
  const handleSubmit = async () => {
    if (email === '' || password === '') {
      Alert.alert('Please fill in all fields');
      return false;
    }
    let data = {
      id: uuid.v4(),
      username: username,
      email: email,
      password: password,
      img: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    };

    database()
      .ref('/users/' + data.id)
      .set(data)
      .then(() => {
        SimpleToast.show('Register successfully');
        navigation.navigate('Login');
      });

    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     navigation.navigate('Login');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/invalid-email') {
    //       Alert.alert('That email address is invalid!');
    //     } else {
    //       Alert.alert('Sign up failed. Please try again.');
    //     }
    //   });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={{fontSize: 40, fontFamily: 'QuicksandBold', color: '#fff'}}>
          Create Account
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.email}
          defaultValue={email}
          onChangeText={handleEmailChange}
          textContentType="emailAddress"
          placeholder="Email Address"
          placeholderTextColor="grey"
          keyboardType="email-address"
          returnKeyType="next"
        />

        <TextInput
          style={styles.email}
          defaultValue={username}
          onChangeText={handleUsernameChange}
          textContentType="username"
          placeholder="Username"
          placeholderTextColor="grey"
          keyboardType="default"
          returnKeyType="next"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.password}
            defaultValue={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter Password"
            placeholderTextColor="grey"
            returnKeyType="next"
            secureTextEntry
            textContentType="password"
            keyboardType="default"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text
            style={{fontFamily: 'QuicksandBold', fontSize: 20, color: 'black'}}>
            SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            height: 30,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'QuicksandBold',
              fontSize: 16,
              color: 'white',
            }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#2B368E',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    marginBottom: 40,
    top: -20,
  },
  form: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: -40,
  },
  email: {
    width: '100%',
    height: 60,
    backgroundColor: '#0E0E52',
    borderRadius: 5,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    fontFamily: 'QuicksandBold',
    color: '#fff',
  },
  password: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    fontFamily: 'QuicksandBold',
    color: '#fff',
  },

  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#0E0E52',
    borderRadius: 5,
    marginBottom: 35,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFB600',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    padding: 10,
  },

  register: {
    fontFamily: 'QuicksandBold',
    color: '#fff',
    fontSize: 18,
  },
  registerContainer: {
    top: -20,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
