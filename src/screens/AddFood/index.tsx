import React, {useState, useLayoutEffect, useCallback, useMemo} from 'react';
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
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import {ImagePickerResponse} from 'react-native-image-picker';

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

const validateInputs: ({
  name,
  price,
  category,
  pickedImage,
  description,
}: {
  name: string;
  price: string;
  category: string;
  pickedImage: ImagePickerResponse | undefined;
  description: string;
}) => boolean = ({name, price, category, pickedImage, description}) => {
  if (
    properStringValue(name) &&
    price &&
    category &&
    pickedImage &&
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
  } else if (!pickedImage) {
    showError('Failed! Please choose an image.');
  } else {
    return false;
  }
  return false;
};

const AddFood = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [heightOfDescription, setHeightOfDesciption] = useState(hp(6));
  const {openImageLibrary, pickedImage} = useImagePicker();
  const {entities, ids} = useAppSelector((state) => state.category);
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'AddFood'>
  >();
  const {status: menuStatus} = useAppSelector((state) => state.menu);
  const isLoading = menuStatus === RequestStatus.Pending;
  const dispatch = useAppDispatch();

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
      pickedImage,
      description,
    });
    if (isValid) {
      dispatch(
        addMenu({name, price, description, image: 'teststring', category}),
      );
    }
  }, [name, price, category, pickedImage, description, dispatch]);

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
        Enter the details of the food items you want to add. Make sure the food
        item is not already in the list.
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
        defaultValue={null}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropdownStyle}
        onChangeItem={(val) => setCategory(val)}
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
