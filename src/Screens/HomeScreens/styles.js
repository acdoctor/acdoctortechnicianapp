import { StyleSheet } from 'react-native';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';

export const styles = StyleSheet.create({
  textheadeing: {
    color: Colors.white,
    fontSize: rf(15),
    marginVertical: 10,
    fontFamily: Fonts.pop600,
  },
  container: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
  },
  rowconteiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  lableForrow: {
    color: Colors.gray,
    fontSize: rf(15),
    width: wp(50),
    fontFamily: Fonts.pop500,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
});
