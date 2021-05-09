import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from 'components/Text';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: wp(2),
    borderRightWidth: 1,
    borderRightColor: Colors.error,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginBottom: 4,
  },
});

const Tag = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <Text type="sub-heading" color={Colors.white}>
        {title}
      </Text>
    </View>
  );
};

export default Tag;