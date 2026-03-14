import DeviceInfo from 'react-native-device-info';

export const getAppVersion = () => {
  return DeviceInfo.getVersion(); // e.g. "1.0.0"
};
