import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import DonutChart from '../../components/DonutChart';
import Colors, { Fonts } from '../../utils/Colors';
import PrimaryButton from '../../components/PrimaryButton';
import { rf, wp } from '../../components/Responvie';
import i18n from '../../components/i18n';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import images from '../../assets/Images/images';
import PeriodDropdown from '../../components/PeriodDropdown';
const Leaves = () => {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(true);
  const handleRequestLeave = () => {
    navigation.navigate('RequestLeave');
  };
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getAttendance();
      return () => {};
    }, []),
  );
  const [Data, setData] = useState([]); // full data
  const [visibleData, setVisibleData] = useState([]); // sirf 5
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;
  const [SummaryData, setSummaryData] = useState({});
  const getAttendance = async period => {
    console.log(period?.period, '-========');
    setLoading(true);
    const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');
    try {
      const res = await apiService.get(
        `/technician/leave/list?filter=${period?.period || 'monthly'}`,
        {
          headers: {
            Authorization: `Bearer ${accestoken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res, '123123123213213jatin2131231232131');
      if (res?.status === true) {
        // setData(res?.data || []);
        if (res?.status === true) {
          const fullData = res?.data || [];
          setData(fullData);
          setSummaryData(res?.summary);
          // first 5 only
          setVisibleData(fullData.slice(0, ITEMS_PER_PAGE));
          setPage(1);
        }
        // const todayAttendance = res?.data?.find(item => {
        //   const apiDate = item?.date?.split('T')[0]; // YYYY-MM-DD
        //   return apiDate === endDate && item?.type === 'PRESENT';
        // });
        // setIsTodayPresent(!!todayAttendance);
      } else {
        Alert.alert(res?.message);
      }
    } catch (error) {
      Alert.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const nextData = Data.slice(startIndex, endIndex);

    if (nextData.length > 0) {
      setVisibleData(nextData); // 🔥 replace, not append
      setPage(nextPage);
    }
  };
  return (
    <MainContainer>
      <Header title={'Leaves'} />
      <PeriodDropdown
        onPeriodChange={value => {
          // SAME API ME PASS

          getAttendance({
            period: value,
          });
        }}
      />
      {Loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <>
          <DonutChart
            centerValue={SummaryData?.counts?.LEAVE}
            totalText="Total Leaves"
            data={[
              {
                value: SummaryData?.presentPercentage,
                color: Colors.primary,
                label: 'Present',
              },
              {
                value: SummaryData?.absentPercentage,
                color: Colors.gray,
                label: 'Absent',
              },
              {
                value: SummaryData?.holidayPercentage,
                color: Colors.lightGray,
                label: 'Holiday',
              },
              {
                value: SummaryData?.leavePercentage,
                color: Colors.success,
                label: 'Leave',
              },
            ]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: '22%',

              paddingHorizontal: 10,
            }}
          >
            <PrimaryButton
              onPress={() => handleRequestLeave()}
              title={i18n.t('RequestLeaves')}
              style={{ paddingHorizontal: 20 }}
            />
            <PrimaryButton
              onPress={() => {
                Alert.alert(
                  'Under Process',
                  'This feature is under development 🚧',
                );
              }}
              title={i18n.t('ViewHoliday')}
              style={{
                // width: wp(40),
                paddingHorizontal: 20,
                backgroundColor: Colors.background,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}
            />
          </View>

          {Data.length === 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.background,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.white,
                  fontSize: rf(18),
                  fontFamily: Fonts.pop600,
                }}
              >
                {i18n.t('Youhaven')}
              </Text>
            </View>
          ) : (
            <>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors?.white,
                  fontSize: rf(15),
                  marginTop: 15,
                  fontFamily: Fonts?.pop700,
                }}
              >
                {'Recent Leave'}
              </Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                data={visibleData}
                renderItem={({ item, index }) => {
                  const startdate = new Date(
                    item?.startDate,
                  ).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  });
                  const endDate = new Date(item?.endDate).toLocaleDateString(
                    'en-US',
                    { weekday: 'short', day: 'numeric', month: 'short' },
                  );
                  console.log(startdate, 'asd', endDate);
                  return (
                    <View
                      style={{
                        backgroundColor: Colors.lightGray,
                        borderRadius: 11,
                        paddingVertical: 9,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image
                          source={images.Leave}
                          style={{ width: wp(10), height: wp(10) }}
                          resizeMode="contain"
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: Colors.white,
                              fontSize: rf(14),
                              fontFamily: Fonts?.pop500,
                              marginBottom: 1,
                            }}
                          >
                            {startdate}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: Colors.white,
                              fontSize: rf(14),
                              fontFamily: Fonts?.pop500,
                              marginTop: 4,
                            }}
                          >
                            {endDate}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          // backgroundColor: 'red',
                          width: '40%',
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{
                            alignSelf: 'flex-end',
                            fontSize: rf(17),
                            fontFamily: Fonts?.pop600,
                            color:
                              item?.status === 'PENDING'
                                ? Colors.primary
                                : item.status === 'APPROVED'
                                ? '#2E7D32'
                                : item.status === 'REJECT'
                                ? '#F9A825'
                                : Colors.white,
                          }}
                        >
                          {item?.status}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            // width: '40%',
                            alignSelf: 'flex-end',
                            color: Colors.gray,
                            fontSize: rf(8),
                            fontFamily: Fonts?.pop700,
                          }}
                        >
                          {item?.reason}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
              {Data.length > page * ITEMS_PER_PAGE && (
                <PrimaryButton
                  title="Load More"
                  onPress={handleLoadMore}
                  style={{ marginTop: 15 }}
                />
              )}
            </>
          )}
        </>
      )}
    </MainContainer>
  );
};

export default Leaves;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
