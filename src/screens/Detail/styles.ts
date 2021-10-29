import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {hp, Width, wp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  informationBox: ViewStyle;
  heading: TextStyle;
  horizontalFlex: ViewStyle;
  detail: ViewStyle;
  button: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  image: {
    width: Width,
    height: Width / 1.25,
  },
  informationBox: {
    padding: wp(2),
  },
  heading: {
    textAlign: 'center',
  },
  horizontalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    marginTop: hp(2),
  },
  button: {
    width: wp(40),
    marginTop: hp(2),
  },
});

export default styles;
