import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { rf } from '../../components/Responvie';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';

const Notification = () => {
  const [Data, setData] = useState([]);
  const formatTime = date => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  useFocusEffect(
    useCallback(() => {
      // screen focus hone par
      getData();
      return () => {
        // screen unfocus hone par (optional)
        getData();
      };
    }, []),
  );
  const [Loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    try {
      const res = await apiService.get('/technician/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, '------');
      if (res?.status === true) {
        setData(res?.data);
      }
    } catch (error) {
      console.log(error, 'erroe messaghe');
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainContainer>
      <Header title={i18n.t('Notification')} />

      {Loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : Data.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.primary,
              fontSize: rf(18),
              fontFamily: Fonts.pop700,
            }}
          >
            No Notifications
          </Text>
        </View>
      ) : (
        <FlatList
          data={Data}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.gray,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.white,
                  fontSize: rf(14),
                  width: '85%',
                  fontFamily: Fonts.pop500,
                }}
              >
                {item?.text}
              </Text>

              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.success,
                  fontSize: rf(10),
                  fontFamily: Fonts.pop700,
                }}
              >
                {formatTime(item?.createdAt)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </MainContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({});
