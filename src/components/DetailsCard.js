import React from 'react';
import { View, Text, Image } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { rf, wp } from '../components/Responvie';
import images from '../assets/Images/images';

const DetailsCard = ({ title = 'Details', data = [] }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.white,
        paddingVertical: 15,
        marginTop: 15,
        borderRadius: 15,
      }}
    >
      <Text
        allowFontScaling={false}
        style={{
          color: Colors.white,
          fontFamily: Fonts.pop600,
          fontSize: rf(14),
          marginLeft: 14,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          borderWidth: 0.7,
          borderColor: Colors.white,
          marginVertical: 15,
        }}
      />

      {data.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 14,
            marginTop: 10,
          }}
        >
          <Image
            source={images.circleRghtaarow}
            style={{ width: wp(4), height: wp(4) }}
            resizeMode="contain"
          />
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: rf(12),
              fontFamily: Fonts.pop300,
              marginLeft: 4,
              marginRight: 20,
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default DetailsCard;
