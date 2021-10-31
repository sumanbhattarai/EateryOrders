import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  detail: ViewStyle;
  detailRow: ViewStyle;
  rating: TextStyle;
  price: TextStyle;
  category: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    marginRight: 16,
    padding: wp(2),
    height: 260,
    width: 300,
    backgroundColor: Colors.white,
  },
  image: {
    height: 180,
    width: '100%',
  },
  detail: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: Colors.grey,
  },
  rating: {
    color: Colors.grey,
  },
  price: {
    color: Colors.grey,
  },
});

export default styles;
