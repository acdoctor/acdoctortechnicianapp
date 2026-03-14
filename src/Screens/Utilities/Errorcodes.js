import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import images from '../../assets/Images/images';
import { hp, rf } from '../../components/Responvie';
import CustomDropdown from '../../components/CustomDropdown';
import PrimaryButton from '../../components/PrimaryButton';
import DetailsCard from '../../components/DetailsCard';
import Colors, { Fonts } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const Errorcodes = () => {
  const nvaigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [SelectedType, setSelectedType] = useState(null);
  const [ErrorCode, setErrorCode] = useState('');
  const DATA = () => [
    { label: i18n.t('Voltas'), img: images.voltas },
    { label: i18n.t('Blue Star'), img: images.bluestar },
    { label: i18n.t('LG'), img: images.LG },
    { label: i18n.t('Samsung'), img: images.samsung },
    { label: i18n.t('Daikin'), img: images.daikin },
    { label: i18n.t('Hitachi'), img: images.hitachi },
    { label: i18n.t('Panasonic'), img: images.panasonic },
    { label: i18n.t('Godrej'), img: images.godrej },
    { label: i18n.t('Carrier'), img: images.carrier },
    { label: i18n.t('Whirlpool'), img: images.whirepool },
    { label: i18n.t('Lloyd'), img: images.llyod },
    { label: i18n.t('Haier'), img: images.haier },
    { label: i18n.t('Onida'), img: images.onida },
    { label: i18n.t('IFB'), img: images.IFB },
    { label: i18n.t('Mitashi'), img: images.mitashi },
  ];
  const typeofAC = () => [
    { label: i18n.t('SplitAC'), value: 'SplitAC', img: images.splitAc },
    { label: i18n.t('WindowAC'), value: 'WindowAC', img: images.splitAc },
    { label: i18n.t('InverterAC'), value: 'InverterAC', img: images.splitAc },
    { label: i18n.t('PortableAC'), value: 'PortableAC', img: images.TowerAC },
    { label: i18n.t('CassetteAC'), value: 'CassetteAC', img: images.castelAc },
    { label: i18n.t('TowerAC'), value: 'TowerAC', img: images.TowerAC },
    { label: i18n.t('CentralAC'), value: 'CentralAC', img: images.castelAc },
    { label: i18n.t('ChillerAc'), value: 'CentralAC', img: images.vrvvrfAc },
    { label: i18n.t('VRVVRF'), value: 'CentralAC', img: images.vrvvrfAc },
    { label: i18n.t('ducted'), value: 'CentralAC', img: images.DuctedAC },
  ];
  const handelPress = () => {
    nvaigation.navigate('ShowErrorCode', { ErrorCode, SelectedType, selected });
  };
  return (
    <MainContainer>
      <Header title={i18n.t('ErrorCodes')} />
      <Image
        source={images.card3}
        style={{
          width: '100%',
          height: hp(15),
          marginTop: 10,
          borderRadius: 7,
        }}
      />
      <CustomDropdown
        Placholder={i18n.t('SelectAcBrand')}
        data={DATA()}
        selectedValue={selected}
        onSelect={item => setSelected(item)}
        logic={'per'}
      />
      <CustomDropdown
        Placholder={i18n.t('Selecttype')}
        data={typeofAC()}
        selectedValue={SelectedType}
        onSelect={item => setSelectedType(item)}
      />
      <TextInput
        allowFontScaling={false}
        Input
        value={ErrorCode}
        onChangeText={i => setErrorCode(i)}
        placeholder={i18n.t('EnterErrorCode')}
        placeholderTextColor={Colors.white}
        style={{
          borderWidth: 1,
          borderColor: Colors.white,
          fontSize: rf(16),
          fontFamily: Fonts.Pop400,
          color: Colors.white,
          borderRadius: 10,
          marginTop: 20,
          paddingVertical: 11,
          paddingHorizontal: 12,
        }}
      />
      <PrimaryButton
        disabled={!selected || !SelectedType || !ErrorCode}
        title={i18n.t('geterrorcode')}
        style={{ marginTop: 20 }}
        onPress={() => handelPress()}
      />
      <Image
        source={images.card2}
        style={{
          width: '100%',
          height: hp(15),
          marginTop: 15,
          borderRadius: 7,
        }}
      />
      <DetailsCard
        title="Details"
        data={[
          'Error Code is a specific alphanumeric code displayed on an appliance or device to indicate a malfunction or issue that needs attention.',
          'Error Codes help users and technicians diagnose problems quickly and accurately, facilitating efficient troubleshooting and repairs.',
        ]}
      />
    </MainContainer>
  );
};

export default Errorcodes;

const styles = StyleSheet.create({});
