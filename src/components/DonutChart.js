import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { rf, wp } from './Responvie';
import { Fonts } from '../utils/Colors';

const DonutChart = ({
  size = 220,
  strokeWidth = 20,
  data = [],
  totalText = '',
  centerValue = '',
  backgroundColor = '#333',
}) => {
  const radius = (size - strokeWidth) / 2.1;
  const circumference = 2 * Math.PI * radius;

  let rotation = -90;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        // backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 20,
      }}
    >
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          // borderRadius={30}
        />

        {/* Dynamic Segments */}
        {data.map((item, index) => {
          const strokeLength = (item.value / 100) * circumference;
          const circle = (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${strokeLength}, ${circumference}`}
              rotation={rotation}
              origin={`${size / 2}, ${size / 2}`}
            />
          );
          rotation += (item.value / 100) * 360;
          return circle;
        })}
      </Svg>

      {/* Center Text */}
      <View style={styles.center}>
        <Text allowFontScaling={false} style={styles.value}>
          {centerValue}
        </Text>
        <Text allowFontScaling={false} style={styles.label}>
          {totalText}
        </Text>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />

            <View>
              <Text
                allowFontScaling={false}
                allowFontScaling={false}
                style={[
                  styles.legendText,
                  { fontSize: rf(12), alignSelf: 'flex-start' },
                ]}
              >
                {item.value}%
              </Text>
              <Text
                allowFontScaling={false}
                allowFontScaling={false}
                style={[styles.legendText, { width: wp(25) }]}
              >
                {item.label}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DonutChart;
const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: '42%',
    alignItems: 'center',
  },
  value: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  legendContainer: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
    width: wp(90),
    marginTop: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 8,
  },
  dot: {
    width: 17,
    height: 17,
    borderRadius: 1000,
    marginRight: 6,
  },
  legendText: {
    color: '#fff',
    fontSize: rf(12),
    fontFamily: Fonts.pop500,
    alignSelf: 'center',
    // textAlign: 'center',
    // width: wp(30),
  },
});
