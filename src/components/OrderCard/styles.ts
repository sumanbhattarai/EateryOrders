import {ViewStyle, StyleSheet} from 'react-native';

import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
  horizontalView: ViewStyle;
  table: ViewStyle;
  border: ViewStyle;
  buttonView: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    margin: wp(2),
    backgroundColor: Colors.white,
    padding: wp(2),
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table: {
    marginTop: wp(2),
  },
  border: {
    flex: 1,
    padding: wp(1),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(2),
  },
});

export default styles;
