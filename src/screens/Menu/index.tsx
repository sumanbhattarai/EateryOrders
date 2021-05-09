import React, {useEffect, useCallback} from 'react';
import {View, FlatList, Keyboard} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import styles from './styles';
import {BottomTabParamList, RootStackParamList} from 'navigators/utils';
import {useAppDispatch, useAppSelector} from 'services/TypedRedux';
import {fetchCategory} from 'store/slices/category';
import {fetchMenu} from 'store/slices/menu';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tag from 'components/Tag';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<BottomTabParamList>
  >;
}

const Menu = ({navigation}: Props) => {
  const {entities, ids} = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  const loadAppDataAsync = useCallback(() => {
    dispatch(fetchCategory());
    dispatch(fetchMenu());
  }, [dispatch]);

  useEffect(() => {
    loadAppDataAsync();
  }, [loadAppDataAsync]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={ids}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsVerticalScrollIndicator={false}
          onScroll={Keyboard.dismiss}
          renderItem={({item: id}) => {
            const {category} = entities[id]!;
            return <Tag title={category} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Menu;
