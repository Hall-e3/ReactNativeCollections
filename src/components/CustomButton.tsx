import {
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {OnboardingData} from '../data/data';

type Props = {
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  flatlistIndex: SharedValue<number>;
  x: SharedValue<number>;
  dataLength: number;
};

const CustomButton = ({flatlistIndex, flatlistRef, x, dataLength}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#005b4f', '#1e2169', '#f15937'],
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatlistIndex.value < dataLength - 1) {
          flatlistRef.current?.scrollToIndex({index: flatlistIndex.value + 1});
        } else {
          console.log('Navigate to next screen');
        }
      }}>
      <Animated.View
        style={[styles.container, animatedColor, buttonAnimatedStyle]}>
        <Text>Get Started</Text>
        <Animated.Text style={[styles.text, arrowAnimatedStyle]}>
          Next
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 50,
    height: 50,
  },
  text: {
    position: 'absolute',
    color: '#fff',
  },
});
