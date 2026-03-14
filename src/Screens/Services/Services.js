import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../assets/Images/images';
import { useNavigation } from '@react-navigation/native';

const Services = () => {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  console.log(Data, 'lemada');
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      setLoading(true);
      const res = await apiService.get('/technician/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res, 'sachin');

      if (res.status === 'success') {
        // setData(res?.data);
        const filteredJobs = res.data.filter(item => item.status === 'PAID');
        setData(filteredJobs);
      }
    } catch (error) {
      Alert.alert('API Error');
    } finally {
      setLoading(false);
    }
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
    const logic = 'logic';
    navigation.navigate('Jobviewdetails', { bookingId, logic });
  };
  const navigation = useNavigation();

  const ViewReport = () => {
    navigation?.navigate('Viewservicereport');
  };
  return (
    <MainContainer>
      <Header title={i18n.t('JobHistory')} />
      {Loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : Data.length === 0 ? (
        <View style={styles.center}>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: rf(18),
              fontFamily: Fonts.pop700,
            }}
          >
            You Have No Completed Job ?
          </Text>
        </View>
      ) : (
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            const fullAddress = `${item?.address?.house}, ${item?.address?.street}, ${item?.address?.city}, ${item?.address?.zipcode}`;
            const shortAddress =
              fullAddress.length > 20
                ? fullAddress.substring(0, 20) + '...'
                : fullAddress;
            return (
              <>
                {item?.status === 'PAID' ? (
                  <View
                    style={{
                      backgroundColor: Colors.lightGray,
                      marginTop: 14,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[styles.labeltext, { color: Colors?.primary }]}
                    >
                      {'Booking ID'}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[styles.text, { marginBottom: 5 }]}
                    >
                      {item?.bookingId}
                    </Text>
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
                      {/* <TouchableOpacity
                        disabled={true}
                        onPress={() => makeCall(item?.customer?.phoneNumber)}
                      >
                        <Image
                          source={images.telephoneimg}
                          style={{ width: wp(9), height: wp(9) }}
                        />
                      </TouchableOpacity> */}
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
                      {/* <TouchableOpacity disabled={true}>
                        <Image
                          source={images.navigationimg}
                          style={{ width: wp(9), height: wp(9) }}
                        />
                      </TouchableOpacity> */}
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

                    {/* <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        paddingHorizontal: 10,
                      }}
                    > */}
                    <PrimaryButton
                      onPress={() => ViewReport(item?._id)}
                      style={{
                        width: wp(40),
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                      title={i18n.t('ViewServiceReport')}
                    />

                    {/* <TouchableOpacity
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
                      </TouchableOpacity> */}
                    {/* </View> */}
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

export default Services;

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
  labeltext: {
    fontSize: rf(13),
    color: Colors?.gray,
    fontFamily: Fonts?.pop500,
  },
});
