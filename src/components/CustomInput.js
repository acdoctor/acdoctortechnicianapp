import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { rf, hp } from './Responvie';
import { Styles } from '../Screens/Auth/Style';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  keyboardType = 'default',
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={containerStyle}>
      <Text allowFontScaling={false} style={Styles.InputLable}>
        {label}
      </Text>

      <TextInput
        allowFontScaling={false}
        Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
        style={[
          {
            borderWidth: 1,
            height: hp(5),
            // padding: 'auto',
            color: Colors.white,
            paddingHorizontal: 10,
            marginTop: 8,
            // paddingVertical: 1,
            borderRadius: 13,
            fontFamily: Fonts.pop600,
            fontSize: rf(14),
            // paddingTop:,
            // justifyContent: 'center',
          },

          inputStyle, // 👈 custom styles first
          {
            borderColor: isFocused ? Colors.white : Colors.gray, // 👈 dynamic LAST
          },
        ]}
      />
    </View>
  );
};

export default CustomInput;
