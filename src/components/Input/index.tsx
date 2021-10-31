import React, {useState} from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';
import Fonts from 'utils/Fonts';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    paddingLeft: 8,
    marginVertical: 8,
    fontFamily: Fonts.regular,
    height: 50,
    fontSize: wp(3.2),
  },
});

interface Props extends TextInputProps {}

const Input = ({...rest}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: isFocused ? Colors.primary : Colors.lightGrey,
        },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...rest}
    />
  );
};

export default Input;
