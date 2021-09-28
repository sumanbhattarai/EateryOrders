import React, {ReactNode, memo} from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';

import Fonts from 'utils/Fonts';
import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';

type TextType = 'regular' | 'heading' | 'sub-heading' | 'tiny';

interface Props extends TextProps {
  type?: TextType;
  color?: string;
  style?: TextStyle;
  children: ReactNode;
}

const getStyling = (type: TextType): TextStyle => {
  switch (type) {
    case 'heading':
      return {
        fontSize: wp(4.4),
        fontFamily: Fonts.bold,
      };
    case 'sub-heading':
      return {
        fontSize: wp(3.8),
        fontFamily: Fonts.bold,
      };
    case 'regular':
      return {
        fontSize: wp(3.2),
        fontFamily: Fonts.regular,
      };
    case 'tiny':
      return {
        fontSize: wp(2.8),
        fontFamily: Fonts.light,
      };
    default:
      return {
        fontSize: wp(3.2),
        fontFamily: Fonts.regular,
      };
  }
};

const Text = ({
  type = 'regular',
  color = Colors.black,
  style,
  children,
  ...rest
}: Props) => {
  return (
    <RNText style={[getStyling(type), {color: color, ...style}]} {...rest}>
      {children}
    </RNText>
  );
};

export default memo(Text);
