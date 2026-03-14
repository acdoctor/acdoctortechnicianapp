import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import Colors, { Fonts } from '../../utils/Colors';
import { rf } from '../../components/Responvie';

const Myrequesttool = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [Img, setImg] = useState({});
  console.log(Img, 'slecetd data');
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    try {
      const res = await apiService.get('/technician/myTool/request', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, 'popopopopop');
      if (res?.status === true) {
        setdata(res?.data);
      }
    } catch (error) {}
  };
  const handlepress = item => {
    setVisible(true);
    setImg(item);
  };
  return (
    <MainContainer>
      <Header title={'History'} />
      {data.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.primary,
              fontSize: rf(16),
              fontFamily: Fonts.pop600,
              textAlign: 'center',
            }}
          >
            {'You Have No Request'}
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            style={{ marginTop: 10 }}
            data={data}
            renderItem={({ item, index }) => {
              // console.log(item, 'pppp');
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: Colors.background,
                    borderWidth: 1,
                    borderColor: Colors.gray,
                  }}
                >
                  <View>
                    <Text allowFontScaling={false} style={styles.label}>
                      {index + 1}-{item?.tools?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: Colors.gray,
                        fontSize: rf(13),
                        fontFamily: Fonts.Pop400,
                      }}
                    >
                      {item?.comment}
                    </Text>
                  </View>
                  <View>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.label,
                        { color: Colors.white, alignSelf: 'flex-end' },
                      ]}
                    >
                      QTY: {item?.quantity}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        marginTop: 5,
                        color:
                          item?.status === 'ASSIGNED'
                            ? '#F9A825'
                            : item?.status === 'REQUESTED'
                            ? '#1E88E5'
                            : item?.status === 'DENIED'
                            ? '#D32F2F'
                            : '#2E7D32',
                        fontSize: rf(13),
                        fontFamily: Fonts.pop700,
                      }}
                    >
                      {item?.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </MainContainer>
  );
};

export default Myrequesttool;

const styles = StyleSheet.create({
  label: {
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.pop700,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeBtn: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
