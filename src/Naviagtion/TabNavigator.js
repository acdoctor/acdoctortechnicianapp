import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/BottomTabscreens/Home';
import Pending from '../Screens/BottomTabscreens/Pending';
import Account from '../Screens/BottomTabscreens/Account';
import Colors, { Fonts } from '../utils/Colors';
import images from '../assets/Images/images';
import { rf, wp } from '../components/Responvie';
import i18n from '../components/i18n';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';
const TabNavigator = () => {
  //   const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const Tab = createBottomTabNavigator();
  return (
    // <NavigationContainer>
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
        name={i18n.t('Home')}
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
        name={i18n.t('Pending')}
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

        name={i18n.t('Account')}
        options={{
          // sceneStyle},
          //   tabBarLabel: t('Account'),
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
    // </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
