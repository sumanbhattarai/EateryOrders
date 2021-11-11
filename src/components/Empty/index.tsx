import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import Text from 'components/Text';
import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';

interface Props {
  message?: string;
}

const Empty = ({message}: Props) => {
  return (
    <View style={styles.container}>
      <Icon name="flask-empty-outline" size={wp(16)} color={Colors.grey} />
      <Text style={styles.message}>{message || 'No any data to show.'}</Text>
    </View>
  );
};

export default Empty;
