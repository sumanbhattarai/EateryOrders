import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import Text from 'components/Text';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: wp(2),
    borderRightWidth: 2,
    borderRightColor: Colors.grey,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginBottom: 4,
  },
});

interface Props {
  title: string;
  style?: ViewStyle;
}

const Tag = ({title, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text type="sub-heading" color={Colors.white}>
        {title}
      </Text>
    </View>
  );
};

export default Tag;
