import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { wp } from './Responvie';
import { RFPercentage } from 'react-native-responsive-fontsize';

const OtpInput = ({ length = 4, otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (isNaN(text)) return;

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <TextInput
            allowFontScaling={false}
            Input
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={[styles.input, otp[index] && styles.filledInput]}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleBackspace(e, index)}
          />
        ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 20,
    marginTop: 20,
    // marginBottom: 40,
    paddingHorizontal: 40,
    backgroundColor: Colors.background,
  },
  input: {
    width: wp(12),
    height: wp(12),
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
    fontFamily: Fonts.Pop400,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    textAlign: 'center',
    fontSize: RFPercentage(2),
    color: Colors.white,
  },
  filledInput: {
    borderColor: Colors.primary,
  },
});
