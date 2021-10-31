import React, {useState} from 'react';
import {TextInput, TextInputProps, StyleSheet, ViewStyle} from 'react-native';

import {hp, wp} from 'utils/Constants';
import Colors from 'utils/Colors';
import Fonts from 'utils/Fonts';

const styles = StyleSheet.create({
  input: {
    width: wp(96),
    borderWidth: 1,
    paddingLeft: 8,
    marginVertical: wp(2),
    fontFamily: Fonts.regular,
    height: hp(6),
    fontSize: wp(3.2),
  },
});

interface Props extends TextInputProps {
  style?: ViewStyle;
}

const Input = ({style, ...rest}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: isFocused ? Colors.primary : Colors.lightGrey,
        },
        style,
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...rest}
    />
  );
};

export default Input;
