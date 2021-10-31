import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Text from 'components/Text';
import Input from 'components/Input';
import {wp} from 'utils/Constants';
import Button from 'components/Button';
import Colors from 'utils/Colors';

const AddCategory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Enter the name of the category you want to add. Make sure the category
        name is not already in the list.
      </Text>
      <Text style={styles.label}>Category</Text>
      <Input placeholder="Enter the name of the food category." />
      <Button style={styles.button}>
        <Icon name="save" size={wp(6)} color={Colors.white} />
      </Button>
    </View>
  );
};

export default AddCategory;
