import remoteConfig from '@react-native-firebase/remote-config';

export const initRemoteConfig = async () => {
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 0, // 👈 FORCE fetch every launch
  });
  await remoteConfig().setDefaults({
    force_update: true,
    latest_version_android: '1.0.0',
    latest_version_ios: '1.0.0',
    update_message: 'Please update the app',
  });

  await remoteConfig().fetchAndActivate();
};
