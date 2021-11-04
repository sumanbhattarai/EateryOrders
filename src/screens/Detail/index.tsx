import React from 'react';
import {View, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {useAppSelector} from 'services/TypedRedux';
import {RootStackParamList} from 'navigators/utils';
import Text from 'components/Text';
import Colors from 'utils/Colors';
import Button from 'components/Button';
import {wp} from 'utils/Constants';

interface Props {
  route: RouteProp<RootStackParamList, 'FoodDetail'>;
}

const Detail = ({route}: Props) => {
  const {entities} = useAppSelector((state) => state.menu);
  const id = route.params.id;
  const {name, category, price} = entities[id]!;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FastImage
        source={require('assets/images/pizza.png')}
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
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            corrupti, commodi maxime officia odio asperiores temporibus quos
            omnis ut necessitatibus minus quam, molestiae vero obcaecati optio
            accusamus mollitia quasi libero! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Explicabo assumenda, reiciendis eius
            totam et officia doloribus autem delectus maxime ex quidem natus id
            aperiam. Cupiditate quaerat culpa inventore consequatur
            necessitatibus? Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Dolorum blanditiis minus officiis facere, reprehenderit
            voluptates totam neque, dolores odio aliquam natus, nam assumenda
            nobis fugit dolor explicabo cupiditate quibusdam? Porro. {'\n'}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            tempore nemo incidunt aliquid maiores ad ex at laudantium, veritatis
            accusantium libero sapiente quo officiis odio iure voluptatum
            eveniet nihil? Sapiente. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Rerum cupiditate iure et ea facilis aliquid
            distinctio ab itaque! Rerum debitis sapiente, porro soluta alias
            quis odio incidunt iusto nesciunt obcaecati. {'\n'} {'\n'} Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            corrupti, commodi maxime officia odio asperiores temporibus quos
            omnis ut necessitatibus minus quam, molestiae vero obcaecati optio
            accusamus mollitia quasi libero! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Explicabo assumenda, reiciendis eius
            totam et officia doloribus autem delectus maxime ex quidem natus id
            aperiam. Cupiditate quaerat culpa inventore consequatur
            necessitatibus? Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Dolorum blanditiis minus officiis facere, reprehenderit
            voluptates totam neque, dolores odio aliquam natus, nam assumenda
            nobis fugit dolor explicabo cupiditate quibusdam? Porro. {'\n'}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            tempore nemo incidunt aliquid maiores ad ex at laudantium, veritatis
            accusantium libero sapiente quo officiis odio iure voluptatum
            eveniet nihil? Sapiente. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Rerum cupiditate iure et ea facilis aliquid
            distinctio ab itaque! Rerum debitis sapiente, porro soluta alias
            quis odio incidunt iusto nesciunt obcaecati.
          </Text>
        </View>
        <View style={styles.horizontalFlex}>
          <Button style={styles.button}>
            <Icon name="edit" size={wp(6)} color={Colors.white} />
          </Button>
          <Button style={styles.button}>
            <Icon name="delete" size={wp(6)} color={Colors.white} />
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;
