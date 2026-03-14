import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { hp, rf, wp } from '../../components/Responvie';
import images from '../../assets/Images/images';
import DetailsCard from '../../components/DetailsCard';

const ShowErrorCode = ({ route }) => {
  const data = route?.params;
  console.log(data, '--------->');
  return (
    <MainContainer>
      <Header title={i18n.t('ErrorCodes')} />
      <View
        style={{
          backgroundColor: Colors.lightGray,
          borderRadius: 10,
          marginTop: 20,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginHorizontal: 15,
            paddingHorizontal: 15,
            paddingVertical: 20,

            borderBottomWidth: 1,
            borderBottomColor: Colors.white,
            // paddingBottom: 20,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={data?.selected?.img}
              style={{ width: wp(9), height: wp(9) }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.gray,
                  fontSize: rf(12),
                  fontFamily: Fonts.pop500,
                }}
              >
                Brand
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.white,
                  fontSize: rf(12),
                  fontFamily: Fonts.pop600,
                }}
              >
                {data?.selected?.label}
              </Text>
            </View>
          </View>{' '}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={data?.SelectedType?.img}
              style={{ width: wp(8), height: wp(8) }}
            />
            <View style={{ marginLeft: 0 }}>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.gray,
                  fontSize: rf(12),
                  fontFamily: Fonts.pop500,
                }}
              >
                AC Type
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.white,
                  fontSize: rf(12),
                  fontFamily: Fonts.pop600,
                }}
              >
                {data?.SelectedType?.label}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={images?.errorcode}
              style={{ width: wp(9), height: wp(9) }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.gray,
                  fontSize: rf(12),
                  fontFamily: Fonts.pop500,
                }}
              >
                Error Code
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.white,
                  fontSize: rf(12),
                  fontFamily: Fonts.pop600,
                }}
              >
                {data?.ErrorCode}
              </Text>
            </View>
          </View>
        </View>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.gray,
            fontSize: rf(12),
            fontFamily: Fonts.pop600,
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          Heading
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(13),
            fontFamily: Fonts.pop700,
            marginLeft: 15,
            marginTop: 2,
          }}
        >
          Indoor Unit Sensor Fault Inverter AC error Codes
        </Text>{' '}
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.gray,
            fontSize: rf(12),
            fontFamily: Fonts.pop600,
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          Meaning:
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(13),
            fontFamily: Fonts.pop700,
            marginLeft: 15,
            marginTop: 2,
          }}
        >
          Tempreature Sensor malfunction{' '}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.gray,
            fontSize: rf(12),
            fontFamily: Fonts.pop600,
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          Solution:
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(13),
            fontFamily: Fonts.pop700,
            marginLeft: 15,
            marginTop: 2,
          }}
        >
          1: Check The Sensor wiring for Loose connections.
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(13),
            fontFamily: Fonts.pop700,
            marginLeft: 15,
            marginTop: 2,
          }}
        >
          2: Replace the sensor If necessary
        </Text>
      </View>
      <Image
        source={images.card2}
        style={{
          width: '100%',
          height: hp(15),
          marginTop: 15,
          borderRadius: 7,
        }}
      />
      <DetailsCard
        title="Details"
        data={[
          'Lorem Ipsum is simply dummy text.',
          'Lorem Ipsum is simply dummy text.',
          'Lorem Ipsum is simply dummy text.',
          'Lorem Ipsum is simply dummy text.',
        ]}
      />
    </MainContainer>
  );
};

export default ShowErrorCode;

const styles = StyleSheet.create({});
