import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import { Styles } from './Style';
import i18n from '../../components/i18n';
import OtpInput from '../../components/OtpInput';
import PrimaryButton from '../../components/PrimaryButton';
import OtpTimer from '../../components/OtpTimer';
import apiService from '../../Services/apiService';
import Colors from '../../utils/Colors';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
const OTPscreen = ({ route }) => {
  const data = route?.params;
  console.log(data, 'loplop');
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [expired, setExpired] = useState(false);
  const [Loading, setLoading] = useState(false);

  const isOtpValid = otp.join('').length === 4 && !expired;

  const handleVerify = async () => {
    setLoading(true);
    if (Loading) return;
    if (expired) {
      Toast.show({
        type: 'error',
        text1: 'OTP Expired',
        text2: 'Please resend OTP',
      });

      return;
    }

    const otpValue = otp.join(''); // convert array → string

    try {
      setLoading(true);
      const response = await apiService.post('/technician/verify-otp', {
        phoneNumber: data.number, // use state phone number
        otp: otpValue,
      });
      if (response?.status === true) {
        console.log(response.accessToken, 'response validate OTP');
        // await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('REFRESH_TOKEN', response.refreshToken);
        await AsyncStorage.setItem('TokenForkycVerify', '123');
        await AsyncStorage.setItem('ACCESS_TOKEN', response.accessToken);
        const decodedToken = jwtDecode(response?.accessToken);
        const token = response.accessToken;
        console.log(decodedToken, 'decoded token');

        try {
          setLoading(true);
          const response = await apiService.get(
            `/technician/profile/${decodedToken?._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(response, 'otp response');
          if (response?.data?.status === 'SIGNED_UP') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'RegisterForm' }],
            });
          } else if (response?.data?.status === 'REJECTED') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'KycRejected' }],
            });
          } else if (response?.data?.status === 'PROFILE_CREATED') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'KycVerifcation' }],
            });
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
          } else if (response?.data?.status === 'AVAILABLE') {
            await AsyncStorage.setItem('name', response?.data?.name);
            await AsyncStorage.setItem(
              'profileImage',
              response?.data?.profilePhoto,
            );
            await AsyncStorage.setItem('Type', response?.data?.type);

            if (response?.data?.type === 'ACD') {
              // await AsyncStorage.setItem('helper', response?.data?.position);
              await AsyncStorage.setItem('helper', response?.data?.position);

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
          } else if (response?.data?.status === 'DISABLED') {
            Alert.alert(
              'Your account has been temporarily disabled. Kindly contact customer care for assistance.',
            );
            navigation.reset({
              index: 0,
              routes: [{ name: 'Help' }],
            });
          }
        } catch (error) {
        } finally {
          // setLoading(false);cd
        }

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'RegisterForm' }],
        // });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP',
          text2: 'Please try again',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: error?.message || 'Invalid OTP',
      });
      // Alert.alert('Verification Failed', error?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '']);
    setExpired(false);
    console.log('Resend OTP API call');
  };

  return (
    <MainContainer>
      <Header />
      <View style={Styles.centerConatiner}>
        <Text allowFontScaling={false} style={Styles.logntitle}>
          {i18n.t('EntertheVerificationCode')}
        </Text>
        <Text allowFontScaling={false} style={Styles.loginSubtitle}>
          {i18n.t('Aonetimepassword', { number: data?.number })}
        </Text>
        <OtpInput otp={otp} setOtp={setOtp} />
        <OtpTimer onResend={handleResendOtp} />
        <PrimaryButton
          title={i18n.t('VerifyOTP')}
          onPress={handleVerify}
          disabled={!isOtpValid}
          loading={Loading}
        />
      </View>
    </MainContainer>
  );
};

export default OTPscreen;

const styles = StyleSheet.create({});
