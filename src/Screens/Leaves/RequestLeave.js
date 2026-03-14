import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import images from '../../assets/Images/images';
import LeaveCalendar from '../../components/LeaveCalendar';
import PrimaryButton from '../../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const RequestLeave = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [dates, setDates] = useState({ start: null, end: null });
  const [Reason, setReason] = useState('');
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigation();
  console.log(dates);
  const displayDate = dateStr => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };
  const handleOpenCalendar = isStart => {
    setIsSelectingStart(isStart);
    setShowCalendar(true);
  };

  const handleConfirmDates = (start, end) => {
    setDates({ start, end });
    setShowCalendar(false);
  };
  const isButtonDisabled =
    !dates.start || !dates.end || Reason.trim().length === 0;

  const submit = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    try {
      const res = await apiService.post(
        '/technician/createLeaveRequest',
        {
          startDate: displayDate(dates?.start),
          endDate: displayDate(dates?.end),
          reason: Reason,
          leaveType: 'CASUAL_LEAVE',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res);
      if (res?.status === 'success') {
        navigation.goBack('');
        Toast.show({
          type: 'info',
          text2: 'Success',
          text1: res?.message,
        });
      }
    } catch (error) {
      console.log(error, 'asdasd');
      // Alert.alert(error?.message);
      Toast.show({
        type: 'info',
        text2: 'Success',
        text1: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainContainer>
      <Header title={i18n.t('RequestLeaves')} />

      <View style={styles.container}>
        <View style={styles.row}>
          {/* From */}
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              From
            </Text>
            <TouchableOpacity
              onPress={() => handleOpenCalendar(true)}
              style={styles.dateBox}
            >
              <Image source={images.calendar} style={styles.icon} />
              <Text allowFontScaling={false} style={styles.dateText}>
                {!dates.start ? 'Select Date' : displayDate(dates.start)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* To */}
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              To
            </Text>
            <TouchableOpacity
              onPress={() => handleOpenCalendar(false)}
              style={styles.dateBox}
            >
              <Image source={images.calendar} style={styles.icon} />
              <Text allowFontScaling={false} style={styles.dateText}>
                {!dates.end ? 'Select Date' : displayDate(dates.end)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={showCalendar} animationType="slide">
          <View style={{ flex: 1 }}>
            <LeaveCalendar
              onClose={() => setShowCalendar(false)}
              onConfirm={handleConfirmDates}
              isSelectingStart={isSelectingStart}
              initialStartDate={dates.start}
              initialEndDate={dates.end}
            />
          </View>
        </Modal>
        <TextInput
          allowFontScaling={false}
          Input
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 5,
            height: 100,
            color: Colors.white,
            paddingVertical: 10,
            paddingHorizontal: 10,
            fontSize: rf(15),
            fontFamily: Fonts.pop600,
          }}
          multiline
          textAlignVertical="top"
          placeholderTextColor={Colors.gray}
          onChangeText={text => setReason(text)}
          value={Reason}
          placeholder="Reason for Leave (Optional)"
        />
        <PrimaryButton
          loading={Loading}
          onPress={() => submit()}
          title={i18n.t('Submit')}
          disabled={isButtonDisabled}
          style={{ marginTop: 20 }}
        />
      </View>
    </MainContainer>
  );
};

export default RequestLeave;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: rf(14),
    fontFamily: Fonts.pop600,
    color: Colors.white,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(40),
  },
  icon: {
    width: wp(4),
    height: wp(4),
  },
  dateText: {
    marginLeft: 5,
    fontSize: rf(14),
    fontFamily: Fonts.Pop400,
    color: Colors.white,
  },
  resultText: {
    marginTop: 15,
    fontSize: rf(14),
    fontFamily: Fonts.pop600,
    color: Colors.primary,
    textAlign: 'center',
  },
});
