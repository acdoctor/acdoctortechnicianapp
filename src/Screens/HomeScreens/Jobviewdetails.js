import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import apiService from '../../Services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import images from '../../assets/Images/images';
import PrimaryButton from '../../components/PrimaryButton';
import { CommonActions, useNavigation } from '@react-navigation/native';

const Jobviewdetails = ({ route }) => {
  const [loading, setloading] = useState(true);
  const navigation = useNavigation();
  const [Data, setData] = useState([]);
  const fullAddress = `${Data?.address?.house}, ${Data?.address?.street}, ${Data?.address?.city}, ${Data?.address?.zipcode}`;
  const shortAddress =
    fullAddress.length > 20
      ? fullAddress.substring(0, 20) + '...'
      : fullAddress;
  const formatDate = dateString => {
    if (!dateString) return '';

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`; // 02012026
  };
  const _id = route?.params;
  console.log(Data, '---------->');

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log(token);
    try {
      const res = await apiService.get(`technician/booking/${_id?.bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 'success') {
        setData(res?.data);
        console.log(res.data, 'lj');
      } else {
        //    Alert.alert("asd")
      }
    } catch (error) {
      Alert.alert(error?.message);
    } finally {
      setloading(false);
    }
  };

  const handlecompleted = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.put(
        'technician/booking/status',
        {
          bookingId: Data?._id,
          status: 'COMPLETE',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log('Response:', res);
      // if (res?.status === true) {
      //   // naviagte to screen service
      //   // navigation.navigate('Success');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Servicereport',
              params: { Data: Data }, // 👈 yahan bhejo
            },
          ],
        }),
      );
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       {
      //         name: 'Demo',
      //         params: { Data: Data }, // 👈 yahan bhejo
      //       },
      //     ],
      //   }),
      // );
    } catch (error) {
      console.log('Error:', error.response?.data);
      Alert.alert('Error', error?.message || 'Something went wrong');
    }
  };

  const [Load, setLoad] = useState(false);
  // setLoad(false);
  const handelstartwork = async () => {
    setLoad(true);

    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.put(
        'technician/booking/status',
        {
          bookingId: Data?._id,
          status: 'IN_PROGRESS',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res?.status === true) {
        // naviagte to screen service report
        getData();
        // Alert.alert('45');
      }
    } catch (error) {
      console.log('Error:', error.response?.data);
      Alert.alert('Error', error?.message || 'Something went wrong');
    } finally {
      setLoad(false);
    }

    // navigation.navigate('Jobupdate',);
  };

  const ViewReport = () => {
    navigation?.navigate('Viewservicereport');
  };
  return (
    <MainContainer>
      <Header title={i18n.t('Viewdetails')} />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: Colors.lightGray,
            marginTop: 14,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text allowFontScaling={false} style={styles.labeltext}>
            {i18n.t('CustomerName')}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {Data?.customer?.name}
          </Text>

          <View style={styles.topconatiner}>
            <View>
              <Text allowFontScaling={false} style={styles.labeltext}>
                {i18n.t('Number')}
              </Text>
              <Text allowFontScaling={false} style={styles.text}>
                {Data?.customer?.phoneNumber}
              </Text>
            </View>
            <TouchableOpacity
            // onPress={() => makeCall(item?.customer?.phoneNumber)}
            >
              <Image
                source={images.telephoneimg}
                style={{ width: wp(9), height: wp(9) }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.topconatiner}>
            <View>
              <Text allowFontScaling={false} style={styles.labeltext}>
                {i18n.t('Address')}
              </Text>
              <Text allowFontScaling={false} style={styles.text}>
                {shortAddress}
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={images.navigationimg}
                style={{ width: wp(9), height: wp(9) }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.topconatiner}>
            <View>
              <Text allowFontScaling={false} style={styles.labeltext}>
                {i18n.t('Issue')}
              </Text>
              <Text allowFontScaling={false} style={styles.textfirst}>
                --------
              </Text>
            </View>
            <View style={{ marginRight: 12 }}>
              <Text allowFontScaling={false} style={styles.labeltext}>
                {i18n.t('Date')}
              </Text>
              <Text allowFontScaling={false} style={styles.textfirst}>
                {formatDate(Data?.date)}
              </Text>
            </View>
          </View>

          <FlatList
            data={Data?.services}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.topconatiner}>
                  <View>
                    <Text allowFontScaling={false} style={styles.labeltext}>
                      {i18n.t('Issue')}
                    </Text>
                    <Text allowFontScaling={false} style={styles.textfirst}>
                      {item?.name}
                    </Text>
                  </View>
                  <View style={{ marginRight: 12 }}>
                    <Text allowFontScaling={false} style={styles.labeltext}>
                      {i18n.t('ACQty')}
                    </Text>
                    <Text allowFontScaling={false} style={styles.textfirst}>
                      {item?.quantity} ,{item?.acType}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.topconatiner}>
            <View>
              <Text allowFontScaling={false} style={styles.labeltext}>
                {i18n.t('ACBrand')}
              </Text>
              <Text allowFontScaling={false} style={styles.textfirst}>
                --------
              </Text>
            </View>
            <View style={{ marginRight: 12 }}>
              <Text allowFontScaling={false} style={styles.labeltext}>
                {i18n.t('Payment')}
              </Text>
              <Text
                allowFontScaling={false}
                style={[styles.textfirst, { color: 'green' }]}
              >
                --------
              </Text>
            </View>
          </View>
          {_id?.logic === 'logic' ? (
            <PrimaryButton
              title={i18n.t('ViewServiceReport')}
              style={{ marginTop: 10 }}
              onPress={() => ViewReport()}
            />
          ) : (
            <>
              {' '}
              {Data?.status === 'IN_PROGRESS' ? (
                <View>
                  <TouchableOpacity
                    disabled={true}
                    // onPress={}
                    style={{
                      borderWidth: 1,
                      borderRadius: 45,
                      paddingVertical: 10,
                      alignItems: 'center',
                      // width: wp(40),
                      marginTop: 15,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                      // flexDirection: 'row',
                      borderColor: Colors.primary,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[styles.text, { color: Colors.primary }]}
                    >
                      {i18n.t('Processing')}
                    </Text>
                  </TouchableOpacity>
                  <PrimaryButton
                    onPress={handlecompleted}
                    style={{ marginTop: 15 }}
                    title={i18n.t('Completed')}
                  />
                </View>
              ) : Data?.status === 'COMPLETE' ? (
                <TouchableOpacity
                  disabled={true}
                  style={{
                    backgroundColor: '#66D76A',
                    borderRadius: 45,
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  <Text
                    allowFontScaling={false}
                    style={[styles.text, { color: Colors.text }]}
                  >
                    {i18n.t('Completed')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <PrimaryButton
                  loading={Load}
                  title={i18n.t('StartWork')}
                  style={{ marginTop: 10 }}
                  onPress={handelstartwork}
                />
              )}
            </>
          )}
        </View>
      )}
    </MainContainer>
  );
};

export default Jobviewdetails;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labeltext: {
    fontSize: rf(13),
    color: Colors?.gray,
    fontFamily: Fonts?.pop500,
  },
  text: {
    width: wp(70),
    // backgroundColor: 'red',
    marginTop: 3,
    color: Colors.white,
    fontSize: rf(17),
    fontFamily: Fonts.pop500,
  },
  text: {
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
  },
  topconatiner: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textfirst: {
    marginTop: 1,
    color: Colors.white,
    fontSize: rf(17),
    fontFamily: Fonts.pop500,
  },
});
