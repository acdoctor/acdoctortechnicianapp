import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import WelcomScreen from '../Screens/Auth/WelcomScreen';
import Splash from '../Screens/Auth/Splash';
import { StyleSheet, View } from 'react-native';
import WelcomeScreen from '../Screens/Auth/WelcomeScreen';
import Login from '../Screens/Auth/Login';
import OTPscreen from '../Screens/Auth/OTPscreen';
import RegisterForm from '../Screens/Auth/RegisterForm';
import KycVerifcation from '../Screens/Auth/KycVerifcation';
import KycRejected from '../Screens/Auth/KycRejected';
import KycPending from '../Screens/Auth/KycPending';
import Toast from 'react-native-toast-message';
import TabNavigator from '../Naviagtion/TabNavigator';
import Newjob from '../Screens/HomeScreens/Newjob';
import Jobviewdetails from '../Screens/HomeScreens/Jobviewdetails';
import Jobupdate from '../Screens/HomeScreens/Jobupdate';
import Success from '../Screens/HomeScreens/Success';
import Notification from '../Screens/HomeScreens/Notification';
import ToolsAssigned from '../Screens/Tools/ToolsAssigned';
import RequestTools from '../Screens/Tools/RequestTools';
import Myrequesttool from '../Screens/Tools/Myrequesttool';
import Services from '../Screens/Services/Services';
import TonageCalculator from '../Screens/Utilities/TonageCalculator';
import Errorcodes from '../Screens/Utilities/Errorcodes';
import ShowErrorCode from '../Screens/Utilities/ShowErrorCode';
import Attendence from '../Screens/Attendence/Attendence';
import Leaves from '../Screens/Leaves/Leaves';
import RequestLeave from '../Screens/Leaves/RequestLeave';
import Servicereport from '../Screens/ServiceReportScreens/Servicereport';
import Viewservicereport from '../Screens/Services/Viewservicereport';
import Update from '../Screens/UpdateScreens/Update';
import Performance from '../Screens/Performance/Performance';
import HelperAssign from '../Screens/HelperAssign/HelperAssign';
import Help from '../Screens/Help/Help';
import Demo from '../Screens/Demo';
import { navigationRef } from './RootNavigation';
import ContractorBottom from '../ContractorScreens/ContractorNavigation/ContractorBottom';
import ContractorPayment from '../ContractorScreens/ContractorPayment/ContractorPayment';
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTPscreen" component={OTPscreen} />
          <Stack.Screen name="RegisterForm" component={RegisterForm} />
          <Stack.Screen name="KycVerifcation" component={KycVerifcation} />
          <Stack.Screen name="KycPending" component={KycPending} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ContractorBottom" component={ContractorBottom} />
          <Stack.Screen name="KycRejected" component={KycRejected} />
          <Stack.Screen name="Newjob" component={Newjob} />
          <Stack.Screen name="Jobviewdetails" component={Jobviewdetails} />
          <Stack.Screen name="Jobupdate" component={Jobupdate} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="ToolsAssigned" component={ToolsAssigned} />
          <Stack.Screen name="RequestTools" component={RequestTools} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Services" component={Services} />
          <Stack.Screen name="TonageCalculator" component={TonageCalculator} />
          <Stack.Screen name="Errorcodes" component={Errorcodes} />
          <Stack.Screen name="Attendence" component={Attendence} />
          <Stack.Screen name="Leaves" component={Leaves} />
          <Stack.Screen name="RequestLeave" component={RequestLeave} />
          <Stack.Screen name="ShowErrorCode" component={ShowErrorCode} />
          <Stack.Screen name="Myrequesttool" component={Myrequesttool} />
          <Stack.Screen name="Servicereport" component={Servicereport} />
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen
            name="Viewservicereport"
            component={Viewservicereport}
          />
          <Stack.Screen name="Performance" component={Performance} />
          <Stack.Screen name="HelperAssign" component={HelperAssign} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen
            name="ContractorPayment"
            component={ContractorPayment}
          />
          <Stack.Screen name="Demo" component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
