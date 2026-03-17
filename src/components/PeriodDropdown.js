import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import images from '../assets/Images/images';
import { Styles } from '../Screens/Auth/Style';
import { rf } from './Responvie';

const PeriodDropdown = ({ onPeriodChange }) => {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState('MONTHLY');

  // 🔥 DEFAULT VALUE = WEEKLY (API CALL ON FIRST RENDER)
  useEffect(() => {
    if (onPeriodChange) {
      onPeriodChange('weekly');
    }
  }, []);

  const selectPeriod = (value, label) => {
    setPeriod(label);
    setOpen(false);
    onPeriodChange && onPeriodChange(value);
  };

  return (
    <View style={Styles.DropDownCoatinier}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={Styles.dropdwonbutton}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(12),
            fontFamily: Fonts.pop300,
          }}
        >
          {period}
        </Text>
        <Image source={images.Downarrow} style={Styles.dropDownImage} />
      </TouchableOpacity>

      {open && (
        <View style={Styles.dropDownMenu}>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              textAlign: 'center',
              padding: 8,
              fontSize: rf(15),
            }}
          >
            Select Period
          </Text>

          <TouchableOpacity
            onPress={() => selectPeriod('weekly', 'WEEKLY')}
            style={{
              padding: 8,
              borderTopWidth: 1,
              borderTopColor: Colors.white,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontSize: rf(15),
              }}
            >
              Weekly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectPeriod('monthly', 'MONTHLY')}
            style={{
              padding: 8,
              borderTopWidth: 1,
              borderTopColor: Colors.white,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontSize: rf(15),
              }}
            >
              Monthly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectPeriod('yearly', 'YEARLY')}
            style={{
              padding: 8,
              borderTopWidth: 1,
              borderTopColor: Colors.white,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontSize: rf(15),
              }}
            >
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PeriodDropdown;
