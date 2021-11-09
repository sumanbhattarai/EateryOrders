import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import Colors from 'utils/Colors';
import Fonts from 'utils/Fonts';
import {wp, hp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    padding: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
  },
});

export default styles;
