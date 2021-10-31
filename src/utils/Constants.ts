import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Colors from 'utils/Colors';

export const Width: number = Dimensions.get('screen').width;
export const Height: number = Dimensions.get('screen').height;
export const isAndroid: boolean = Platform.OS === 'android';
export const statusBarHeight: number = getStatusBarHeight();
export const brandName: string = 'Eatery Orders';

export const switchColor = {
  false: Colors.lightGrey,
  true: Colors.primary,
};

export {wp, hp};
