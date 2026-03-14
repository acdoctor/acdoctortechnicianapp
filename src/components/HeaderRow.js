import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors, { Fonts } from '../utils/Colors';
import images from '../assets/Images/images';
import { wp, rf } from '../components/Responvie';

const HeaderRow = ({
  title = 'Loading...',
  apiImage, // 👈 API se image url
  onNotificationPress,
  rightIcon = images.notifcation,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left Side */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={
            apiImage
              ? { uri: apiImage } // ✅ API image
              : images.logo // ❌ fallback image
          }
          style={{ width: wp(8), height: wp(8), borderRadius: 1000 }}
          resizeMode="cover"
        />

        <Text
          allowFontScaling={false}
          style={{
            marginLeft: 9,
            fontSize: rf(18),
            color: Colors.white,
            fontFamily: Fonts.pop500,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Right Side */}
      <TouchableOpacity
        style={{ backgroundColor: Colors.background }}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Image
          source={rightIcon}
          style={{ width: wp(9), height: wp(9) }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRow;
