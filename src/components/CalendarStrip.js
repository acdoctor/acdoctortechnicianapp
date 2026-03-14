import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Colors, { Fonts } from '../utils/Colors';
import { rf, wp } from './Responvie';

const CalendarStrip = () => {
  const flatListRef = useRef(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const todayDate = today.getDate();

  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarData = Array.from({ length: totalDays }, (_, index) => {
    const date = index + 1;
    const dayName = new Date(currentYear, currentMonth, date).toLocaleString(
      'en-US',
      { weekday: 'short' },
    );

    return { date, day: dayName };
  });

  const ITEM_WIDTH = wp(15) + 10;

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: todayDate - 1,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      scrollEnabled={false}
      data={calendarData}
      keyExtractor={item => item.date.toString()}
      contentContainerStyle={{
        paddingHorizontal: (wp(100) - wp(15)) / 2,
      }}
      getItemLayout={(data, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isToday = item.date === todayDate;
        return (
          <View
            style={{
              backgroundColor: isToday ? Colors.primary : Colors.background,
              padding: 10,
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
              width: wp(15),
              borderRadius: 10,
            }}
          >
            <Text
              allowFontScaling={false}
              allowFontScaling={false}
              style={[
                styles.textLabel,
                { color: isToday ? Colors.white : Colors.gray },
              ]}
            >
              {item.date}
            </Text>
            <Text
              allowFontScaling={false}
              allowFontScaling={false}
              style={[
                styles.textLabel,
                { color: isToday ? Colors.white : Colors.gray },
              ]}
            >
              {item.day}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default CalendarStrip;

const styles = StyleSheet.create({
  textLabel: {
    fontSize: rf(16),
    fontFamily: Fonts.pop500,
  },
});
