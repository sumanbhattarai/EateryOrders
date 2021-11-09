import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  ScrollView,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';
import Text from 'components/Text';
import Input from 'components/Input';
import {hp, wp} from 'utils/Constants';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import useImagePicker from 'hooks/useImagePicker';
import {RootStackParamList} from 'navigators/utils';
import {useAppSelector, useAppDispatch} from 'services/TypedRedux';
import {properStringValue} from 'services/StringService';
import {showError} from 'utils/Toast';
import {addMenu} from 'store/slices/menu';
import {RequestStatus} from 'store/utils';
import {IFoodItem} from 'api/utils';

const validateInputs: ({
  name,
  price,
  category,
  description,
}: {
  name: string;
  price: string;
  category: string;
  description: string;
}) => boolean = ({name, price, category, description}) => {
  if (
    properStringValue(name) &&
    price &&
    category &&
    properStringValue(description)
  ) {
    return true;
  }
  if (!properStringValue(name)) {
    showError('Failed! Invalid food name.');
  } else if (!price) {
    showError('Failed! Invalid food price.');
  } else if (!description) {
    showError('Failed! Invalid food description.');
  } else if (!category) {
    showError('Failed! Please pick a category.');
  } else {
    return false;
  }
  return false;
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'AddFood'>;
  route: RouteProp<RootStackParamList, 'AddFood'>;
}

const AddFood = ({navigation, route}: Props) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [heightOfDescription, setHeightOfDesciption] = useState(hp(6));
  const {openImageLibrary, pickedImage} = useImagePicker();
  const {entities, ids} = useAppSelector((state) => state.category);
  const {status: menuStatus} = useAppSelector((state) => state.menu);
  const isLoading = menuStatus === RequestStatus.Pending;
  const dispatch = useAppDispatch();
  const {isEdit, id} = route.params || {};
  const {entities: foodEntities} = useAppSelector((state) => state.menu);
  const foodData = (isEdit ? foodEntities[id!] : {}) as IFoodItem;

  useEffect(() => {
    if (isEdit) {
      setName(foodData.name);
      setPrice(foodData.price);
      setDescription(foodData.description);
      setPrice(foodData.price);
      setCategory(foodData.category);
    }
  }, [isEdit, foodData]);

  const categories = useMemo(
    () =>
      ids.map((el) => ({
        label: entities[el]?.name,
        value: entities[el]?.name,
      })),
    [entities, ids],
  );

  const handleSubmit = useCallback(() => {
    const isValid = validateInputs({
      name,
      price,
      category,
      description,
    });
    if (isValid) {
      if (isEdit) {
        // TODO :Different API and Redux action dispatch.
      } else {
        dispatch(
          addMenu({name, price, description, photo: 'teststring', category}),
        );
      }
    }
  }, [name, price, category, description, dispatch, isEdit]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.save}
          disabled={isLoading}
          onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.black} />
          ) : (
            <Icon name="save" size={wp(6)} color={Colors.black} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSubmit, isLoading]);

  const handleContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      if (e.nativeEvent.contentSize.height < hp(6)) {
        setHeightOfDesciption(hp(6));
        return;
      }
      setHeightOfDesciption(e.nativeEvent.contentSize.height);
    },
    [],
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={Keyboard.dismiss}>
      <Text style={styles.heading}>
        {isEdit
          ? 'Make the changes required for the choosen food item. Make sure all the fields has a valid data.'
          : 'Enter the details of the food items you want to add. Make sure the food item is not already in the list.'}
      </Text>
      <Text style={styles.label}>Name</Text>
      <Input
        placeholder="Enter the name of the food."
        value={name}
        onChangeText={(val) => setName(val)}
      />
      <Text style={styles.label}>Price</Text>
      <Input
        placeholder="Enter the price of the food."
        keyboardType="number-pad"
        value={price}
        onChangeText={(val) => setPrice(val)}
      />
      <Text style={styles.label}>Description</Text>
      <Input
        placeholder="Write about the food."
        multiline
        onContentSizeChange={handleContentSizeChange}
        style={{height: heightOfDescription}}
        value={description}
        onChangeText={(val) => setDescription(val)}
      />
      <Text style={styles.label}>Category</Text>
      <DropDownPicker
        items={categories}
        defaultValue={category}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropdownStyle}
        onChangeItem={(val) => setCategory(val.value)}
        placeholder="Select the category"
        labelStyle={styles.dropdownLabel}
        placeholderStyle={styles.dropdownLabel}
      />
      <Text style={styles.label}>Image</Text>
      <Image
        source={
          pickedImage
            ? {uri: pickedImage.uri}
            : require('assets/images/default-food.png')
        }
        style={styles.image}
      />
      <Button style={styles.button} onPress={openImageLibrary}>
        <Icon name="file-upload" size={wp(6)} color={Colors.white} />
      </Button>
    </ScrollView>
  );
};

export default AddFood;
