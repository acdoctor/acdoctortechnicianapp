import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import images from '../../assets/Images/images';
import { hp, rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import HeaderRow from '../../components/HeaderRow';
import AutoCarousel from '../../components/AutoCarousel';
import {
  Contracthomescreedata,
  homescreedata,
  image_slider_data,
  secondimageslider,
  utilities_data,
} from '../../utils/HardCodedata';
import i18n from '../../components/i18n';
import QuickAccessGrid from '../../components/QuickAccessGrid';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const CARD_SIZE = width / 3 - 20;

const Home = () => {
  const [name, setname] = useState('');
  const [helperType, settype] = useState('');
  const [FCType, setFCtype] = useState('');

  const getttype = async () => {
    const name = AsyncStorage.getItem('name');
    setname(name);
    const type = await AsyncStorage.getItem('Type');

    setFCtype(type);
    const HelperType = await AsyncStorage.getItem('helper');
    settype(HelperType);
  };

  useEffect(() => {
    getttype();
  }, []);
  useEffect(() => {
    getProfilePhoto();
  }, []);
  const [profileIMage, setProfileImage] = useState('');

  const getProfilePhoto = async () => {
    try {
      const image = await AsyncStorage.getItem('profileImage');
      console.log('IMAGE URL:', image);
      setProfileImage(image);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    const decodedToken = jwtDecode(token);
    console.log(decodedToken._id);
  };
  const navigation = useNavigation();
  const handlenotification = async () => {
    navigation.navigate('Notification');
  };
  const HandelUtlities = i => {
    if (i === 'undefi') {
      Alert.alert('Under Process', 'This feature is under development 🚧');
    } else {
      navigation.navigate(i);
    }
  };
  return (
    <MainContainer>
      <HeaderRow
        title={name}
        apiImage={profileIMage}
        onNotificationPress={handlenotification}
      />
      <AutoCarousel
        data={image_slider_data}
        autoPlay
        interval={2500}
        imageKey="image"
      />
      <QuickAccessGrid
        helperType={helperType}
        title={i18n.t('QuickAccess')}
        data={FCType === 'FC' ? Contracthomescreedata() : homescreedata()}
        onPressItem={item => {
          if (item.screenName) {
            navigation.navigate(item.screenName);
          } else {
            Alert.alert(
              'Under Process',
              'This feature is under development 🚧',
            );
          }
        }}
      />
      <AutoCarousel
        data={secondimageslider}
        autoPlay
        interval={2500}
        imageKey="image"
      />
      <QuickAccessGrid
        title={i18n.t('utilities')}
        onPressItem={i => HandelUtlities(i?.screenName)}
        data={utilities_data()}
      />
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    // paddingHorizontal: 12,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#1C1C1E', // dark card
    margin: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: {
    width: 28,
    height: 28,
    tintColor: '#FF3B30', // red icon (image jaisa)
  },

  title: {
    color: Colors.white,
    fontSize: 13,
    textAlign: 'center',
  },
});
