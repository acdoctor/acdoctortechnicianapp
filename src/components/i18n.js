import { I18n } from 'i18n-js';
import * as Localization from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import hi from '../locales/hi.json';

const i18n = new I18n({
  en,
  hi,
});

i18n.enableFallback = true;

// 🔥 LOAD SAVED LANGUAGE
export const loadLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('APP_LANGUAGE');

  if (savedLang) {
    i18n.locale = savedLang;
  } else {
    const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';
    i18n.locale = deviceLang;
  }
};

export default i18n;
