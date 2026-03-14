import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import PrimaryButton from '../../components/PrimaryButton';

const HelperAssign = () => {
  useEffect(() => {
    getData();
  }, []);
  const [Data, setData] = useState({});
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    setloading(true);
    try {
      const res = await apiService.get('/technician/pairing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res, 'lololololo');
      if (res?.status === true) {
        setData(res?.data);
      }
    } catch (error) {
      Alert?.alert(error?.message);
    } finally {
      setloading(false);
    }
  };
  console.log(Data);
  const formatDate = isoDate => {
    if (!isoDate) return '';

    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <MainContainer>
      <Header title={i18n.t('HelperAssign')} />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : Data?.isPaired === false ? (
        <View style={styles?.loader}>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: rf(18),
              fontFamily: Fonts.pop700,
              textAlign: 'center',
            }}
          >
            {'No Helper Assigned Yet'}
          </Text>
        </View>
      ) : (
        <View>
          <Image
            source={{ uri: Data?.pairedWith?.profilePhoto }}
            style={{
              width: wp(30),
              height: wp(30),
              alignSelf: 'center',
              marginTop: 50,
              borderRadius: 9999,
              borderWidth: 2,
              borderColor: Colors?.primary,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              //   marginVertical: 20,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Text allowFontScaling={false} style={styles?.HeadetText}>
              TODAY {Data?.pairedWith?.position}
            </Text>
            <Text allowFontScaling={false} style={styles?.HeadetText}>
              {formatDate(Data?.pairedWith?.pairedAt)}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: Colors?.lightGray,
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text allowFontScaling={false} style={styles?.labeltext}>
                Helper Name
              </Text>
              <Text allowFontScaling={false} style={styles?.textStyle}>
                {Data?.pairedWith?.name}
              </Text>
            </View>{' '}
            <View>
              <Text allowFontScaling={false} style={styles?.labeltext}>
                Helper Number
              </Text>
              <Text
                allowFontScaling={false}
                style={[styles?.textStyle, { alignSelf: 'flex-end' }]}
              >
                {Data?.pairedWith?.phoneNumber}
              </Text>
            </View>
          </View>
          <PrimaryButton
            style={{ marginTop: 20 }}
            title={'Call'}
            onPress={() =>
              Linking.openURL(`tel:${Data?.pairedWith?.phoneNumber}`)
            }
          />
        </View>
      )}
    </MainContainer>
  );
};

export default HelperAssign;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeadetText: {
    color: Colors?.white,
    fontSize: rf(16),
    fontFamily: Fonts?.pop600,
  },
  labeltext: {
    color: Colors?.gray,
    fontSize: rf(12),
    fontFamily: Fonts?.pop500,
  },
  textStyle: {
    color: Colors?.white,
    fontSize: rf(18),
    fontFamily: Fonts?.pop500,
    marginTop: 5,
  },
});
