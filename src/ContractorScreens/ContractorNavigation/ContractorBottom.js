import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import ContractorShop from '../ContractorBottomtab/ContractorShop';
import ContractorTraning from '../ContractorBottomtab/ContractorTraning';
import Account from '../../Screens/BottomTabscreens/Account';
import i18n from '../../components/i18n';
import images from '../../assets/Images/images';
import Home from '../../Screens/BottomTabscreens/Home';
import Pending from '../../Screens/BottomTabscreens/Pending';

const ContractorBottom = () => {
  const { language } = useContext(LanguageContext);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      key={language}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: rf(12),
          fontFamily: Fonts.pop700,
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name={'Home'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.home}
              style={{
                width: wp(7),
                height: wp(7),
                resizeMode: 'contain',
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        // name="Pending"
        name={'Pending'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.pending}
              style={{
                width: wp(7),
                height: wp(7),
                resizeMode: 'contain',
                // marginTop: 4,
                // tintColor: focused ? 'red' : 'white',
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
        }}
        component={Pending}
      />
      <Tab.Screen
        // name="Account"

        name={'Shop'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.shop}
              style={{
                width: wp(7),
                height: wp(7),
                // fontSize: 5,
                resizeMode: 'contain',
                // tintColor: focused ? 'red' : 'white',
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
        }}
        component={ContractorShop}
      />
      <Tab.Screen
        // name="Account"

        name={'Training'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.Traning}
              style={{
                width: wp(7),
                height: wp(7),
                // fontSize: 5,
                resizeMode: 'contain',
                // tintColor: focused ? 'red' : 'white',
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
        }}
        component={ContractorTraning}
      />
      <Tab.Screen
        name={'Account'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.account}
              style={{
                width: wp(7),
                height: wp(7),
                // fontSize: 5,
                resizeMode: 'contain',
                // tintColor: focused ? 'red' : 'white',
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
};

export default ContractorBottom;

const styles = StyleSheet.create({});
