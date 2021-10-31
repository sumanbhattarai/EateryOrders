import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Text from 'components/Text';
import Input from 'components/Input';
import {wp} from 'utils/Constants';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import {addCategory} from 'store/slices/category';
import {useAppDispatch, useAppSelector} from 'services/TypedRedux';
import {RequestStatus} from 'store/utils';

const AddCategory = () => {
  const [category, setCategory] = useState<string>('');
  const {status} = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(addCategory(category));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Enter the name of the category you want to add. Make sure the category
        name is not already in the list.
      </Text>
      <Text style={styles.label}>Category</Text>
      <Input
        placeholder="Enter the name of the food category."
        value={category}
        onChangeText={(val) => setCategory(val)}
      />
      <Button style={styles.button} onPress={handlePress}>
        {status === RequestStatus.Pending ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Icon name="save" size={wp(6)} color={Colors.white} />
        )}
      </Button>
    </View>
  );
};

export default AddCategory;
