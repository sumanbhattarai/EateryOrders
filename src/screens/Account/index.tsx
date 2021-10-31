import React, {useMemo, useState} from 'react';
import {View, FlatList, TouchableOpacity, Image, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import Text from 'components/Text';
import {brandName, wp, switchColor} from 'utils/Constants';
import {RootStackParamList} from 'navigators/utils';
import {optionsConstant} from './utils';
import Colors from 'utils/Colors';

type button = {
  name: string;
  action: (val?: any) => void;
};

const Account = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'Settings'>
  >();

  const buttons: Array<button> = useMemo(
    () => [
      {
        name: optionsConstant.addCategory,
        action: () => navigation.navigate('AddCategory'),
      },
      {
        name: optionsConstant.addFoodItem,
        action: () => navigation.navigate('AddFood'),
      },
      {
        name: optionsConstant.settings,
        action: () => navigation.navigate('Settings'),
      },
      {
        name: optionsConstant.hotelOpenStatus,
        action: (val: boolean) => {
          setIsOpen(val);
          // TODO: API Call
        },
      },
      {
        name: optionsConstant.ordersHistory,
        action: () => {},
      },
      {
        name: optionsConstant.logout,
        action: () => {},
      },
    ],
    [navigation],
  );

  const renderButtons = ({item}: {item: button}) => {
    return (
      <View style={styles.buttonView}>
        <View style={styles.horizontalFlex}>
          <Text>{item.name}</Text>
          {item.name === optionsConstant.hotelOpenStatus ? (
            <Switch
              trackColor={switchColor}
              thumbColor={Colors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={item.action}
              value={isOpen}
            />
          ) : (
            <TouchableOpacity onPress={item.action}>
              <Icon
                name={
                  item.name === optionsConstant.logout
                    ? 'logout'
                    : 'chevron-right'
                }
                size={wp(6)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
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
