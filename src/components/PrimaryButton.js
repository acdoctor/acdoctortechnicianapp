import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { rf } from './Responvie';

const PrimaryButton = ({
  lightGray,
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor:
            !disabled && !loading ? Colors.primary : Colors.lightGray,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} size={30} />
      ) : (
        <Text allowFontScaling={false} style={styles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 45,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
  },
});
