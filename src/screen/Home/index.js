import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../Login/reducer/action';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CloudMessage from '../../components/CloudMessage';
export default function Home({navigation}) {
  const dispatch = useDispatch();
  const {User} = useSelector(state => state.login);
  const {loading} = useSelector(state => state.global);
  const [image, setImage] = useState(
    'https://bootdey.com/img/Content/avatar/avatar1.png',
  );
  const logCustomEvent = () => {
    analytics().logEvent('my_custom_event', {
      id: 101,
      item: 'My Product Name',
      description: ['My Product Desc 1', 'My Product Desc 2'],
    });
  };

  const signOutGoogle = async () => {
    // await GoogleSignin.signOut().then(() => {
    //   navigation.navigate('Login');
    //   dispatch(setUser({}));
    // });
    try {
      await GoogleSignin.signOut();
      dispatch(setUser(null));
      navigation.navigate('Login'); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    Alert.alert(
      'Sign Out',
      'Do you want to continue?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(setUser(null));
            navigation.navigate('Login');
            // if (!User.idToken) {
            //   auth()
            //     .signOut()
            //     .then(() => {
            //       navigation.navigate('Login');
            //       dispatch(setUser(null));
            //     });
            // }
            // if (User.idToken) {
            //   signOutGoogle();
            // }
          },
        },
      ],
      {cancelable: false},
    );
  };
  // useEffect(() => {
  //   if (User) {
  //     setImage(
  //       User?.img ?? 'https://bootdey.com/img/Content/avatar/avatar1.png',
  //     );
  //   }
  // });
  if (loading) {
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: image,
              }}
            />
            {User ? (
              <Text style={styles.name}>{User.email ?? User.email}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.menuBox}>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://img.icons8.com/color/70/000000/map.png',
              }}
            />
            <Text style={styles.info}>Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuBox}>
          <TouchableOpacity onPress={() => crashlytics().crash()}>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://img.icons8.com/flat_round/70/000000/cow.png',
              }}
            />
            <Text style={styles.info}>Crashlytic</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuBox}>
          <TouchableOpacity onPress={logCustomEvent}>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://img.icons8.com/color/70/000000/coworking.png',
              }}
            />
            <Text style={styles.info}>Analytics</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuBox}>
          <TouchableOpacity
            onPress={async () =>
              await analytics().logEvent('basket', {
                id: 3745092,
                item: 'mens grey t-shirt',
                description: ['round neck', 'long sleeved'],
                size: 'L',
              })
            }>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://img.icons8.com/color/70/000000/coworking.png',
              }}
            />
            <Text style={styles.info}>Analytics</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuBox}>
          <TouchableOpacity onPress={signOut}>
            <Image
              style={styles.icon}
              source={{
                uri: 'https://img.icons8.com/color/70/000000/shutdown.png',
              }}
            />
            <Text style={styles.info}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {/* <CloudMessage /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B368E',
  },
  header: {
    backgroundColor: '#2B368E',
    width: '100%',
    borderRadius: 5,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  menuBox: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    borderRadius: 10,
  },
  icon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  info: {
    fontSize: 22,
    color: '#696969',
  },
});
