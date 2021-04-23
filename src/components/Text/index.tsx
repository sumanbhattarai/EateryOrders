import React, {ReactNode} from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';

import Fonts from 'utils/Fonts';
import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Props extends TextProps {
  type?: 'regular' | 'heading' | 'tiny';
  color?: string;
  style?: TextStyle;
  children: ReactNode;
}

const Text = ({
  type = 'regular',
  color = Colors.black,
  style,
  children,
  ...rest
}: Props) => {
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
      default:
        return {
          fontSize: wp(4.4),
          fontFamily: Fonts.regular,
        };
    }
  };
  return (
    <RNText style={[getStyling(), {color: color, ...style}]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;