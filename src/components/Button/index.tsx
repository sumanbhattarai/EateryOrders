import React, {memo, ReactNode} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import useConnection from 'hooks/useConnection';
import Colors from 'utils/Colors';
import Text from 'components/Text';

interface Props extends TouchableOpacityProps {
  title?: string;
  needsInternet?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle;
  children?: ReactNode;
}

const Button = ({
  title,
  needsInternet = false,
  loading = false,
  style,
  titleStyle,
  children,
  ...rest
}: Props) => {
  const {status} = useConnection();

  const pressable: boolean = needsInternet
    ? status?.isInternetReachable
      ? true
      : false
    : true;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!pressable || loading}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, {opacity: pressable ? 1 : 0.7}, style]}
      {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : children ? (
        children
      ) : (
        <Text type="sub-heading" style={{...styles.title, ...titleStyle}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
