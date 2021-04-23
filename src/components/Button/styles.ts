import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import Colors from 'utils/Colors';
import Fonts from 'utils/Fonts';
import {wp, hp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: hp(6),
    width: wp(80),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: wp(2),
  },
  title: {
    fontSize: wp(4.4),
    color: Colors.white,
    fontFamily: Fonts.regular,
  },
});

export default styles;
