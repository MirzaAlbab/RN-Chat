import React from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import analytics from '@react-native-firebase/analytics';

const Analytics = () => {
  const realtimeLogContent = () => {
    analytics().logSelectContent({
      content_type: 'Button Clicked',
      item_id: 'button1',
    });
  };

  const logCustomeEvent = () => {
    analytics().logEvent('my_custom_event', {
      id: 101,
      item: 'My Product Name',
      description: ['My Product Desc 1', 'My Product Desc 2'],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>React Native Firebase</Text>
        <Text style={styles.normalTextStyle}>#1 Firebase Analytics</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.normalTextStyle}>Log React Time Content</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={realtimeLogContent}>
            <Text style={styles.buttonTextStyle}>Click Button</Text>
          </TouchableOpacity>
          <Text style={styles.normalTextStyle}>Trigger My Custom Event</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={logCustomeEvent}>
            <Text style={styles.buttonTextStyle}>Create Custom Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
  },
  buttonStyle: {
    minWidth: 300,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  normalTextStyle: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
});
