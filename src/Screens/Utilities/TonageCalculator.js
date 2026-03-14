import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import AutoCarousel from '../../components/AutoCarousel';
import { image_slider_data } from '../../utils/HardCodedata';
import CustomDropdown from '../../components/CustomDropdown';
import { hp, rf, wp } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../assets/Images/images';
import DetailsCard from '../../components/DetailsCard';
const TonageCalculator = () => {
  const [Width, setWidth] = useState('');
  const [result, setResult] = useState(null);
  const [length, setlength] = useState('');
  const DATA = () => [
    { label: i18n.t('Residential') },
    { label: i18n.t('commercial') },
  ];
  const [selected, setSelected] = useState(null);
  const calculateTonnage = () => {
    if (!Width || !length || !selected) {
      Alert.alert('Please fill all fields');
      return;
    }

    const w = Number(Width);
    const l = Number(length);

    if (isNaN(w) || isNaN(l)) {
      Alert.alert('Enter valid numbers');
      return;
    }

    let tonnage = 0;

    if (selected.label === i18n.t('Residential')) {
      tonnage = (w * l) / 100;
    } else {
      tonnage = (w * l) / 83.33;
    }

    // alert(`Required AC Tonnage: ${tonnage.toFixed(2)} Ton`);
    setResult(tonnage.toFixed(2));
  };

  return (
    <MainContainer>
      <Header title={i18n.t('TonageCalculator')} />
      <Image
        source={images.card}
        style={{
          width: '100%',
          height: hp(15),
          marginTop: 10,
          borderRadius: 7,
        }}
      />
      <CustomDropdown
        Placholder={i18n.t('Selecttype')}
        data={DATA()}
        selectedValue={selected}
        onSelect={item => setSelected(item)}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          allowFontScaling={false}
          Input
          value={Width}
          onChangeText={i => setWidth(i)}
          placeholder="20 (FT)"
          keyboardType="number-pad"
          placeholderTextColor={Colors.gray}
          style={styles.textinputdesign}
        />
        <TextInput
          allowFontScaling={false}
          Input
          value={length}
          onChangeText={i => setlength(i)}
          placeholder="20 (FT)"
          keyboardType="number-pad"
          placeholderTextColor={Colors.gray}
          style={styles.textinputdesign}
        />
      </View>
      <PrimaryButton
        style={{ marginTop: 20 }}
        disabled={!Width || !length || !selected}
        title={i18n.t('calculate')}
        onPress={calculateTonnage}
      />

      {result && (
        <View
          style={{
            marginTop: 15,
            backgroundColor: Colors.lightGray,
            // alignItems: 'center',
            paddingHorizontal: 30,
            borderRadius: 12,
            paddingVertical: 10,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontSize: rf(17),
              fontFamily: Fonts.pop600,
              color: Colors.white,
            }}
          >
            {i18n.t('result')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Image
              source={images.right}
              style={{ width: wp(5), height: wp(5) }}
            />
            <Text
              allowFontScaling={false}
              style={{
                color: Colors.white,
                fontSize: rf(14),
                fontFamily: Fonts.pop600,
                marginLeft: 10,
              }}
            >
              For place of {Width} X {length}, You need {result} Ton AC.
            </Text>
          </View>
        </View>
      )}
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
          'Tonnage calculator helps you determine the appropriate cooling capacity required for your space based on its size and other factors.',
        ]}
      />
    </MainContainer>
  );
};

export default TonageCalculator;

const styles = StyleSheet.create({
  textinputdesign: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.white,
    width: '48%',
    fontSize: rf(16),
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: Fonts.Pop400,
    color: Colors.white,
  },
});
