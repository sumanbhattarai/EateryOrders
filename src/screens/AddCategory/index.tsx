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
import {showError} from 'utils/Toast';

const AddCategory = () => {
  const [category, setCategory] = useState<string>('');
  const {status} = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (!category) {
      showError('Failed! Category name cannot be blank.');
      return;
    }
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
      <Button
        style={styles.button}
        onPress={handlePress}
        needsInternet={true}
        loading={status === RequestStatus.Pending}>
        <Icon name="save" size={wp(6)} color={Colors.white} />
      </Button>
    </View>
  );
};

export default AddCategory;
