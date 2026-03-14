import React from 'react';
import { View, Text, Image } from 'react-native';
import StarRating from './StarRating'; // adjust path if needed
import Colors, { Fonts } from '../utils/Colors'; // adjust path
import { wp, rf } from '../components/Responvie'; // adjust path
import images from '../assets/Images/images';

const UserRatingCard = ({
  name,

  rating = 0,
  onRatingChange,
  apiImage,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
      }}
    >
      <Image
        // source={image}
        source={
          apiImage
            ? { uri: apiImage } // ✅ API image
            : images.logo
        }
        style={{
          width: wp(10),
          height: wp(10),
          borderRadius: 1000,
        }}
        resizeMode="cover"
      />

      <View style={{ marginLeft: 10 }}>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(16),
            fontFamily: Fonts.pop600,
          }}
        >
          {name}
        </Text>

        <StarRating rating={rating} onRatingChange={onRatingChange} />
      </View>
    </View>
  );
};

export default UserRatingCard;
