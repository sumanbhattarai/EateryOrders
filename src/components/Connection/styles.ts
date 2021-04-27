import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Fonts from 'utils/Fonts';

import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  icon: TextStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    padding: wp(2),
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    paddingRight: wp(4),
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: wp(3.2),
  },
});

export default styles;
