import {
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../Screens/Auth/Style';
import Colors from '../utils/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const MainContainer = ({ children }) => {
  return (
    <SafeAreaView style={Styles.main_container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      {Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            keyboardShouldPersistTaps="neverß"
            showsVerticalScrollIndicator={false}
            extraScrollHeight={70}
            enableAutomaticScroll={true}
            enableResetScrollToCoords={false}
            keyboardOpeningTime={0}
          >
            {children}
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          // keyboardDismissMode="interactive"
          // keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={false} // iOS fix
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MainContainer;

const styles = StyleSheet.create({});
