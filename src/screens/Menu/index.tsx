import React, {useEffect, useCallback} from 'react';
import {View, FlatList, Keyboard} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import ContentLoader from 'react-native-easy-content-loader';

import styles from './styles';
import {BottomTabParamList, RootStackParamList} from 'navigators/utils';
import {useAppDispatch, useAppSelector} from 'services/TypedRedux';
import {fetchCategory} from 'store/slices/category';
import {fetchMenu} from 'store/slices/menu';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tag from 'components/Tag';
import {hp} from 'utils/Constants';

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<BottomTabParamList>
  >;
}

const Menu = ({navigation}: Props) => {
  const {loading, entities, ids} = useAppSelector((state) => state.menu);
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
        <ContentLoader
          loading={loading}
          listSize={6}
          pRows={2}
          pHeight={[hp(14), hp(6)]}
          pWidth={['100%', '100%']}
          tWidth={'100%'}
          animationDuration={1000}>
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
        </ContentLoader>
      </SafeAreaView>
    </View>
  );
};

export default Menu;
