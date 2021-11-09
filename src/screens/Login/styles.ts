import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

import {wp, hp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  footer: ImageStyle;
  button: ViewStyle;
  form: ViewStyle;
}

const imageSize = hp(16);

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: imageSize,
    width: imageSize,
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
    backgroundColor: Colors.white,
    paddingVertical: wp(4),
    paddingHorizontal: wp(2),
  },
  form: {},
  button: {
    marginTop: wp(2),
  },
});

export default styles;
