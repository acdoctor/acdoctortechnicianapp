import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import CalendarStrip from '../../components/CalendarStrip';
import PrimaryButton from '../../components/PrimaryButton';

import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import apiService from '../../Services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../assets/Images/images';
import i18n from '../../components/i18n';

const Attendance = () => {
  const [loading, setLoading] = useState(false);
  const [PageLoading, setPageLoading] = useState(true);
  const [attendanceList, setAttendanceList] = useState([]);
  const [isTodayPresent, setIsTodayPresent] = useState(false);
  const [isTodayCheckedOut, setIsTodayCheckedOut] = useState(false);
  const todayISO = new Date().toISOString().split('T')[0];
  console.log(attendanceList);
  const flatListRef = useRef(null);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: todayDate - 1, // date starts from 1, index from 0
        animated: true,
        viewPosition: 0.5, // center
      });
    }
  }, []);
  const formattedDate = new Date()
    .toLocaleDateString('en-GB')
    .replace(/\//g, '-');
  const startOfMonthISO = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
  };
  const formatTime = date =>
    date
      ? new Date(date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      : '--';
  const displayDate = iso => {
    const [y, m, d] = iso.split('-');
    return `${d}-${m}-${y}`;
  };
  const getAttendance = useCallback(async () => {
    setPageLoading(true);
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');

      const res = await apiService.get(
        `/technician/attendance?startDate=${startOfMonthISO()}&endDate=${todayISO}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res?.status) {
        Alert.alert(res?.message || 'Something went wrong');
        return;
      }

      setAttendanceList(res?.data || []);

      const todayRecord = res?.data?.find(
        item => item?.date?.split('T')[0] === todayISO,
      );

      setIsTodayPresent(todayRecord?.type === 'PRESENT');
      setIsTodayCheckedOut(!!todayRecord?.checkOutTime);
    } catch (err) {
      Alert.alert(err?.message || 'API Error');
    } finally {
      setPageLoading(false);
    }
  }, [todayISO]);

  useEffect(() => {
    getAttendance();
    setPageLoading(true);
  }, [getAttendance]);
  const convertWorkingTimeToHours = workingTime => {
    // null, undefined, empty, NA cases
    if (
      workingTime === null ||
      workingTime === undefined ||
      workingTime === '' ||
      workingTime === 'NA' ||
      workingTime === '/NA' ||
      workingTime === 'N/A'
    ) {
      return '0.00';
    }

    // agar number me minutes aa rahe ho (0 bhi)
    if (typeof workingTime === 'number') {
      return (workingTime / 60).toFixed(2);
    }

    // agar string "HH:MM" format me ho
    if (typeof workingTime === 'string' && workingTime.includes(':')) {
      const [hours, minutes] = workingTime.split(':').map(Number);

      if (isNaN(hours) || isNaN(minutes)) return '0.00';

      return (hours + minutes / 60).toFixed(2);
    }

    return '0.00';
  };
  console.log(todayISO, 'date');
  const handleAttendance = async type => {
    const body = {
      date: formattedDate,
      type,
      description: '',
    };
    console.log(body);
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');

      const res = await apiService.post('/technician/attendance', body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.status) {
        ToastAndroid.show(res?.message, ToastAndroid.SHORT);
        getAttendance();
      } else {
        Alert.alert(res?.message);
      }
    } catch (err) {
      Alert.alert(err?.message || 'Submit Failed');
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({ item }) => {
    const formattedDate = new Date(item?.createdAt).toLocaleDateString(
      'en-US',
      { weekday: 'long', day: 'numeric', month: 'short' },
    );

    return (
      <>
        {item?.type === 'ABSENT' ? (
          <View
            style={[
              styles.card,
              { borderWidth: 1, borderColor: Colors?.primary },
            ]}
          >
            {/* <Text allowFontScaling={false}  style={styles.absentText}>ABSENT</Text> */}
            <Text allowFontScaling={false} style={styles.date}>
              {formattedDate}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                fontSize: rf(16),
                fontFamily: Fonts?.pop600,
                color: Colors?.primary,
              }}
            >
              {item?.description}
            </Text>
          </View>
        ) : null}
        <View
          style={[styles.card, { borderColor: Colors?.gray, borderWidth: 1 }]}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text allowFontScaling={false} style={styles.date}>
              {formattedDate}
            </Text>
            <Text allowFontScaling={false} style={styles.date}>
              {convertWorkingTimeToHours(item?.workingTime)} hr
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.timeBlock}>
              <Image source={images.checkin} style={styles.icon} />
              <View>
                <Text allowFontScaling={false} style={styles.present}>
                  Present
                </Text>
                <Text allowFontScaling={false} style={styles.time}>
                  {formatTime(item?.createdAt)}
                </Text>
              </View>
            </View>

            <View style={styles.timeBlock}>
              <Image source={images.checkout} style={styles.icon} />
              <View>
                <Text allowFontScaling={false} style={styles.checkout}>
                  Log Out
                </Text>
                <Text allowFontScaling={false} style={styles.time}>
                  {formatTime(item?.checkOutTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <MainContainer>
      <Header title={i18n.t('Attendance')} />

      {/* {PageLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <> */}
      <View style={styles.headerBox}>
        <Text allowFontScaling={false} style={styles.monthText}>
          {new Date().toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>

        <CalendarStrip />

        {!isTodayPresent && !isTodayCheckedOut && (
          <PrimaryButton
            title="Present"
            loading={loading}
            onPress={() => handleAttendance('PRESENT')}
            style={styles.button}
          />
        )}

        {isTodayPresent && !isTodayCheckedOut && (
          <PrimaryButton
            title="Check Out"
            loading={loading}
            onPress={() => handleAttendance('CHECK_OUT')}
            style={styles.button}
          />
        )}
      </View>

      <Text allowFontScaling={false} style={styles.historyTitle}>
        Attendance History
      </Text>
      {PageLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <>
          {attendanceList.length === 0 ? (
            <Text allowFontScaling={false} style={styles.empty}>
              This Month No Attendance
            </Text>
          ) : (
            <FlatList
              scrollEnabled={true}
              data={attendanceList}
              renderItem={renderItem}
            />
          )}
        </>
      )}

      {/* </>
      )} */}
    </MainContainer>
  );
};

export default Attendance;
const styles = StyleSheet.create({
  textlable: {
    // color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.pop500,
  },
  headerBox: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },

  monthText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: rf(15),
    fontFamily: Fonts.pop500,
    marginBottom: 10,
  },

  button: {
    width: wp(40),
    alignSelf: 'center',
    top: 34,
  },

  historyTitle: {
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
    marginTop: 30,
  },

  empty: {
    color: Colors.white,
    fontSize: rf(18),
    fontFamily: Fonts.pop600,
    textAlign: 'center',
    marginTop: 40,
  },
  absentContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFEAEA',
    borderRadius: 6,
    alignItems: 'center',
  },

  absentText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 20,
    borderRadius: 12,
  },

  date: {
    fontSize: rf(15),
    fontFamily: Fonts.pop500,
    color: Colors.white,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: wp(8),
    height: wp(8),
  },

  present: {
    color: '#5BC390',
    fontSize: rf(13),
    fontFamily: Fonts.pop600,
  },

  checkout: {
    color: Colors.primary,
    fontSize: rf(13),
    fontFamily: Fonts.pop600,
  },

  time: {
    color: Colors.gray,
    fontSize: rf(15),
    fontFamily: Fonts.pop600,
  },
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// import {
//   Alert,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   ToastAndroid,
//   View,
// } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import MainContainer from '../../components/MainContainer';
// import Header from '../../components/Header';
// import i18n from '../../components/i18n';
// import Colors, { Fonts } from '../../utils/Colors';
// import { rf, wp } from '../../components/Responvie';
// import CalendarStrip from '../../components/CalendarStrip';
// import PrimaryButton from '../../components/PrimaryButton';
// import apiService from '../../Services/apiService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import images from '../../assets/Images/images';
// const Attendence = () => {
//   const [Loading, setLoading] = useState(false);
//   const flatListRef = useRef(null);
//   useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToIndex({
//         index: todayDate - 1, // date starts from 1, index from 0
//         animated: true,
//         viewPosition: 0.5, // center
//       });
//     }
//   }, []);
//   const currentDate = new Date();

//   const monthYear = currentDate.toLocaleString('en-US', {
//     month: 'long', // Full month name
//     year: 'numeric',
//   });
//   const today = new Date();
//   const currentYear = today.getFullYear();
//   const currentMonth = today.getMonth(); // 0-11
//   const todayDate = today.getDate();

//   // total days in current month
//   const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

//   // calendar data
//   const calendarData = Array.from({ length: totalDays }, (_, index) => {
//     const date = index + 1;
//     const dayName = new Date(currentYear, currentMonth, date).toLocaleString(
//       'en-US',
//       { weekday: 'short' },
//     );

//     return {
//       date,
//       day: dayName,
//     };
//   });
//   const ITEM_WIDTH = wp(15) + 10;
//   useEffect(() => {
//     getAttendance();
//   }, []);
//   const [Data, setData] = useState([]);
//   const getStartOfMonth = () => {
//     const now = new Date();
//     return new Date(now.getFullYear(), now.getMonth(), 1)
//       .toISOString()
//       .split('T')[0];
//   };

//   const getTodayDate = () => {
//     return new Date().toISOString().split('T')[0];
//   };
//   const [isTodayPresent, setIsTodayPresent] = useState(false);
//   console.log(isTodayPresent);
//   const getAttendance = async () => {
//     const startDate = getStartOfMonth(); // month ki 1st date
//     const endDate = getTodayDate();
//     const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');
//     try {
//       const res = await apiService.get(
//         `/technician/attendance?startDate=${startDate}&endDate=${endDate}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accestoken}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       console.log(res);
//       if (res?.status === true) {
//         setData(res?.data || []);
//         const todayAttendance = res?.data?.find(item => {
//           const apiDate = item?.date?.split('T')[0]; // YYYY-MM-DD
//           return apiDate === endDate && item?.type === 'PRESENT';
//         });
//         setIsTodayPresent(!!todayAttendance);
//       } else {
//         Alert.alert(res?.message);
//       }
//     } catch (error) {
//       Alert.alert(error?.message);
//     }
//   };
//   const formatTime = dateString => {
//     const date = new Date(dateString);

//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
//   };
//   const HandlePresent = async () => {
//     setLoading(true);
//     const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');
//     const enddate = getTodayDate();
//     try {
//       const res = await apiService.post(
//         '/technician/attendance',
//         {
//           date: enddate,
//           description: '',
//           type: 'PRESENT',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accestoken}`,
//           },
//         },
//       );

//       if (res?.status === true) {
//         getAttendance();

//         ToastAndroid.show(res?.message, ToastAndroid.SHORT);
//       } else {
//         Alert.alert(res?.message);
//       }
//       getAttendance();
//     } catch (error) {
//       Alert.alert(error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <MainContainer>
//       <Header title={i18n.t('Attendance')} />
//       <View
//         style={{
//           backgroundColor: Colors.lightGray,
//           paddingVertical: 12,
//           marginTop: 15,
//           paddingHorizontal: 10,
//           paddingBottom: 10,
//           borderRadius: 10,
//         }}
//       >
//         <Text allowFontScaling={false}
//           style={{
//             alignSelf: 'center',
//             color: Colors.white,
//             fontSize: rf(15),
//             fontFamily: Fonts.pop500,
//           }}
//         >
//           {monthYear}
//         </Text>
//         <CalendarStrip />
//         {!isTodayPresent && (
//           <PrimaryButton
//             loading={Loading}
//             onPress={() => HandlePresent()}
//             title={'Present'}
//             style={{ width: wp(40), alignSelf: 'center', top: 34 }}
//           />
//         )}
//       </View>
//       <Text allowFontScaling={false}
//         style={{
//           color: Colors.white,
//           fontSize: rf(16),
//           fontFamily: Fonts.pop600,
//           marginTop: 35,
//         }}
//       >
//         Attendance History
//       </Text>
//       {Data.length === 0 ? (
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: Colors.background,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Text allowFontScaling={false}
//             style={{
//               color: Colors.white,
//               fontSize: rf(18),
//               fontFamily: Fonts.pop600,
//             }}
//           >
//             This Month No Attendance
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={Data}
//           renderItem={({ item, index }) => {
//             const apiDate = item?.createdAt;
//             const dateObj = new Date(apiDate);
//             const formattedDate = dateObj.toLocaleString('en-US', {
//               weekday: 'long',
//               day: 'numeric',
//               month: 'short',
//               // year: 'numeric',
//             });
//             console.log(formattedDate, 'lololololo');
//             return (
//               <View
//                 style={{
//                   backgroundColor: Colors.lightGray,
//                   // width: wp(10),
//                   // height: wp(10),
//                   paddingVertical: 15,
//                   paddingHorizontal: 10,
//                   marginTop: 20,
//                   borderRadius: 12,
//                 }}
//               >
//                 <Text allowFontScaling={false}
//                   style={{
//                     fontSize: rf(15),
//                     fontFamily: Fonts.pop500,
//                     color: Colors.white,
//                   }}
//                 >
//                   {formattedDate}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     marginTop: 15,
//                   }}
//                 >
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image
//                       source={images.checkin}
//                       style={{ width: wp(8), height: wp(8) }}
//                     />
//                     <View style={{ marginLeft: 5 }}>
//                       <Text allowFontScaling={false}
//                         style={{
//                           color: '#5BC390',
//                           fontSize: rf(13),
//                           fontFamily: Fonts.pop600,
//                         }}
//                       >
//                         Present
//                       </Text>
//                       <Text allowFontScaling={false}
//                         style={{
//                           color: Colors.gray,
//                           fontSize: rf(15),
//                           fontFamily: Fonts.pop600,
//                         }}
//                       >
//                         {formatTime(item?.createdAt)}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image
//                       source={images.checkout}
//                       style={{ width: wp(8), height: wp(8) }}
//                     />
//                     <View style={{ marginLeft: 5 }}>
//                       <Text allowFontScaling={false}
//                         style={{
//                           color: Colors.primary,
//                           fontSize: rf(13),
//                           fontFamily: Fonts.pop600,
//                         }}
//                       >
//                         Present
//                       </Text>
//                       <Text allowFontScaling={false}
//                         style={{
//                           color: Colors.gray,
//                           fontSize: rf(15),
//                           fontFamily: Fonts.pop600,
//                         }}
//                       >
//                         ----
//                         {/* {formatTime(item?.createdAt)} */}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             );
//           }}
//         />
//       )}
//     </MainContainer>
//   );
// };

// export default Attendence;

// const styles = StyleSheet.create({
//   textlable: {
//     // color: Colors.white,
//     fontSize: rf(16),
//     fontFamily: Fonts.pop500,
//   },
// });
