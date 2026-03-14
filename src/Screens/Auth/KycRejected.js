import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import images from '../../assets/Images/images';
import { hp, rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import i18n from '../../components/i18n';
import Header from '../../components/Header';
import { Styles } from './Style';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const KycRejected = () => {
  const navigation = useNavigation();
  return (
    <MainContainer>
      <Header title={i18n.t('KYCVerification')} />
      <View style={styles.imageWrapper}>
        <Image
          source={images.rejectaddahrimage}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={images.rejectaddahrimage}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <View style={styles.warningBox}>
        <Image
          source={images.erroe}
          tintColor={Colors.white}
          style={{
            width: wp(4),
            height: wp(4),
            resizeMode: 'contain',
          }}
        />
        <Text allowFontScaling={false} style={styles.warningText}>
          {i18n.t('Pleaseupload')}
        </Text>
      </View>

      <View style={{ marginTop: 'auto', paddingBottom: 10 }}>
        <PrimaryButton
          style={{ marginTop: 100 }}
          title={i18n.t('uploadAgain')}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'KycVerifcation' }],
            });
          }}
        />
      </View>
    </MainContainer>
  );
};

export default KycRejected;

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: Colors.red || 'red',
    borderRadius: 12,
    height: hp(18),
    width: wp(92),
    alignSelf: 'center',
    marginVertical: hp(2),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 30,
    right: 8,
    backgroundColor: Colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E31E2599',
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  warningText: {
    color: Colors.white,
    fontSize: rf(11),
    fontFamily: Fonts.pop300,
    marginLeft: 10,
  },
});
