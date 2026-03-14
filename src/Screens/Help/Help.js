import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import images from '../../assets/Images/images';
import { rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';

const Help = () => {
  return (
    <MainContainer>
      <Header title={i18n.t('Help')} />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Image
          source={images?.contactus}
          style={{ width: wp(35), height: wp(35), alignSelf: 'center' }}
          resizeMode="contain"
        />
        <Text
          allowFontScaling={false}
          style={{
            color: Colors?.white,
            fontSize: rf(16),
            fontFamily: Fonts?.Pop400,
            marginTop: 20,
            alignSelf: 'center',
          }}
        >
          Hello,
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors?.white,
            fontSize: rf(16),
            fontFamily: Fonts?.Pop400,
            alignSelf: 'center',
          }}
        >
          How Can We Help You
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${'+918959898989'}`)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors?.lightGray,
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginTop: 15,
            borderRadius: 12,
          }}
        >
          <Image
            source={images?.callicon}
            style={{ width: wp(9), height: wp(9) }}
            resizeMode="contain"
          />
          <Text
            allowFontScaling={false}
            style={{
              color: Colors?.white,
              fontSize: rf(16),
              fontFamily: Fonts?.Pop400,
              marginLeft: 10,
            }}
          >
            +91 8959898989
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={() => Linking.openURL('jatinkastoua@gmail.com')}
          onPress={() =>
            Linking.openURL(
              'mailto:info@acdoctor.in?subject=Request&body=Hello AC Doctor I want to contact you',
            )
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors?.lightGray,
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginTop: 15,
            borderRadius: 12,
          }}
        >
          <Image
            source={images?.mail}
            style={{ width: wp(9), height: wp(9) }}
            resizeMode="contain"
          />
          <Text
            allowFontScaling={false}
            style={{
              color: Colors?.white,
              fontSize: rf(16),
              fontFamily: Fonts?.Pop400,
              marginLeft: 10,
            }}
          >
            info@acdoctor.in
          </Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default Help;

const styles = StyleSheet.create({});
