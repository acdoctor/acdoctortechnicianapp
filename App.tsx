import {
  Alert,
  Linking,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import AppNavigator from './src/Naviagtion/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';
import Toast from 'react-native-toast-message';
import { checkAppUpdate } from './src/utils/checkAppUpdate';
import { getAppVersion } from './src/utils/appVersion';
import remoteConfig from '@react-native-firebase/remote-config';
import { isUpdateRequired } from './src/utils/versionCompare';
import { initRemoteConfig } from './src/Services/remoteConfig';
import NotificationService from './src/NotifactionsServices/notificationService';
const App = () => {
  useEffect(() => {
    // ✅ Force font scale to normal
    const fontScale = PixelRatio.getFontScale();

    if (fontScale !== 1) {
      PixelRatio.getFontScale = () => 1;
    }
    // await checkForceUpdate()
    const init = async () => {
      await initRemoteConfig();
      await checkForceUpdate();
      NotificationService.init();
    };

    init();
  }, []);

  const checkForceUpdate = async () => {
    const currentVersion = getAppVersion();

    const forceUpdate = remoteConfig().getBoolean('force_update');
    const latestVersion =
      Platform.OS === 'android'
        ? remoteConfig().getString('latest_version_android')
        : remoteConfig().getString('latest_version_ios');

    const updateMessage = remoteConfig().getString('update_message');
    const storeUrl =
      Platform.OS === 'android'
        ? remoteConfig().getString('android_store_url')
        : remoteConfig().getString('ios_store_url');

    console.log(storeUrl, '------------------------------>>>>>>>');
    if (forceUpdate && isUpdateRequired(currentVersion, latestVersion)) {
      Alert.alert(
        'Update Available',
        updateMessage,
        [
          {
            text: 'Update Now',
            onPress: () => Linking.openURL(storeUrl),
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <>
      <LanguageProvider>
        <AppNavigator />
      </LanguageProvider>
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
