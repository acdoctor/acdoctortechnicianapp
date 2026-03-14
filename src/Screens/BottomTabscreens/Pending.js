import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MainContainer from '../../components/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import Header from '../../components/Header';
import Colors, { Fonts } from '../../utils/Colors';
import { rf } from '../../components/Responvie';

const Pending = () => {
  useEffect(() => {
    getPendingData();
  }, []);
  const getPendingData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.get('/technician/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === 'success') {
        console.log(res, '88888888888888');
      } else {
      }
    } catch (error) {}
  };
  return (
    <MainContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors?.white,
            fontFamily: Fonts?.pop700,
            fontSize: rf(18),
          }}
        >
          You Have No Pending Job's
        </Text>
      </View>
    </MainContainer>
  );
};

export default Pending;

const styles = StyleSheet.create({});
