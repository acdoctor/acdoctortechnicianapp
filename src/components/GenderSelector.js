import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { hp, rf, wp } from './Responvie';

const GenderSelector = ({ value, onChange }) => {
  const genders = ['Male', 'Female', 'Other'];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginTop: 8,

        // flex: 1,
      }}
    >
      {genders.map(gender => {
        const isSelected = value === gender;

        return (
          <TouchableOpacity
            key={gender}
            onPress={() => onChange(gender)}
            style={{
              borderWidth: 1,
              borderRadius: 13,
              height: hp(5),
              width: wp(29),
              justifyContent: 'center',

              alignItems: 'center',
              borderColor: isSelected ? Colors.white : Colors.gray,
            }}
          >
            <Text
              allowFontScaling={false}
              allowFontScaling={false}
              style={{
                color: isSelected ? Colors.white : Colors.gray,
                fontFamily: Fonts.pop600,
                fontSize: rf(14),
              }}
            >
              {gender}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default GenderSelector;
