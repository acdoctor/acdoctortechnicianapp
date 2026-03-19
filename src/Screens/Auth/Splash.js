import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
import { Style, Styles } from './Style';
import images from '../../assets/Images/images';
import { useNavigation } from '@react-navigation/native';
import { loadLanguage } from '../../components/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import { jwtDecode } from 'jwt-decode';
import { checkAppUpdate } from '../../utils/checkAppUpdate';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    loadLanguage();
    checkNavigation();
  }, []);

  const checkNavigation = async () => {
    try {
      const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');
      // const refershtoken = await AsyncStorage.getItem('REFRESH_TOKEN');
      console.log(accestoken, 'token for refresh');
      // console.log(a)
      if (!accestoken) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'WelcomeScreen' }],
          });
        }, 2000);
      } else {
        const decodedToken = jwtDecode(accestoken);
        try {
          const response = await apiService.get(
            `/technician/profile/${decodedToken?._id}`,

            {
              headers: {
                Authorization: `Bearer ${accestoken}`,
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(response, 'response for first API');
          if (response?.status === true) {
            console.log(response?.data, 'Spash logic');
            await AsyncStorage.setItem('name', response?.data?.name);
            await AsyncStorage.setItem(
              'profileImage',
              response?.data?.profilePhoto,
            );
            if (response?.data?.status === 'SIGNED_UP') {
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'RegisterForm' }],
                });
              }, 2000);
            } else if (response?.data?.status === 'PROFILE_CREATED') {
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'KycVerifcation' }],
                });
              }, 2000);
            } else if (response?.data?.status === 'KYC_PENDING') {
              if (response?.data?.kycStatus === 'REQUESTED') {
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'KycVerifcation' }],
                  });
                }, 2000);
              } else {
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'KycPending' }],
                  });
                }, 2000);
              }
            } else if (response?.data?.status === 'REJECTED') {
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'KycRejected' }],
                });
              }, 2000);
            } else if (response?.data?.status === 'DISABLED') {
              setTimeout(() => {
                Alert.alert(
                  'Your account has been temporarily disabled. Kindly contact customer care for assistance.',
                );
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Help' }],
                });
              }, 2000);
            } else if (response?.data?.status === 'AVAILABLE') {
              await AsyncStorage.setItem('Type', response?.data?.type);
              // Alert.alert('pop');
              await AsyncStorage.setItem('helper', response?.data?.position);
              if (response?.data?.type === 'ACD') {
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigator' }],
                  });
                }, 2000);
              } else if (response?.data?.type === 'FC') {
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'ContractorBottom' }],
                  });
                }, 2000);
              }
            }
          } else if (response?.status === false) {
            Alert?.alert(response?.message);
          }
        } catch (error) {
          if (error?.message === 'Invalid or expired token') {
            getRefreshtoken();
          } else {
            Alert?.alert(error?.message);
          }
          // Alert.alert("jaqtqain", error?.message)
        }
      }
    } catch (error) {
      console.log('Splash Error:', error);
    }
  };
  const getRefreshtoken = async () => {
    try {
      const refershtoken = await AsyncStorage.getItem('REFRESH_TOKEN');
      console.log(refershtoken, 'refer');

      const res = await apiService.post('/technician/refresh-token', {
        token: refershtoken,
      });
      if (res.status === true) {
        // Alert.alert('Vaps hit hui Api', res?.assessToken);
        console.log(res, 'sachin bhiya');
        await AsyncStorage.setItem('ACCESS_TOKEN', res?.assessToken);
        // console.log(res?.assessToken, "asdjalks")
        checkNavigation();
      } else {
      }
    } catch (error) {
      console.log(error, 'error fro refresh token');
    }
  };
  return (
    <View style={Styles.Splash_Container}>
      <Image
        source={images.splashicon}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
