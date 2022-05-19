import React, {useEffect} from 'react';
import Root from './src/routes/Root';
import {Provider} from 'react-redux';
import {persistedStore, store} from './src/store';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PersistGate} from 'redux-persist/integration/react';
GoogleSignin.configure({
  webClientId:
    '893578154504-8gjpkl6qecjjbimagfsca9eota69o7a6.apps.googleusercontent.com',
});

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
