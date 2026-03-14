import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import Colors, { Fonts } from '../../utils/Colors';
import { rf } from '../../components/Responvie';

const ContractorShop = () => {
  return (
    <MainContainer>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: Colors?.white,
            fontFamily: Fonts?.pop700,
            fontSize: rf(18),
          }}
        >
          Shop Pending
        </Text>
      </View>
    </MainContainer>
  );
};

export default ContractorShop;

const styles = StyleSheet.create({});
