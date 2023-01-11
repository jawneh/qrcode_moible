/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/*
TODO
*/

import React from 'react';
import type {Node} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import QRCodeScannerScreen from './src/screens/QRCodeScannerScreen';
import RegistrationScreen from './src/screens/RegisterationScreen';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const primaryColor = '#2b1667';
const secondaryColor = '#cab992';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={primaryColor}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'QRCode Attendance System',
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: secondaryColor,
            },
          }}
        />
        <Stack.Screen
          name="QRCodeScanner"
          component={QRCodeScannerScreen}
          options={{
            title: 'Attendance QRCode Scanner',
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: secondaryColor,
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{title: 'Register your device'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
// export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
