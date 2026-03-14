import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors, { Fonts } from '../utils/Colors';
// import Fonts from '../';
import { wp, rf } from '../components/Responvie';
import images from '../assets/Images/images';
import i18n from './i18n';

const Header = ({ title, onPress, img, next }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity
        onPress={onPress ? onPress : () => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}
        activeOpacity={0.7}
      >
        <Image
          source={images.arrowBack}
          style={{ width: wp(7), height: wp(7) }}
          resizeMode="contain"
        />
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(16),
            fontFamily: Fonts.Pop400,
            marginLeft: 10,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>

      {img ? (
        <TouchableOpacity onPress={next}>
          <Image
            source={img}
            style={{ width: wp(7), height: wp(7) }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
