import React, {memo} from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import useConnection from 'hooks/useConnection';
import Colors from 'utils/Colors';

interface Props extends TouchableOpacityProps {
  title: string;
  needsInternet?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button = ({
  title,
  needsInternet = false,
  loading = false,
  style,
  textStyle,
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
      disabled={!pressable}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, {opacity: pressable ? 1 : 0.7}, style]}
      {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Text style={[styles.title, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
