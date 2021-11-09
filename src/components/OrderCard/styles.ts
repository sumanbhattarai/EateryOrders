import {ViewStyle, StyleSheet} from 'react-native';

import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    margin: wp(2),
    backgroundColor: Colors.white,
    padding: wp(2),
  },
});

export default styles;
