import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
  imageView: ViewStyle;
  title: TextStyle;
  buttonView: ViewStyle;
  horizontalFlex: ViewStyle;
  flatListView: ViewStyle;
}

const imageSize = hp(16);

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    padding: wp(2),
  },
  imageView: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    marginTop: hp(4),
  },
  title: {
    textAlign: 'center',
  },
  buttonView: {
    backgroundColor: Colors.white,
    marginTop: hp(1),
    paddingVertical: hp(2),
  },
  horizontalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListView: {
    marginTop: hp(4),
  },
});

export default styles;
