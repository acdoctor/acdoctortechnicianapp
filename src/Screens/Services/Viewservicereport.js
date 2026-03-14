import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import Colors, { Fonts } from '../../utils/Colors';
import { rf } from '../../components/Responvie';
import Header from '../../components/Header';
import i18n from '../../components/i18n';

const Viewservicereport = () => {
  return (
    <MainContainer>
      <Header title={i18n.t('ViewServiceReport')} />
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.white,
            fontSize: rf(18),
            fontFamily: Fonts.pop700,
          }}
        >
          service report is pending?
        </Text>
      </View>
    </MainContainer>
  );
};

export default Viewservicereport;

const styles = StyleSheet.create({});
