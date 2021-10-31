import {StyleSheet, ViewStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
  flatList: ViewStyle;
  heading: ViewStyle;
  buttonView: ViewStyle;
  horizontalView: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    padding: wp(2),
  },
  heading: {
    marginTop: hp(2),
  },
  flatList: {
    marginTop: hp(2),
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    backgroundColor: Colors.white,
    marginTop: hp(1),
    paddingVertical: hp(2),
  },
});

export default styles;
