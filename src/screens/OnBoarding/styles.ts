import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Width, wp, hp} from 'utils/Constants';
import Colors from 'utils/Colors';
import Fonts from 'utils/Fonts';

interface Styles {
  container: ViewStyle;
  onBoardCard: ViewStyle;
  image: ImageStyle;
  text: TextStyle;
  footer: ViewStyle;
  button: ViewStyle;
  dotBox: ViewStyle;
  dot: TextStyle;
}

const ratio: number = Width / 1440;

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  onBoardCard: {
    width: Width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 1240 * ratio,
    width: Width,
  },
  text: {
    fontSize: wp(8),
    fontFamily: Fonts.bold,
    textAlign: 'center',
    padding: wp(4),
    marginTop: hp(4),
    color: Colors.black,
  },
  footer: {
    paddingVertical: hp(4),
  },
  button: {
    width: wp(60),
  },
  dotBox: {
    flexDirection: 'row',
  },
  dot: {
    paddingHorizontal: wp(1),
  },
});

export default styles;
