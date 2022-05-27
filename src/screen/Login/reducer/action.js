import {setLoading} from '../../../store/globalAction';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {navigate} from '../../../helper/navigate';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
export const SignInAuth = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  // auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then(e => {
  //     dispatch(setUser(e));
  //     dispatch(setLoading(false));
  //     navigate('Main');
  //   })
  //   .catch(() => {
  //     dispatch(setLoading(false));
  //     Alert.alert('Invalid credentials');
  //   });
  try {
    database()
      .ref('/users/')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          dispatch(setLoading(false));
          SimpleToast.show('Invalid email');
          return false;
        }
        const userData = Object.values(snapshot.val())[0];
        if (userData.password !== password) {
          dispatch(setLoading(false));
          SimpleToast.show('Invalid password');
          return false;
        }
        dispatch(setUser(userData));
        // console.log('User data: ', snapshot.val());
        dispatch(setLoading(false));
        SimpleToast.show('Login successfully');
        navigate('Main');
      });
  } catch (error) {
    console.log(error);
  }
};

export const setUser = payload => {
  return {
    type: 'SET_USER',
    payload,
  };
};
