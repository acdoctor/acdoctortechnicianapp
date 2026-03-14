import {
  Alert,
  //   BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import Colors, { Fonts } from '../../utils/Colors';
import images from '../../assets/Images/images';
import { rf, wp } from '../../components/Responvie';
import i18n from '../../components/i18n';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KycPending = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
      // setVisible(false);
    } catch (error) {
      Alert.alert('Not Log Out');
      // setVisible(false);
    } finally {
      setVisible(false);
    }
  };
  return (
    <MainContainer>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={images.kycPending}
          style={{ width: wp(15), height: wp(15), resizeMode: 'contain' }}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            textAlign: 'center',
            fontSize: rf(16),
            fontFamily: Fonts.Pop400,
          }}
        >
          {i18n.t('YourKYCsunderreview')}
        </Text>
      </View>
      <PrimaryButton
        style={{ marginTop: 30 }}
        onPress={() => handleLogout()}
        title={i18n.t('Logout')}
      />
      {/* <PrimaryButton onPress={() => exitApp()} title={i18n.t('exitApp')} /> */}
    </MainContainer>
  );
};

export default KycPending;

const styles = StyleSheet.create({});
