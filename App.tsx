import React from 'react';
import {StyleSheet, View, FlatList, ViewToken} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {OnboardingData, data} from './src/data/data';
import RenderItem from './src/components/RenderItem';
import Pagination from './src/components/Pagination';
import CustomButton from './src/components/CustomButton';

type ViewableItemsProps = {
  viewableItems: ViewToken[];
};

const App = () => {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  // we create a shared value named x for the data scroll
  const x = useSharedValue(0);

  // working on pagination, find flatlist index
  const flatlistIndex = useSharedValue(0);

  const onViewableItemsChanged = ({viewableItems}: ViewableItemsProps) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      x.value = e.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={({item, index}) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      {/* scroll event throttle to control how often the scroll
      event will fire while scrolling
      */}

      {/* pagingEnabled when true, the scroll view stops on multiples
        of the scroll view's size when scrolling
      */}

      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
