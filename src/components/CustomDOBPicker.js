import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { hp, rf, wp } from './Responvie';
import images from '../assets/Images/images';
import { flatten } from 'react-native/types_generated/Libraries/StyleSheet/StyleSheetExports';

const CustomDOBPicker = ({ value, onConfirm }) => {
  // const today = new Date();
  // const [visible, setVisible] = useState(false);
  // const maxDOB = new Date(
  //   today.getFullYear() - 18,
  //   today.getMonth(),
  //   today.getDate(),
  // );
  // const years = Array.from({ length: 80 }, (_, i) => maxDOB.getFullYear() - i);
  // const currentYear = today.getFullYear();
  // // const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
  // const months = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Oct',
  //   'Nov',
  //   'Dec',
  // ];
  // const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // const [day, setDay] = useState(today.getDate());
  // const [month, setMonth] = useState(today.getMonth());
  // const [year, setYear] = useState(today.getFullYear());

  // // ✅ API date formatter → 2025-03-24
  // const formatDateForAPI = date => {
  //   const y = date.getFullYear();
  //   const m = String(date.getMonth() + 1).padStart(2, '0');
  //   const d = String(date.getDate()).padStart(2, '0');
  //   return `${y}-${m}-${d}`;
  // };

  // // ✅ Modal open hote time today / value sync
  // const openPicker = () => {
  //   const baseDate = value || today;
  //   setDay(baseDate.getDate());
  //   setMonth(baseDate.getMonth());
  //   setYear(baseDate.getFullYear());
  //   setVisible(true);
  // };

  // const handleConfirm = () => {
  //   const selectedDate = new Date(year, month, day);

  //   onConfirm({
  //     displayDate: selectedDate, // UI ke liye
  //     apiDate: formatDateForAPI(selectedDate), // API ke liye
  //   });

  //   setVisible(false);
  // };

  const today = new Date();

  // 🔒 Max allowed DOB = Today - 18 years
  const maxDOB = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const [visible, setVisible] = useState(false);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 👇 Only valid years (18+)
  const years = Array.from({ length: 80 }, (_, i) => maxDOB.getFullYear() - i);

  const [day, setDay] = useState(maxDOB.getDate());
  const [month, setMonth] = useState(maxDOB.getMonth());
  const [year, setYear] = useState(maxDOB.getFullYear());

  // ✅ API format: YYYY-MM-DD
  const formatDateForAPI = date => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // 📌 Open picker with synced date
  const openPicker = () => {
    const baseDate = value || maxDOB;
    setDay(baseDate.getDate());
    setMonth(baseDate.getMonth());
    setYear(baseDate.getFullYear());
    setVisible(true);
  };

  const handleConfirm = () => {
    const selectedDate = new Date(year, month, day);

    // 🔐 Double safety
    if (selectedDate > maxDOB) {
      Alert.alert('Age must be at least 18 years');
      return;
    }

    onConfirm({
      displayDate: selectedDate,
      apiDate: formatDateForAPI(selectedDate),
    });

    setVisible(false);
  };

  const isMaxYear = year === maxDOB.getFullYear();
  const isMaxMonth = isMaxYear && month === maxDOB.getMonth();

  return (
    <View>
      {/* Input */}
      <TouchableOpacity
        onPress={openPicker}
        style={{
          borderWidth: 1,
          borderColor: value ? Colors.white : Colors.gray,
          borderRadius: 13,
          height: hp(5),
          paddingHorizontal: 14,
          justifyContent: 'space-between',
          marginTop: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: value ? Colors.white : Colors.gray,
            fontFamily: Fonts.pop600,
            fontSize: rf(14),
          }}
        >
          {value ? value.toLocaleDateString('en-GB') : 'DD-MM-YYYY'}
        </Text>

        <Image
          source={images.calendar}
          style={{ width: wp(5), height: wp(5) }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(17, 16, 16, 0.6)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 16,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: Colors.primary,
                    fontSize: rf(14),
                    fontFamily: Fonts.pop600,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleConfirm}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: Colors.success,
                    fontSize: rf(14),
                    fontFamily: Fonts.pop600,
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            {/* Picker */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              {/* Day */}
              <ScrollView
                style={{ height: hp(20) }}
                showsVerticalScrollIndicator={false}
              >
                {days.map(d => (
                  <TouchableOpacity key={d} onPress={() => setDay(d)}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: day === d ? Colors.primary : Colors.text,
                        fontSize: rf(16),
                        textAlign: 'center',
                        padding: 8,
                      }}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Month */}
              <ScrollView
                style={{ height: hp(20) }}
                showsVerticalScrollIndicator={false}
              >
                {months.map((m, i) => (
                  <TouchableOpacity key={m} onPress={() => setMonth(i)}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: month === i ? Colors.primary : Colors.text,
                        fontSize: rf(16),
                        textAlign: 'center',
                        padding: 8,
                      }}
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Year */}
              <ScrollView
                style={{ height: hp(20) }}
                showsVerticalScrollIndicator={false}
              >
                {years.map(y => (
                  <TouchableOpacity key={y} onPress={() => setYear(y)}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: year === y ? Colors.primary : Colors.text,
                        fontSize: rf(16),
                        textAlign: 'center',
                        padding: 8,
                      }}
                    >
                      {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDOBPicker;
