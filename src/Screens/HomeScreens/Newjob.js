import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import apiService from '../../Services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import images from '../../assets/Images/images';
import PrimaryButton from '../../components/PrimaryButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Newjob = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const retryTimeoutRef = useRef(null);
  console.log(data, 'asd');

  const retryTimeoutRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      setLoading(true);
      const res = await apiService.get('/technician/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // if (res.status === 'success') {
      //   setData(res.data);
      // }
      if (res.status === 'success') {
        const filteredJobs = res.data.filter(
          item =>
            item.status === 'TECHNICIAN_ASSIGNED' ||
            item.status === 'IN_PROGRESS',
        );

        // Optional: TECHNICIAN_ASSIGNED ko top pe lane ke liye
        const sortedData = filteredJobs.sort((a, b) => {
          if (
            a.status === 'TECHNICIAN_ASSIGNED' &&
            b.status !== 'TECHNICIAN_ASSIGNED'
          ) {
            return -1;
          }
          if (
            b.status === 'TECHNICIAN_ASSIGNED' &&
            a.status !== 'TECHNICIAN_ASSIGNED'
          ) {
            return 1;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setData(sortedData);
      }
    } catch (error) {
      Alert.alert('API Error');
    } finally {
      setLoading(false);
    }
  };
  const makeCall = phoneNumber => {
    // console.log(phoneNumber);
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const formatDate = dateString => {
    if (!dateString) return '';

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`; // 02012026
  };
  const handleViewDetails = bookingId => {
    navigation.navigate('Jobviewdetails', { bookingId });
  };
  const [Load, setLoad] = useState(false);
  const handelstartwork = async bookingId => {
    setLoad(true);
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.put(
        'technician/booking/status',
        {
          bookingId: bookingId,
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

        navigation.navigate('Jobviewdetails', { bookingId });
      }
    } catch (error) {
      console.log('Error:', error.response?.data);
      Alert.alert('Error', error?.message || 'Something went wrong');
    } finally {
      setLoad(false);
    }

    // navigation.navigate('Jobupdate',);
  };
  return (
    <MainContainer>
      <Header title={i18n.t('NewJob')} />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : data.length === 0 ? (
        <View style={styles.center}>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: rf(18),
              fontFamily: Fonts.pop700,
              textAlign: 'center',
            }}
          >
            You Have No Job Assigned from admin
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          style={{ marginTop: 10 }}
          renderItem={({ item, index }) => {
            const fullAddress = `${item?.address?.house}, ${item?.address?.street}, ${item?.address?.city}, ${item?.address?.zipcode}`;
            const shortAddress =
              fullAddress.length > 20
                ? fullAddress.substring(0, 20) + '...'
                : fullAddress;

            return (
              <>
                {item?.status === 'TECHNICIAN_ASSIGNED' ? (
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
                      {item?.customer?.name}
                    </Text>

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <Text allowFontScaling={false} style={styles.labeltext}>
                          {i18n.t('Number')}
                        </Text>
                        <Text allowFontScaling={false} style={styles.text}>
                          {item?.customer?.phoneNumber}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => makeCall(item?.customer?.phoneNumber)}
                      >
                        <Image
                          source={images.telephoneimg}
                          style={{ width: wp(9), height: wp(9) }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
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

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <Text allowFontScaling={false} style={styles.labeltext}>
                          {i18n.t('Issue')}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            marginTop: 3,
                            color: Colors.white,
                            fontSize: rf(17),
                            fontFamily: Fonts.pop500,
                          }}
                        >
                          {item?.serviceNames[0]}
                        </Text>
                      </View>
                      <View style={{ marginRight: 12 }}>
                        <Text allowFontScaling={false} style={styles.labeltext}>
                          {i18n.t('Date')}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            marginTop: 3,
                            color: Colors.white,
                            fontSize: rf(17),
                            fontFamily: Fonts.pop500,
                          }}
                        >
                          {formatDate(item?.date)}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        paddingHorizontal: 10,
                      }}
                    >
                      <PrimaryButton
                        loading={Load}
                        onPress={() => handelstartwork(item?._id)}
                        style={{ width: wp(40) }}
                        title={i18n.t('StartWork')}
                      />

                      <TouchableOpacity
                        onPress={() => handleViewDetails(item?._id)}
                        style={{
                          borderWidth: 1,
                          borderRadius: 45,
                          paddingVertical: 10,
                          alignItems: 'center',
                          width: wp(40),
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
                          {i18n.t('Viewdetails')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : item?.status === 'IN_PROGRESS' ? (
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
                      {item?.customer?.name}
                    </Text>

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <Text allowFontScaling={false} style={styles.labeltext}>
                          {i18n.t('Number')}
                        </Text>
                        <Text allowFontScaling={false} style={styles.text}>
                          {item?.customer?.phoneNumber}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => makeCall(item?.customer?.phoneNumber)}
                      >
                        <Image
                          source={images.telephoneimg}
                          style={{ width: wp(9), height: wp(9) }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
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

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        <Text allowFontScaling={false} style={styles.labeltext}>
                          {i18n.t('Issue')}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            marginTop: 3,
                            color: Colors.white,
                            fontSize: rf(17),
                            fontFamily: Fonts.pop500,
                          }}
                        >
                          {item?.serviceNames[0]}
                        </Text>
                      </View>
                      <View style={{ marginRight: 12 }}>
                        <Text allowFontScaling={false} style={styles.labeltext}>
                          {i18n.t('Date')}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            marginTop: 3,
                            color: Colors.white,
                            fontSize: rf(17),
                            fontFamily: Fonts.pop500,
                          }}
                        >
                          {formatDate(item?.date)}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        paddingHorizontal: 10,
                      }}
                    >
                      <PrimaryButton
                        onPress={() => handleViewDetails(item?._id)}
                        style={{ width: wp(40), backgroundColor: '#3B82F6' }}
                        title={'In Progress'}
                      />

                      <TouchableOpacity
                        onPress={() => handleViewDetails(item?._id)}
                        style={{
                          borderWidth: 1,
                          borderRadius: 45,
                          paddingVertical: 10,
                          alignItems: 'center',
                          width: wp(40),
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
                          {i18n.t('Viewdetails')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </>
            );
          }}
        />
      )}
    </MainContainer>
  );
};

export default Newjob;

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
});
