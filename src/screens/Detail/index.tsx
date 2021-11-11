import React, {useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import {useAppDispatch, useAppSelector} from 'services/TypedRedux';
import {RootStackParamList} from 'navigators/utils';
import Text from 'components/Text';
import Colors from 'utils/Colors';
import Button from 'components/Button';
import {wp} from 'utils/Constants';
import {deleteMenu} from 'store/slices/menu';
import {RequestStatus} from 'store/utils';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'FoodDetail'>;
  route: RouteProp<RootStackParamList, 'FoodDetail'>;
}

const Detail = ({navigation, route}: Props) => {
  const {status, entities} = useAppSelector((state) => state.menu);
  const id = route.params.id;
  const {name, category, price, description, photo} = entities[id]!;
  const dispatch = useAppDispatch();

  const handleEditPress = useCallback(() => {
    navigation.navigate('AddFood', {
      isEdit: true,
      id,
    });
  }, [id, navigation]);

  const handleDeletePress = useCallback(() => {
    dispatch(deleteMenu(id)).then(() => navigation.goBack());
  }, [dispatch, id, navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FastImage
        // source={require('assets/images/pizza.png')}
        source={{uri: photo}}
        style={styles.image}
      />
      <View style={styles.informationBox}>
        <Text type="heading" style={styles.heading}>
          {name}
        </Text>
        <View style={styles.horizontalFlex}>
          <Text color={Colors.grey}>{category}</Text>
          <Text color={Colors.grey}>Rs. {price}</Text>
        </View>
        <View style={styles.detail}>
          <Text>{description}</Text>
        </View>
        <View style={styles.horizontalFlex}>
          <Button style={styles.button} onPress={handleEditPress}>
            <Icon name="edit" size={wp(6)} color={Colors.white} />
          </Button>
          <Button
            style={styles.button}
            onPress={handleDeletePress}
            needsInternet
            loading={status === RequestStatus.Pending}>
            <Icon name="delete" size={wp(6)} color={Colors.white} />
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;
