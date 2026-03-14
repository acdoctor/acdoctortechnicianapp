import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import MainContainer from '../../components/MainContainer';
import LanguageDropdown from '../../components/LanguageDropdown';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import { Styles } from './Style';
import images from '../../assets/Images/images';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
// import { View } from 'react-native/types_generated/index';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const refreshScreen = () => {
    setRefresh(prev => !prev);
    refresh;
  };
  return (
    <MainContainer key={refresh ? 'hi' : 'en'}>
      <LanguageDropdown onLanguageChange={refreshScreen} />
      <View style={Styles.centerConatiner}>
        <Text allowFontScaling={false} style={Styles.Welcometext}>
          {i18n.t('welcome')}
        </Text>
        <Text allowFontScaling={false} style={Styles.Acdoctortext}>
          {i18n.t('AC_DOCTOR')}
        </Text>
        <TouchableOpacity
          style={Styles.rowConatiner}
          onPress={() => navigation.navigate('Login', { type: 'ACD' })}
        >
          <Text allowFontScaling={false} style={Styles.TextLabel}>
            {i18n.t('Technician')}
          </Text>
          <Image source={images.RightArrow} style={Styles.smallicon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', { type: 'FC' })}
          style={[Styles.rowConatiner, { marginTop: 15 }]}
        >
          <Text allowFontScaling={false} style={Styles.TextLabel}>
            {i18n.t('Contractor')}
          </Text>
          <Image source={images.RightArrow} style={Styles.smallicon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Help');
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <Image
          source={images?.contactus}
          resizeMode="contain"
          style={{ width: wp(8), height: wp(8) }}
        />
        <Text style={[Styles?.contacustext, { marginLeft: 10 }]}>
          Contact US
        </Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default WelcomeScreen;
