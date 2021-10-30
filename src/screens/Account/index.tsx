import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import Text from 'components/Text';
import {brandName, wp} from 'utils/Constants';

type button = {
  name: string;
  action: () => any;
};

const Account = () => {
  const buttons: Array<button> = [
    {
      name: 'Add a category',
      action: () => {},
    },
    {
      name: 'Add a food item',
      action: () => {},
    },
    {
      name: 'Settings',
      action: () => {},
    },
    {
      name: 'Logout',
      action: () => {},
    },
  ];

  const renderButtons = ({item}: {item: button}) => {
    return (
      <TouchableOpacity onPress={item.action} style={styles.buttonView}>
        <View style={styles.horizontalFlex}>
          <Text>{item.name}</Text>
          <Icon name="chevron-small-right" size={wp(6)} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView} />
      <Text style={styles.title} type="sub-heading">
        {brandName}
      </Text>
      <View style={styles.flatListView}>
        <FlatList
          data={buttons}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderButtons}
        />
      </View>
    </View>
  );
};

export default Account;
