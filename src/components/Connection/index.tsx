import React, {memo} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';
import useConnection from 'hooks/useConnection';

const Connection = () => {
  const {status} = useConnection();

  if (status?.isInternetReachable !== false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        <Icon name="wifi-off" size={wp(4)} color={Colors.white} />
      </Text>
      <Text style={styles.text}>Please, check your internet connection.</Text>
    </View>
  );
};

export default memo(Connection);
