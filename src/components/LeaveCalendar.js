import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MainContainer from './MainContainer';
import Colors, { Fonts } from '../utils/Colors';
import Header from './Header';
import { rf } from './Responvie';
import PrimaryButton from './PrimaryButton';

const LeaveCalendar = ({ onClose, onConfirm }) => {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Example booked dates
  const bookedDates = ['2026-01-25', '2026-01-26'];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const formatDate = day =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
      2,
      '0',
    )}`;

  const isPast = day => {
    const d = new Date(year, month, day);
    return d < new Date().setHours(0, 0, 0, 0);
  };

  const inRange = day => {
    if (!startDate || !endDate) return false;
    const d = formatDate(day);
    return d >= startDate && d <= endDate;
  };

  /* ================= DAY PRESS (ONE DAY + RANGE) ================= */

  const onDayPress = day => {
    const date = formatDate(day);
    const clickedDate = new Date(year, month, day);

    if (isPast(day) || bookedDates.includes(date)) return;

    // First tap → one day leave
    if (!startDate) {
      setStartDate(date);
      setEndDate(date);
      return;
    }

    const start = new Date(startDate);

    // Block backward selection
    if (clickedDate < start) return;

    // Same day tap → keep one day leave
    if (date === startDate) {
      setEndDate(date);
      return;
    }

    // Forward continuous range
    setEndDate(date);
  };

  /* ================= Month Navigation ================= */

  const goToPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
    setStartDate(null);
    setEndDate(null);
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
    setStartDate(null);
    setEndDate(null);
  };

  /* ================= Render Days ================= */

  const renderDays = () => {
    let rows = [];
    let cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`e-${i}`} style={styles.cell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(day);
      const selected = date === startDate || date === endDate || inRange(day);

      cells.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.cell,
            selected && styles.selected,
            bookedDates.includes(date) && styles.booked,
            isPast(day) && styles.disabled,
          ]}
          disabled={isPast(day) || bookedDates.includes(date)}
          onPress={() => onDayPress(day)}
        >
          <Text
            allowFontScaling={false}
            allowFontScaling={false}
            style={styles.dayText}
          >
            {day}
          </Text>
        </TouchableOpacity>,
      );

      if (cells.length % 7 === 0) {
        rows.push(
          <View style={styles.row} key={`row-${day}`}>
            {cells}
          </View>,
        );
        cells = [];
      }
    }

    if (cells.length) {
      rows.push(
        <View style={styles.row} key="last">
          {cells}
        </View>,
      );
    }

    return rows;
  };

  return (
    <MainContainer>
      <Header title={'Leave Calendar'} onPress={onClose} />

      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Text
            allowFontScaling={false}
            allowFontScaling={false}
            style={styles.arrow}
          >
            ‹
          </Text>
        </TouchableOpacity>

        <Text allowFontScaling={false} style={styles.monthText}>
          {new Date(year, month).toLocaleString('default', { month: 'long' })}{' '}
          {year}
        </Text>

        <TouchableOpacity onPress={goToNextMonth}>
          <Text
            allowFontScaling={false}
            allowFontScaling={false}
            style={styles.arrow}
          >
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekRow}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
          <Text
            allowFontScaling={false}
            allowFontScaling={false}
            key={d}
            style={styles.weekText}
          >
            {d}
          </Text>
        ))}
      </View>

      {renderDays()}

      {/* Confirm Button (Single + Multi Day) */}
      {startDate && endDate && (
        <PrimaryButton
          title="Done"
          style={{ marginTop: 20 }}
          onPress={() => onConfirm(startDate, endDate)}
        />
      )}
    </MainContainer>
  );
};

export default LeaveCalendar;

/* ================= Styles ================= */

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  arrow: {
    fontSize: 26,
    color: Colors.white,
    paddingHorizontal: 10,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
    marginTop: 5,
  },
  weekText: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: rf(14),
    fontFamily: Fonts.pop600,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: '14.28%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 14,
    color: Colors.white,
  },
  selected: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: '#E31E244A',
  },
  booked: {
    opacity: 0.4,
  },
  disabled: {
    opacity: 0.3,
  },
});
