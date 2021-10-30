import React, {useMemo} from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import Text from 'components/Text';
import {brandName, wp} from 'utils/Constants';
import {RootStackParamList} from 'navigators/utils';

type button = {
  name: string;
  action: () => any;
};

const Account = () => {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'Settings'>
  >();

  const buttons: Array<button> = useMemo(
    () => [
      {
        name: 'Add a category',
        action: () => navigation.navigate('AddCategory'),
      },
      {
        name: 'Add a food item',
        action: () => navigation.navigate('AddFood'),
      },
      {
        name: 'Settings',
        action: () => navigation.navigate('Settings'),
      },
      {
        name: 'Logout',
        action: () => {},
      },
    ],
    [navigation],
  );

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
      <Image source={require('assets/images/logo.png')} style={styles.image} />
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
