import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SocialAuth from '../../components/SocialAuth';
import {useDispatch, useSelector} from 'react-redux';
import {SignInAuth} from './reducer/action';
import TouchAuth from '../../components/TouchAuth';
import {pressHandler} from '../../components/Fingerprint';
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading} = useSelector(state => state.global);
  const {User} = useSelector(state => state.login);
  const dispatch = useDispatch();

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleSignInClick = async () => {
    if (email === '' || password === '') {
      Alert.alert('Please fill in all fields');
    } else {
      dispatch(SignInAuth(email, password));
    }
  };
  useEffect(() => {
    if (User) {
      pressHandler();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: 'QuicksandBold',
            color: '#fff',
          }}>
          Log in
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
          returnKeyType="next"
        />

        <TextInput
          style={styles.password}
          defaultValue={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter Password"
          placeholderTextColor="grey"
          returnKeyType="go"
          secureTextEntry
          textContentType="password"
          keyboardType="default"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignInClick}>
            <Text
              style={{
                fontFamily: 'QuicksandBold',
                fontSize: 20,
                color: 'black',
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        )}

        {User ? <TouchAuth navigation={navigation} /> : null}

        <Text
          style={{
            paddingTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'QuicksandBold',
            fontSize: 16,
            color: 'white',
          }}>
          or Log in with
        </Text>
        <SocialAuth navigation={navigation} />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
            height: 30,
          }}
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'QuicksandBold',
              fontSize: 16,
              color: 'white',
            }}>
            Do not have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    borderRadius: 10,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    fontFamily: 'QuicksandBold',
    color: '#fff',
  },
  password: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 35,
    backgroundColor: '#0E0E52',
    padding: 10,
    fontSize: 18,
    fontFamily: 'QuicksandBold',
    color: '#fff',
  },

  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#0ff1',
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

  forgot: {
    fontFamily: 'QuicksandBold',
    color: '#fff',
    fontSize: 18,
  },

  forgotContainer: {
    top: -20,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
