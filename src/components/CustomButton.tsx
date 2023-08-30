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
      <Animated.View style={[styles.container, animatedColor]}>
        <Text style={styles.text}>Next</Text>
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
