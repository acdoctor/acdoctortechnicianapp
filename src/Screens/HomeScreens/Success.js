import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import images from '../../assets/Images/images';
import { rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import i18n from '../../components/i18n';
import PrimaryButton from '../../components/PrimaryButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
// import { Image } from 'react-native/types_generated/index'

const Success = () => {
  const navigation = useNavigation();
  const handleHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      }),
    );
  };
  return (
    <MainContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={images.right}
          style={{ width: wp(40), height: wp(40) }}
          resizeMode="contain"
        />
        <Text
          allowFontScaling={false}
          style={{
            fontSize: rf(30),
            fontFamily: Fonts.pop600,
            color: Colors.primary,
            marginTop: 8,
          }}
        >
          {i18n.t('Successfully')}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: rf(18),
            fontFamily: Fonts.pop300,
            color: Colors.white,
            marginTop: 3,
          }}
        >
          {i18n.t('ServiceReportUploaded')}
        </Text>
        <PrimaryButton
          onPress={handleHome}
          title={i18n.t('BacktoHome')}
          style={{ width: wp(80), marginTop: 15 }}
        />
      </View>
    </MainContainer>
  );
};

export default Success;

const styles = StyleSheet.create({});
