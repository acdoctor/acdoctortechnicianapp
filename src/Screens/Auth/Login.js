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
const Login = ({ route }) => {
  const { type } = route.params;
  console.log(type, 'asd');
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const isValidNumber = phone.length === 10;

  const HandlePress = async () => {
    if (loading) return;
    const body = {
      countryCode: '+91',
      phoneNumber: phone,
      type: type,
    };
    console.log(body, 'asdfghjkl');
    try {
      setLoading(true);

      const response = await apiService.post('/technician/login', body);

      if (response?.status === true) {
        navigation.navigate('OTPscreen', { OTP: response.otp, number: phone });
        await AsyncStorage.setItem('number', phone);
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
