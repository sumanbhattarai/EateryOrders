import React, {useMemo, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import Text from 'components/Text';
import {brandName, wp, switchColor} from 'utils/Constants';
import {RootStackParamList} from 'navigators/utils';
import {optionsConstant} from './utils';
import Colors from 'utils/Colors';
import {useAppDispatch} from 'services/TypedRedux';
import {logout} from 'store/slices/auth';
import {apiIsOpen, apiToggleIsOpen} from 'api/method/misc';
import {showSuccess} from 'utils/Toast';

type button = {
  name: string;
  action: (val?: any) => void;
};

const Account = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'Settings'>
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const response = await apiIsOpen();
      if (response.success) {
        const status = response.data?.[0].isOpen as boolean;
        setLoading(false);
        setIsOpen(status);
      }
    })();
  }, []);

  const buttons: Array<button> = useMemo(
    () => [
      {
        name: optionsConstant.addCategory,
        action: () => navigation.navigate('AddCategory'),
      },
      {
        name: optionsConstant.addFoodItem,
        action: () => navigation.navigate('AddFood', {isEdit: false}),
      },
      {
        name: optionsConstant.settings,
        action: () => navigation.navigate('Settings'),
      },
      {
        name: optionsConstant.hotelOpenStatus,
        action: async (val: boolean) => {
          const response = await apiToggleIsOpen(val);
          if (response.success) {
            setIsOpen(val);
            showSuccess(
              `Success! Hotel has been ${val ? 'opened' : 'closed'}.`,
            );
          }
        },
      },
      {
        name: optionsConstant.spamOrders,
        action: () => navigation.navigate('SpamOrders'),
      },
      {
        name: optionsConstant.logout,
        action: () => dispatch(logout()),
      },
    ],
    [navigation, dispatch],
  );

  const renderButtons = ({item}: {item: button}) => {
    return (
      <View style={styles.buttonView}>
        <View style={styles.horizontalFlex}>
          <Text>{item.name}</Text>
          {item.name === optionsConstant.hotelOpenStatus ? (
            loading ? (
              <ActivityIndicator size="small" color={Colors.black} />
            ) : (
              <Switch
                trackColor={switchColor}
                thumbColor={Colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={item.action}
                value={isOpen}
              />
            )
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
      <FastImage
        source={require('assets/images/logo.png')}
        style={styles.image}
      />
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
