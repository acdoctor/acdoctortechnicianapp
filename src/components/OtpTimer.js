import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { rf } from './Responvie';

const OtpTimer = ({ onResend }) => {
  const [seconds, setSeconds] = useState(90);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleResend = () => {
    setSeconds(90);
    setExpired(false);
    onResend && onResend();
  };

  return (
    <>
      {!expired ? (
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.primary,
            fontSize: rf(16),
            fontFamily: Fonts.pop600,
            alignSelf: 'center',
            // marginVertical: 20,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          {formatTime()}
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.primary,
              fontSize: rf(16),
              fontFamily: Fonts.pop600,
              alignSelf: 'center',
              //   marginVertical: 20,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Resend OTP
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default OtpTimer;
