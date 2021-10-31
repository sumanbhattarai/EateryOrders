import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';
import Fonts from 'utils/Fonts';

interface Style {
  container: ViewStyle;
  heading: TextStyle;
  label: TextStyle;
  image: ImageStyle;
  button: ViewStyle;
  save: ViewStyle;
  dropdown: ViewStyle;
  dropdownContainer: ViewStyle;
  itemStyle: ViewStyle;
  dropdownStyle: ViewStyle;
  dropdownLabel: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    padding: wp(2),
  },
  heading: {
    marginVertical: hp(2),
  },
  label: {
    marginTop: hp(2),
  },
  image: {
    width: wp(96),
    height: wp(96),
    marginTop: wp(2),
  },
  button: {
    marginVertical: wp(2),
    marginBottom: wp(4),
  },
  save: {
    padding: wp(2),
  },
  dropdownContainer: {
    height: hp(6),
    marginTop: wp(2),
  },
  dropdown: {
    backgroundColor: Colors.white,
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropdownStyle: {
    backgroundColor: Colors.white,
  },
  dropdownLabel: {
    fontSize: wp(3.2),
    fontFamily: Fonts.b,
  },
});

export default styles;
