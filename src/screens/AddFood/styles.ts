import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
  heading: TextStyle;
  label: TextStyle;
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
});

export default styles;
