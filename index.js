/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import 'react-native-gesture-handler';

// Background handler for notifee
notifee.onBackgroundEvent(async ({ type, detail }) => {});

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // Message handled in the background!
});

AppRegistry.registerComponent(appName, () => App);
