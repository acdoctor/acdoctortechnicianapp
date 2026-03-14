import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const StarRating = ({
  maxStars = 5,
  starSize = 15,
  rating = 0,
  onRatingChange,
}) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const onPressStar = value => {
    setSelectedRating(value);
    onRatingChange && onRatingChange(value);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        return (
          <TouchableOpacity
            key={index}
            disabled={true}
            activeOpacity={0.7}
            onPress={() => onPressStar(starValue)}
          >
            <Image
              source={
                starValue <= selectedRating
                  ? require('../assets/Images/starr.png')
                  : require('../assets/Images/starline.png')
              }
              style={{
                width: starSize,
                height: starSize,
                marginHorizontal: 4,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StarRating;
