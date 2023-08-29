import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {data} from './src/data/data';
import RenderItem from './src/components/RenderItem';

type Props = {};

const App = (props: Props) => {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={({item, index}) => {
          return <RenderItem />;
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
      />
      {/* scroll event throttle to control how often the scroll
      event will fire while scrolling
      */}

      {/* pagingEnabled when true, the scroll view stops on multiples
        of the scroll view's size when scrolling
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
