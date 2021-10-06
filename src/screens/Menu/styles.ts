import {StyleSheet} from 'react-native';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2),
    backgroundColor: Colors.white,
  },
  fullFlex: {
    flex: 1,
  },
  cardContainer: {
    marginTop: hp(2),
  },
});

export default styles;
