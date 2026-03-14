import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { hp, rf, wp } from '../../components/Responvie';
import { Styles } from './Style';
import CustomInput from '../../components/CustomInput';
import images from '../../assets/Images/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomDOBPicker from '../../components/CustomDOBPicker';
import GenderSelector from '../../components/GenderSelector';
import PrimaryButton from '../../components/PrimaryButton';
import apiService from '../../Services/apiService';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
const RegisterForm = () => {
  const navigation = useNavigation();
  const [alternateNumber, setAlternateNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Name, setName] = useState('');
  const [Number, setNumber] = useState('');
  const [dobApi, setDobApi] = useState('');
  const [gender, setGender] = useState('');
  const [Email, setEmail] = useState('');
  const [dob, setDob] = useState(null);
  const [Loading, setLoading] = useState(false);
  const accestoken = AsyncStorage.getItem('ACCESS_TOKEN');
  console.log(accestoken, ':ppppppp');
  // const isFormValid = Name.trim().length > 0 && dobApi && gender && isChecked;
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Email);
  };
  const isAlternateValid =
    alternateNumber.length === 0 || alternateNumber !== Number;
  const isFormValid =
    Name.trim().length > 0 &&
    dobApi &&
    gender &&
    isChecked &&
    // Email.length > 0 &&
    // validateEmail(Email) &&
    alternateNumber !== Number;
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      if (value !== null) {
        console.log('Data:', value);
        setNumber(value);
      }
    } catch (error) {
      console.log('Error getting data', error);
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return `${i18n.t('GoodMorning')}`;
    } else if (hour < 17) {
      return `${i18n.t('GoodAfternoon')}`;
    } else {
      return `${i18n.t('GoodEvening')}`;
    }
  };
  const HandlePress = async () => {
    await AsyncStorage.setItem('name', Name);

    setLoading(true);

    const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');
    // const Token = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log(accestoken, 'jjjjjjj');
    if (!isFormValid) {
      return;
    }

    const payload = {
      name: Name,
      // phone: Number,
      secondaryContactNumber: alternateNumber,
      dob: dobApi,
      // gender: gender,
      email: Email,
    };

    console.log('Register Payload:', payload);

    try {
      const response = await apiService.post(
        '/technician/profile',
        {
          name: Name,
          // phone: alternateNumber, // pasint The Number
          secondaryContactNumber: alternateNumber,
          dob: dobApi,
          // gender: gender,
          email: Email,
        },
        {
          headers: {
            Authorization: `Bearer ${accestoken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === true) {
        console.log(response, 'adasdsadsadasdsad');
        navigation.navigate('KycVerifcation');
      } else {
        console.log(response, 'adasdsadsadasdsad');
      }
    } catch (error) {
      if (error.message === 'Invalid or expired token') {
        Toast.show({
          type: 'error',
          text1: 'asdasd',
          text2: error?.status,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: error?.message,
          text2: error?.status,
        });
      }

      // console.log(error.message, 'popopo');
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainContainer>
      <Text allowFontScaling={false} style={Styles.gretingtext}>
        {getGreeting()}
      </Text>
      <Text allowFontScaling={false} style={Styles.pleasefillthebelow}>
        {i18n.t('Pleasefillthebelowdetails')}
      </Text>
      <CustomInput
        label={i18n.t('FullName')}
        placeholder={i18n.t('EnterYourName')}
        value={Name}
        onChangeText={setName}
      />
      <Text allowFontScaling={false} style={Styles.InputLable}>
        {i18n.t('RegisteredNumber')}
      </Text>
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            height: hp(5),
            paddingHorizontal: 14,
            borderRadius: 13,
            marginRight: 10,
            borderColor: Colors.white,
          }}
        >
          <Image
            source={images.india}
            style={Styles.flag}
            resizeMode="contain"
          />
          <Text allowFontScaling={false} style={Styles.CountrcodeText}>
            +91
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 13,
            height: hp(5),
            paddingHorizontal: 14,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={Styles.CountrcodeText}>
            {Number}
          </Text>
        </View>
      </View>
      <Text allowFontScaling={false} style={Styles.InputLable}>
        {i18n.t('AlternatePhoneNumber')}
      </Text>
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <View style={Styles.HardCoenumberconater}>
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
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={setAlternateNumber}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            {
              borderColor:
                isFocused || alternateNumber.length > 0
                  ? Colors.white
                  : Colors.gray,
            },
            Styles.alternatenumber,
          ]}
          placeholder={i18n.t('EnterAlternatePhoneNumber')}
          placeholderTextColor={Colors.gray}
        />
      </View>
      {alternateNumber.length === 10 && alternateNumber === Number && (
        <Text
          allowFontScaling={false}
          style={{
            color: 'red',
            fontSize: rf(10),
            marginTop: 4,
            marginLeft: 8,
          }}
        >
          Alternate number primary number se same nahi ho sakta
        </Text>
      )}
      <Text allowFontScaling={false} style={Styles.InputLable}>
        {i18n.t('DateofBirth')}
      </Text>

      <CustomDOBPicker
        value={dob}
        onConfirm={data => {
          setDob(data.displayDate);
          setDobApi(data.apiDate); // ✅ 2025-03-24
        }}
      />
      <Text allowFontScaling={false} style={Styles.InputLable}>
        {i18n.t('Gender')}
      </Text>

      <GenderSelector value={gender} onChange={setGender} />

      <CustomInput
        label={i18n.t('Email')}
        placeholder={i18n.t('EnterEmail')}
        value={Email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 18,
          marginBottom: 15,
        }}
        onPress={() => setIsChecked(!isChecked)}
      >
        {isChecked ? (
          <Image
            source={images.check} // checked image
            style={Styles.cehckuncheck}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={images.unCheck} // unchecked image
            // style={{ width: wp(3.5), height: wp(3.5) }}
            style={Styles.cehckuncheck}
            resizeMode="contain"
          />
        )}
        <Text
          allowFontScaling={false}
          style={{
            color: isChecked ? Colors.white : Colors.gray,
            fontSize: rf(11),
            fontFamily: Fonts.pop300,
            marginLeft: 5,
          }}
        >
          {i18n.t('BySubmitting')}
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title={i18n.t('Submit')}
        onPress={HandlePress}
        loading={Loading}
        // disabled={!isValidNumber}
        disabled={!isFormValid}
      />
    </MainContainer>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({});
