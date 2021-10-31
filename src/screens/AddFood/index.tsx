import React, {useState, useLayoutEffect} from 'react';
import {Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from 'services/TypedRedux';

const AddFood = () => {
  const [heightOfDescription, setHeightOfDesciption] = useState(hp(6));
  const {openImageLibrary, pickedImage} = useImagePicker();
  const {entities, ids} = useAppSelector((state) => state.category);
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'AddFood'>
  >();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.save}>
          <Icon name="save" size={wp(6)} color={Colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>
        Enter the details of the food items you want to add. Make sure the food
        item is not already in the list.
      </Text>
      <Text style={styles.label}>Name</Text>
      <Input placeholder="Enter the name of the food." />
      <Text style={styles.label}>Price</Text>
      <Input
        placeholder="Enter the price of the food."
        keyboardType="number-pad"
      />
      <Text style={styles.label}>Description</Text>
      <Input
        placeholder="Write about the food."
        multiline
        onContentSizeChange={(e) => {
          if (e.nativeEvent.contentSize.height < hp(6)) {
            setHeightOfDesciption(hp(6));
            return;
          }
          setHeightOfDesciption(e.nativeEvent.contentSize.height);
        }}
        style={{height: heightOfDescription}}
      />
      <Text style={styles.label}>Category</Text>
      <DropDownPicker
        items={ids.map((el) => ({
          label: entities[el]?.name,
          value: entities[el]?.name,
        }))}
        defaultValue={null}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropdownStyle}
        onChangeItem={() => {}}
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
