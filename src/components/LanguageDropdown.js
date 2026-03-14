import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import images from '../assets/Images/images';
import { Styles } from '../Screens/Auth/Style';
import i18n from '../components/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rf } from './Responvie';

const LanguageDropdown = ({ onLanguageChange }) => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  // 🔥 LOAD SAVED LANGUAGE ON MOUNT
  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem('APP_LANGUAGE');
      if (savedLang) {
        i18n.locale = savedLang;
        setLanguage(savedLang.toUpperCase());
      }
    })();
  }, []);

  const selectLanguage = async (langCode, label) => {
    await AsyncStorage.setItem('APP_LANGUAGE', langCode); // 🔥 SAVE
    i18n.locale = langCode;
    setLanguage(label);
    setOpen(false);
    onLanguageChange && onLanguageChange();
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
          {language}
        </Text>
        <Image source={images.Downarrow} style={Styles.dropDownImage} />
      </TouchableOpacity>

      {open && (
        <View style={Styles.dropDownMenu}>
          <Text
            allowFontScaling={false}
            allowFontScaling={false}
            style={{
              color: Colors.white,
              textAlign: 'center',
              padding: 8,
              fontSize: rf(15),
            }}
          >
            Select Language
          </Text>

          <TouchableOpacity
            onPress={() => selectLanguage('en', 'EN')}
            style={{
              padding: 8,
              borderTopWidth: 1,
              borderTopColor: Colors.white,
            }}
          >
            <Text
              allowFontScaling={false}
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontSize: rf(15),
              }}
            >
              English
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectLanguage('hi', 'HI')}
            style={{
              padding: 8,
              borderTopWidth: 1,
              borderTopColor: Colors.white,
            }}
          >
            <Text
              allowFontScaling={false}
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontSize: rf(15),
              }}
            >
              Hindi
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LanguageDropdown;
