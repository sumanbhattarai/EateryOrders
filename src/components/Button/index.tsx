import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

import styles from './styles';
import useConnection from 'hooks/useConnection';

interface Props extends TouchableOpacityProps {
  title: string;
  needsInternet?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({
  title,
  needsInternet = false,
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
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
