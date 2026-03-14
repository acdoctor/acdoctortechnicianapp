// import remoteConfig from '@react-native-firebase/remote-config';
// import DeviceInfo from 'react-native-device-info';
// import { Platform } from 'react-native';

// export const checkForceUpdate = async () => {
//   try {
//     await remoteConfig().setDefaults({
//       android_force_update_version: '1.0.0',
//       ios_force_update_version: '1.0.0',
//       force_update_enabled: true,
//     });

//     await remoteConfig().fetch(0);
//     await remoteConfig().activate();

//     const isForceEnabled = remoteConfig().getBoolean('force_update_enabled');

//     if (!isForceEnabled) return false;

//     const currentVersion = DeviceInfo.getVersion();

//     const requiredVersion =
//       Platform.OS === 'android'
//         ? remoteConfig().getString('android_force_update_version')
//         : remoteConfig().getString('ios_force_update_version');
//     console.log('upadet ');
//     return compareVersions(currentVersion, requiredVersion);
//   } catch (e) {
//     console.log('asdasdsadas ');

//     console.log('Force update error', e);
//     return false;
//   }
// };

// // 🔢 version compare logic
// const compareVersions = (current, required) => {
//   const c = current.split('.').map(Number);
//   const r = required.split('.').map(Number);

//   for (let i = 0; i < r.length; i++) {
//     if ((c[i] || 0) < r[i]) return true;
//     if ((c[i] || 0) > r[i]) return false;
//   }
//   return false;
// };

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const forceUpdate = () => {
  return (
    <View>
      <Text allowFontScaling={false}>forceUpdate</Text>
    </View>
  );
};

export default forceUpdate;

const styles = StyleSheet.create({});
