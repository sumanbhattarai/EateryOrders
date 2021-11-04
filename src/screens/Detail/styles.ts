import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

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
    marginTop: hp(2),
    marginRight: hp(2),
  },
});

export default styles;
