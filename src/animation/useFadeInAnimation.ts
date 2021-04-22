import {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const useFadeInAnimation = ({duration = 800}: {duration?: number}) => {
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {opacity};
};

export default useFadeInAnimation;
