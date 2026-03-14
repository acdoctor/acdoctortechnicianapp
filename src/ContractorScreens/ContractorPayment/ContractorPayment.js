import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';

const ContractorPayment = () => {
  return (
    <MainContainer>
      <Header title={i18n.t('Payment')} />
    </MainContainer>
  );
};

export default ContractorPayment;

const styles = StyleSheet.create({});
