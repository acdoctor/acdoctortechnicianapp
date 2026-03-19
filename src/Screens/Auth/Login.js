import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import { Styles } from './Style';
import images from '../../assets/Images/images';
import { hp, rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import apiService from '../../Services/apiService';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance } from '@notifee/react-native';
const Login = ({ route }) => {
  const { type } = route.params;
  console.log(type, 'asd');
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const isValidNumber = phone.length === 10;

  const HandlePress = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token, 'FCM Token');
    if (loading) return;
    const body = {
      countryCode: '+91',
      phoneNumber: phone,
      type: type,
      // deviceToken: token,
    };
    console.log(body, 'asdfghjkl');
    try {
      setLoading(true);

      const response = await apiService.post('/technician/login', body);

      if (response?.status === true) {
        navigation.navigate('OTPscreen', { OTP: response.otp, number: phone });
        await AsyncStorage.setItem('number', phone);
        await showWelcomeNotification();
      } else {
        setLoading(false);
        Alert.alert(response?.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert(error?.message || 'Something went wrong');

      // Alert.alert('Login Error');
    } finally {
      setLoading(false);
    }
  };

  const showWelcomeNotification = async () => {
    // Channel create karo (sound yaha bhi define kar sakte ho)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'sound', // ✅ yaha sound add
    });

    await notifee.displayNotification({
      title: 'Welcome 👋',
      body: 'Welcome to AC Technician App, enjoy the services',
      android: {
        channelId,
        smallIcon: 'ic_launcher_foreground',
        sound: 'sound', // ✅ yaha bhi sound ensure karo
        pressAction: {
          id: 'sound',
        },
      },
      ios: {
        sound: 'sound.wav', // ✅ iOS ke liye
      },
    });
  };

  return (
    <MainContainer>
      <Header />

      <View style={Styles.centerConatiner}>
        <Text allowFontScaling={false} style={Styles.logntitle}>
          {i18n.t('EnterYourMobileNumber')}
        </Text>
        <Text allowFontScaling={false} style={Styles.loginSubtitle}>
          {i18n.t('Thisnumberwill')}
        </Text>

        <View style={Styles.phonecontainer}>
          <View style={Styles.countryCodeBox}>
            <Image
              source={images.india}
              style={Styles.flag}
              resizeMode="contain"
            />
            <Text allowFontScaling={false} style={Styles.CountrcodeText}>
              +91
            </Text>
          </View>

          <TextInput
            allowFontScaling={false}
            Input
            value={phone}
            onChangeText={text => {
              // allow only numbers
              const numericText = text.replace(/[^0-9]/g, '');
              setPhone(numericText);
            }}
            maxLength={10}
            keyboardType="number-pad"
            style={Styles.phoneInput}
            placeholderTextColor={Colors.gray}
            placeholder={i18n.t('EnterYourPhoneNo')}
          />
        </View>

        <PrimaryButton
          title={i18n.t('SendOTP')}
          onPress={HandlePress}
          loading={loading}
          disabled={!isValidNumber}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Help');
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <Image
          source={images?.contactus}
          resizeMode="contain"
          style={{ width: wp(8), height: wp(8) }}
        />
        <Text style={[Styles?.contacustext, { marginLeft: 10 }]}>
          Contact US
        </Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Login;

const styles = StyleSheet.create({});
