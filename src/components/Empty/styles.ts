import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

import {wp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  message: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    marginTop: wp(2),
  },
});

export default styles;
