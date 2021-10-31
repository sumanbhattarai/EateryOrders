import React, {useState, useRef} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  NativeScrollEvent,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import onBoardingData, {OnBoardingDataType} from './utils';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import {Width, wp} from 'utils/Constants';

const OnBoardCard = ({data}: {data: OnBoardingDataType}) => {
  const {image, text} = data;
  return (
    <View style={styles.onBoardCard}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </View>
  );
};

const OnBoarding = ({onGetStarted}: {onGetStarted: () => void}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const disabled = useRef<boolean>(true);

  const handleScroll = ({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
    const index: number = Math.round(nativeEvent.contentOffset.x / Width);
    if (activeIndex !== index) {
      // checking if the user has reached to the last slide.
      if (index >= onBoardingData.length - 1) {
        disabled.current = false;
      }
      setActiveIndex(index);
    }
  };

  return (
    <ImageBackground
      source={require('assets/images/wallpaper.jpg')}
      blurRadius={100}
      style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={onBoardingData}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({item}: {item: OnBoardingDataType}) => (
          <OnBoardCard data={item} />
        )}
      />
      <View style={styles.dotBox}>
        {onBoardingData.map((_, index) => {
          return (
            <Text key={index} style={styles.dot}>
              <Icon
                name={index === activeIndex ? 'circle' : 'circle-o'}
                color={Colors.white}
                size={wp(3)}
              />
            </Text>
          );
        })}
      </View>
      <View style={styles.footer}>
        <Button
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.button, {opacity: disabled.current ? 0.7 : 1}]}
          onPress={onGetStarted}
          disabled={disabled.current}>
          <VectorIcon name="arrow-forward" size={wp(6)} color={Colors.white} />
        </Button>
      </View>
    </ImageBackground>
  );
};

export default OnBoarding;
