import React, {useEffect, useCallback} from 'react';
import {View, FlatList, Keyboard, RefreshControl} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';
import {useAppDispatch, useAppSelector} from 'services/TypedRedux';
import {fetchCategory} from 'store/slices/category';
import {fetchMenu} from 'store/slices/menu';
import Tag from 'components/Tag';
import {hp} from 'utils/Constants';
import Greeting from './components/Greeting';
import {RequestStatus} from 'store/utils';

interface Props {}

const Menu = ({}: Props) => {
  const {status, ids, menus} = useAppSelector((state) => state.menu);
  const isLoading = status === RequestStatus.Pending;
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
      <SafeAreaView style={styles.fullFlex}>
        <Greeting />
        <ContentLoader
          loading={isLoading && ids.length < 1}
          listSize={6}
          pRows={2}
          pHeight={[hp(14), hp(6)]}
          pWidth={['100%', '100%']}
          tWidth={'100%'}
          animationDuration={1000}>
          <FlatList
            data={menus}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
            onScroll={Keyboard.dismiss}
            refreshControl={
              <RefreshControl
                refreshing={isLoading && ids.length > 0}
                onRefresh={() => dispatch(fetchMenu())}
              />
            }
            renderItem={({item}) => {
              const {category} = item;
              return <Tag title={category} />;
            }}
          />
        </ContentLoader>
      </SafeAreaView>
    </View>
  );
};

export default Menu;
