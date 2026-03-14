import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import images from '../assets/Images/images';
import { rf, wp } from '../components/Responvie';
import Colors, { Fonts } from '../utils/Colors';
import PrimaryButton from '../components/PrimaryButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Demo = () => {
  const [type, setType] = useState('');
  console.log(type, '-------');
  const gettype = async () => {
    try {
      const type = await AsyncStorage.getItem('Type');
      console.log('Type', type);
      setType(type);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    gettype();
  }, []);

  const navigation = useNavigation();
  return (
    <MainContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={images?.right}
          style={{ width: wp(35), height: wp(35) }}
          resizeMode="contain"
        />
        <Text
          allowFontScaling={false}
          style={{
            color: Colors?.primary,
            fontSize: rf(25),
            fontFamily: Fonts?.pop600,
            marginTop: 10,
          }}
        >
          Successfully
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors?.white,
            fontFamily: Fonts?.Pop400,
            fontSize: rf(18),
          }}
        >
          Service Report Uploaded
        </Text>
        <PrimaryButton
          onPress={() => {
            if (type === 'FC') {
              // Alert.alert('123');
              navigation.reset({
                index: 0,
                routes: [{ name: 'ContractorBottom' }],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'TabNavigator' }],
              });
            }
          }}
          title={'Back To Home'}
          style={{ width: '90%', marginTop: 20 }}
        />
      </View>
    </MainContainer>
  );
};

export default Demo;

const styles = StyleSheet.create({});
