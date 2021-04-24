import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import onBoardingData, {OnBoardingDataType} from './utils';
import Button from 'components/Button';
import Colors from 'utils/Colors';
import {Width, wp} from 'utils/Constants';
import useFadeInAnimation from 'animation/useFadeInAnimation';

const OnBoardCard = ({data}: {data: OnBoardingDataType}) => {
  const {image, text}: {image: ImageSourcePropType; text: string} = data;
  return (
    <View style={styles.onBoardCard}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </View>
  );
};

const OnBoarding = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const {opacity} = useFadeInAnimation({});

  const handlePress = () => {};

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {nativeEvent} = e;
    const index: number = Math.round(nativeEvent.contentOffset.x / Width);
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
    // check if user has reached to the last slide
    if (activeIndex === onBoardingData.length - 1) {
      setDisabled(false);
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
      <Animated.View style={[styles.footer, {opacity}]}>
        <Button
          title="Get started"
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.button, {opacity: disabled ? 0.7 : 1}]}
          onPress={handlePress}
          disabled={disabled}
        />
      </Animated.View>
    </ImageBackground>
  );
};

export default OnBoarding;
