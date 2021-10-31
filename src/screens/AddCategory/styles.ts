import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  heading: TextStyle;
  label: TextStyle;

  button: ViewStyle;
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

  button: {
    marginVertical: wp(2),
    marginBottom: wp(4),
  },
});

export default styles;
