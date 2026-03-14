import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import images from '../../assets/Images/images';
import { rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserRatingCard from '../../components/UserRatingCard';
import {
  ContractorMenuData,
  getMenuMockData,
  menuMockData,
} from '../../utils/HardCodedata';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../components/i18n';
import PrimaryButton from '../../components/PrimaryButton';

import { LanguageContext } from '../../context/LanguageContext';
const Account = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const navigation = useNavigation();

  const [logoutModal, setLogoutModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [refresh, setRefresh] = useState(false);
  const [menuData, setMenuData] = useState(getMenuMockData());
  const [contrmenudata, setContractorMenuData] = useState(ContractorMenuData());
  const [name, setName] = useState('');

  // 🔹 Load saved language & user name
  const [profileIMage, setProfileImage] = useState('');

  useEffect(() => {
    getProfilePhoto();
    gettype();
    const loadData = async () => {
      const savedLang = await AsyncStorage.getItem('APP_LANGUAGE');
      const savedName = await AsyncStorage.getItem('name');

      if (savedLang) {
        i18n.locale = savedLang;
        setSelectedLang(savedLang);
      }

      if (savedName) {
        setName(savedName);
      }
    };

    loadData();
  }, []);
  const getProfilePhoto = async () => {
    try {
      const image = await AsyncStorage.getItem('profileImage');
      console.log('IMAGE URL:', image);
      setProfileImage(image);
    } catch (e) {
      console.log(e);
    }
  };
  const [type, setType] = useState('');
  console.log(type, '-------');
  const gettype = async () => {
    try {
      const type = await AsyncStorage.getItem('Type');
      console.log('Type', type);
      setType(type);
    } catch (e) {
      console.log(e);
    }
  };
  const [refreshKey, setRefreshKey] = useState(0);

  // 🔹 Change language (Instant UI Update)
  // const changeLanguage = async langCode => {
  //   await AsyncStorage.setItem('APP_LANGUAGE', langCode);
  //   i18n.locale = langCode;
  //   setSelectedLang(langCode);
  //   setLanguageModal(false);
  //   setRefreshKey(prev => prev + 1);
  //   setMenuData(getMenuMockData());
  //   // setRefresh(prev => !prev); // 👈 force re-render
  // };

  // 🔹 Menu press handler
  const handlePress = screenName => {
    if (screenName === 'LOGOUT') {
      setLogoutModal(true);
    } else if (screenName === 'CHANGELANGUGE') {
      setLanguageModal(true);
    } else if (!screenName) {
      Alert.alert(
        'Delete Account',
        'To delete your account please contact us on this email info@acdoctor.in',
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } catch (error) {
      Alert.alert('Logout Failed');
    } finally {
      setLogoutModal(false);
    }
  };

  return (
    <MainContainer key={refreshKey ? 'hi' : 'en'}>
      {/* User Info */}
      <UserRatingCard
        name={name}
        apiImage={profileIMage}
        // image={images.logo}
        rating={3}
        onRatingChange={rating => console.log('Rating:', rating)}
      />

      {/* Menu */}
      <FlatList
        data={type === 'FC' ? contrmenudata : menuData}
        keyExtractor={item => item.id}
        style={{ marginTop: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item.screenName)}
            style={styles.menuItem}
          >
            <View style={styles.menuLeft}>
              <Image source={item.icon} style={styles.menuIcon} />
              <Text allowFontScaling={false} style={styles.menuText}>
                {item.name}
              </Text>
            </View>
            <Image
              source={images.RightArrow}
              style={{ width: wp(4), height: wp(4) }}
            />
          </TouchableOpacity>
        )}
      />

      {/* 🔴 Logout Modal */}
      <Modal transparent animationType="slide" visible={logoutModal}>
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            <Text allowFontScaling={false} style={styles.title}>
              {i18n.t('youwanttologout')}
            </Text>

            <View style={styles.row}>
              <PrimaryButton
                title={i18n.t('yes')}
                onPress={handleLogout}
                style={{ width: wp(35) }}
              />

              <TouchableOpacity
                onPress={() => setLogoutModal(false)}
                style={styles.cancelBtn}
              >
                <Text allowFontScaling={false} style={styles.cancelText}>
                  {i18n.t('no')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 🌐 Language Modal */}
      <Modal transparent animationType="slide" visible={languageModal}>
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            <Image
              source={images.changelanugaue}
              style={{ width: wp(15), height: wp(15), alignSelf: 'center' }}
            />

            <Text allowFontScaling={false} style={styles.title}>
              {i18n.t('ChangeLanguage')}
            </Text>

            <TouchableOpacity
              onPress={() => {
                changeLanguage('en'), setLanguageModal(false);
              }}
              style={[
                styles.langBtn,
                selectedLang === 'en' && styles.activeLang,
              ]}
            >
              <Text allowFontScaling={false} style={styles.langText}>
                English
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                changeLanguage('hi'), setLanguageModal(false);
              }}
              style={[
                styles.langBtn,
                selectedLang === 'hi' && styles.activeLang,
              ]}
            >
              <Text allowFontScaling={false} style={styles.langText}>
                {i18n.t('Hindi')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainContainer>
  );
};

export default Account;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: rf(22),
    fontFamily: Fonts.pop600,
    color: Colors.white,
    textAlign: 'center',
    marginVertical: 10,
  },
  menuItem: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: wp(9),
    height: wp(9),
  },
  menuText: {
    marginLeft: 15,
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.Pop400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelBtn: {
    width: wp(35),
    borderRadius: 45,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  cancelText: {
    color: Colors.primary,
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
  },
  langBtn: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    padding: 12,
  },
  activeLang: {
    backgroundColor: Colors.primary,
  },
  langText: {
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.Pop400,
  },
});
