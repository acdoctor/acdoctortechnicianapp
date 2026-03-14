import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../components/i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('APP_LANGUAGE');
      if (savedLang) {
        i18n.locale = savedLang;
        setLanguage(savedLang);
      }
      setLoading(false);
    };
    loadLanguage();
  }, []);

  const changeLanguage = async lang => {
    await AsyncStorage.setItem('APP_LANGUAGE', lang);
    i18n.locale = lang;
    setLanguage(lang); // 🔥 this triggers re-render everywhere
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {!loading && children}
    </LanguageContext.Provider>
  );
};
