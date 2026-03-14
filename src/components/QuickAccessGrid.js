import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { wp, rf } from '../components/Responvie';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuickAccessGrid = ({ title, data = [], onPressItem, helperType }) => {
  const renderItem = ({ item, index }) => {
    const isMiddleItem = (index + 1) % 3 === 2;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (
            helperType === 'HELPER' &&
            (index === 0 || index === 1 || index === 2)
          ) {
            Alert.alert(
              'You are currently a Helper.',
              'This feature is only available for Technicians.',
            );
          } else {
            onPressItem && onPressItem(item);
          }
        }}
        style={{
          borderRadius: 5,
          marginTop: 15,
          backgroundColor: Colors.lightGray,
          width: wp(28.5),
          alignItems: 'center',
          paddingVertical: 10,
          marginHorizontal: isMiddleItem ? wp(4) : 0,
        }}
      >
        <Image
          source={item.img}
          style={{ width: wp(13), height: wp(13), marginBottom: 9 }}
          resizeMode="contain"
        />
        <Text
          allowFontScaling={false}
          style={{
            fontSize: rf(12),
            textAlign: 'center',
            width: wp(25),
            fontFamily: Fonts.Pop400,
            color: Colors.white,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {title && (
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(16),
            fontFamily: Fonts.pop600,
            marginTop: 17,
            marginBottom: -3,
          }}
        >
          {title}
        </Text>
      )}

      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{ alignSelf: 'center' }}
      />
    </View>
  );
};

export default QuickAccessGrid;
