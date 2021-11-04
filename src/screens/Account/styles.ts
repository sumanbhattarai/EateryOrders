import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
  title: TextStyle;
  buttonView: ViewStyle;
  horizontalFlex: ViewStyle;
  flatListView: ViewStyle;
  image: ImageStyle;
}

const imageSize = hp(16);

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    padding: wp(2),
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: imageSize / 2,
    alignSelf: 'center',
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
