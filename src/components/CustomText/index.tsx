import React, {ReactNode} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

import Fonts from 'utils/Fonts';
import {wp} from 'utils/Constants';

interface Props extends TextProps {
  type?: 'regular' | 'heading' | 'tiny';
  children: ReactNode;
}

const CustomText = ({type = 'regular', children, ...rest}: Props) => {
  const getStyling = (): TextStyle => {
    switch (type) {
      case 'regular':
        return {
          fontSize: wp(4.4),
          fontFamily: Fonts.regular,
        };
      case 'heading':
        return {
          fontSize: wp(6.4),
          fontFamily: Fonts.bold,
        };
      case 'tiny':
        return {
          fontSize: wp(3.4),
          fontFamily: Fonts.light,
        };
    }
  };
  return (
    <Text style={getStyling()} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
