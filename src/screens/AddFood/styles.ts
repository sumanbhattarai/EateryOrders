import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  heading: TextStyle;
  label: TextStyle;
  image: ImageStyle;
  button: ViewStyle;
  save: ViewStyle;
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
});

export default styles;