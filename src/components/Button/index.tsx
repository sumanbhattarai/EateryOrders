import React from 'react';
import {TouchableOpacity, Text, TouchableOpacityProps} from 'react-native';

import styles from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  style?: object;
}

const Button = ({title, style, ...rest}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
