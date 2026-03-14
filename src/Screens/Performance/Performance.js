import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import DonutChart from '../../components/DonutChart';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import images from '../../assets/Images/images';
import apiService from '../../Services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Performance = () => {
  const type = AsyncStorage.getItem('Type');

  useEffect(() => {
    getData();
  }, []);
  const [Data, setData] = useState([]);
  console.log(Data, 'lolo');
  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    try {
      const res = await apiService.get('/technician/my-performance-score', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, 'lolololoololoollolololo');
      if (res?.status === true) {
        setData(res?.data);
      }
    } catch (error) {}
  };
  const static_data = [
    {
      image: images?.Kavra,
      text: 'KRAVRA',
      text1: 'Present',
      text2: 'Late Come Office',
      text3: 'Absent (WP)',
      text4: 'Leave',
    },
    {
      image: images?.day,
      text: 'Day',
      text1: '10',
      text2: '25',
      text3: '75',
      text4: '1',
    },
    {
      image: images?.Kavra,
      text: 'Total Day',
      text1: '20',
      text2: '25',
      text3: '75',
      text4: '8',
    },
    {
      image: images?.TotalPoints,
      text: 'Total Points',
      text1: '20',
      text2: '25',
      text3: '75',
      text4: '5',
    },
  ];

  const demodata1 = [
    { text: 'Late Come Office' },
    { text: '24' },
    { text: '26' },
    { text: '24' },
  ];
  return (
    <MainContainer>
      <Header title={i18n.t('Performance')} />
      <DonutChart
        centerValue={'20%'}
        totalText="Total Score"
        data={[
          {
            value: '40',
            color: '#66D76A',
            label: 'Attendance',
          },
          {
            value: '20',
            color: Colors.primary,
            label: 'Job Performance',
          },
          {
            value: '40',
            color: '#3A98CC',
            label: 'Customer Rating',
          },
        ]}
      />

      <View style={[styles?.mainContainer, { marginTop: '25%' }]}>
        <Text allowFontScaling={false} style={styles?.headerText}>
          Job Score
        </Text>

        <View style={[styles?.rowContainer]}>
          {static_data.map((item, index) => (
            <View key={index} style={styles?.center}>
              {/* <Image source={item.image} style={styles?.imagesstyel} /> */}
              <Text
                allowFontScaling={false}
                style={[styles?.imagesdesing, { marginTop: 3 }]}
              >
                {item.text}
              </Text>
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    { color: index === 1 ? Colors.primary : Colors?.white },
                  ]}
                >
                  {item.text1}
                </Text>
              </View>
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    {
                      color: index === 1 ? Colors.primary : Colors?.white,
                      width: index === 0 ? wp(20) : null,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.text2}
                </Text>
              </View>{' '}
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    {
                      color: index === 1 ? Colors.primary : Colors?.white,
                      width: index === 0 ? wp(20) : null,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.text3}
                </Text>
              </View>
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    {
                      color: index === 1 ? Colors.primary : Colors?.white,
                      width: index === 0 ? wp(20) : null,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.text4}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      {type === 'FC' ? (
        <View style={[styles?.mainContainer, { marginTop: '5%' }]}>
          <Text allowFontScaling={false} style={styles?.headerText}>
            Attendance Score
          </Text>

          <View style={styles?.rowContainer}>
            {static_data?.map((item, index) => (
              <View style={styles?.center}>
                <Image source={item.image} style={styles?.imagesstyel} />
                <Text
                  allowFontScaling={false}
                  style={[styles?.imagesdesing, { marginTop: 3 }]}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
          {Data?.attendanceScore?.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopWidth: 1,
                borderTopColor: Colors?.white,
                marginTop: 5,
                paddingVertical: 10,
                paddingHorizontal: 22,
              }}
            >
              <View style={{ width: wp(14) }}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    { color: Colors?.white, textAlign: 'center' },
                  ]}
                >
                  {item.activityName}
                </Text>
              </View>

              <View style={{ width: wp(11) }}>
                <Text style={styles?.imagesdesing}>{item?.day}</Text>
              </View>
              <View style={{ width: wp(11) }}>
                <Text style={styles?.imagesdesing}>{item?.totalDay}</Text>
              </View>
              <View style={{ width: wp(11) }}>
                <Text style={styles?.imagesdesing}>{item?.totalPoints}</Text>
              </View>
            </View>
          ))}
          {/* <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    { color: index === 1 ? Colors.primary : Colors?.white },
                  ]}
                >
                  {item.text1}
                </Text>
              </View>
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    {
                      color: index === 1 ? Colors.primary : Colors?.white,
                      width: index === 0 ? wp(20) : null,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.text2}
                </Text>
              </View>{' '}
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    {
                      color: index === 1 ? Colors.primary : Colors?.white,
                      width: index === 0 ? wp(20) : null,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.text3}
                </Text>
              </View>
              <View style={styles?.UNDERCONATNER}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles?.imagesdesing,
                    {
                      color: index === 1 ? Colors.primary : Colors?.white,
                      width: index === 0 ? wp(20) : null,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.text4}
                </Text>
              </View> */}
        </View>
      ) : null}
    </MainContainer>
  );
};

export default Performance;

const styles = StyleSheet.create({
  headerText: {
    color: Colors?.white,
    marginHorizontal: 12,
    marginVertical: 16,
    fontSize: rf(16),
    fontFamily: Fonts?.Pop400,
  },
  mainContainer: {
    backgroundColor: Colors?.lightGray,

    borderRadius: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1.5,
    borderTopColor: Colors?.gray,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  imagesdesing: {
    color: Colors?.white,
    fontSize: rf(12),
    // marginTop: 3,
    // alignSelf: 'center',

    fontFamily: Fonts?.pop500,
  },
  imagesstyel: { width: wp(11), height: wp(11), resizeMode: 'contain' },
  center: { alignItems: 'center' },
  container: {
    backgroundColor: '#1C1C1C',
    borderRadius: 14,
    padding: 16,
    margin: 16,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#333',
  },

  headerRow: {
    paddingBottom: 14,
  },

  headerCell: {
    flex: 1,
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
  },

  cell: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },

  circle: {
    flex: 1,
    alignItems: 'center',
  },

  circleText: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#2B2B2B',
    textAlign: 'center',
    lineHeight: 32,
    color: '#fff',
    fontSize: 14,
  },

  red: {
    color: '#E53935',
  },
  UNDERCONATNER: {
    marginTop: 20,
  },
});
