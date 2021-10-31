import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import styles from './styles';
import Text from 'components/Text';
import Input from 'components/Input';
import {hp} from 'utils/Constants';

const AddFood = () => {
  const [heightOfDescription, setHeightOfDesciption] = useState(hp(6));
  console.log(heightOfDescription, hp(6));
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
    </ScrollView>
  );
};

export default AddFood;
