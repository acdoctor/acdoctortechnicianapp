import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { hp, wp } from './Responvie';
import Colors from '../utils/Colors';
import images from '../assets/Images/images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const isTablet = SCREEN_WIDTH >= 768;
const SLIDER_HEIGHT = isTablet ? SCREEN_WIDTH * 0.45 : SCREEN_WIDTH * 0.6;
const ITEM_SPACING = 12;

const AutoCarousel = ({
  data = [],
  autoPlay = true,
  interval = 3000,
  imageKey = 'image',
}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || data.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval, data.length]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{}}
        style={{
          width: wp(93.5),
          marginTop: 18,
          backgroundColor: Colors.background,
          borderRadius: 7,
          alignSelf: 'center',
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={item?.image}
              // source={images?.pst1}
              style={styles.image}
            />
          </View>
        )}
        onMomentumScrollEnd={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

export default AutoCarousel;
const styles = StyleSheet.create({
  slide: {
    backgroundColor: Colors.background,
    width: wp(100), // 👈 spacing adjust
    height: hp(20),
    // marginHorizontal: 12,
  },
  image: {
    width: wp(100),
    height: '100%',
    borderRadius: 7,
    resizeMode: 'cover',
    // alignSelf: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: isTablet ? 10 : 8,
    height: isTablet ? 10 : 8,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
    width: isTablet ? 14 : 10,
  },
});
