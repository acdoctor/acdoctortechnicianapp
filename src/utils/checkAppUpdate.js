import remoteConfig from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';
import { Alert, Linking, Platform } from 'react-native';

export const checkAppUpdate = async navigation => {
  try {
    // await remoteConfig().fetchAndActivate();

    const currentVersion = DeviceInfo.getVersion();

    const latestVersion =
      Platform.OS === 'android'
        ? remoteConfig().getValue('android_latest_version').asString()
        : remoteConfig().getValue('ios_latest_version').asString();

    const title =
      remoteConfig().getValue('update_title').asString() || 'Update Available';

    const message =
      remoteConfig().getValue('update_message').asString() ||
      'Please update the app.';

    const updateUrl =
      Platform.OS === 'android'
        ? remoteConfig().getValue('update_url_android').asString()
        : remoteConfig().getValue('update_url_ios').asString();

    const forceUpdate = remoteConfig().getValue('force_update').asBoolean();

    console.log('Title:', title);
    console.log('Message:', updateUrl);

    if (currentVersion !== latestVersion) {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Update',
            onPress: () => Linking.openURL(updateUrl),
          },
        ],
        { cancelable: !forceUpdate },
      );
    }
  } catch (error) {
    console.log('Update Error:', error);
  }
};

// import remoteConfig from '@react-native-firebase/remote-config';
// import DeviceInfo from 'react-native-device-info';
// import { Platform } from 'react-native';
// import { replace } from '../Naviagtion/RootNavigation';

// export const checkAppUpdate = async () => {
//   try {
//     // await remoteConfig().fetchAndActivate();

//     const currentVersion = DeviceInfo.getVersion();

//     const latestVersion =
//       Platform.OS === 'android'
//         ? remoteConfig().getString('android_latest_version')
//         : remoteConfig().getString('ios_latest_version');

//     const title =
//       remoteConfig().getValue('update_title').asString() || 'Update Available';

//     const message =
//       remoteConfig().getValue('update_message').asString() ||
//       'Please update the app.';

//     const updateUrl =
//       Platform.OS === 'android'
//         ? remoteConfig().getValue('update_url_android').asString()
//         : remoteConfig().getValue('update_url_ios').asString();

//     const forceUpdate = remoteConfig().getValue('force_update').asBoolean();
//     console.log(latestVersion, ';;;;');
//     console.log(forceUpdate);
//     console.log(updateUrl);
//     console.log(latestVersion);
//     if (currentVersion !== latestVersion) {
//       replace('UpdateScreen', {
//         title,
//         message,
//         updateUrl,
//         forceUpdate,
//       });
//     }
//   } catch (error) {
//     console.log('Update Error:', error);
//   }
// };
