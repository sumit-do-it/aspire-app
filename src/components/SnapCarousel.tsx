import React, { memo, useRef } from "react";
import {
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

interface SnapCarouselProps<T> {
  data: T[];
  renderItem: ({
    item,
    index,
  }: {
    item: T;
    index: number;
  }) => React.ReactElement;
  itemWidth: number;
  onSnapToItem?: (index: number) => void;
  initialIndex?: number;
  separatorWidth?: number;
}

const { width: windowWidth } = Dimensions.get("window");

function SnapCarousel<T>({
  data,
  renderItem,
  itemWidth,
  onSnapToItem,
  initialIndex = 0,
  separatorWidth = 16,
}: SnapCarouselProps<T>) {
  const flatListRef = useRef<FlatList<T>>(null);

  // Scroll to initial index on mount
  React.useEffect(() => {
    if (flatListRef.current && initialIndex > 0) {
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }
  }, [initialIndex]);

  // Calculate the index of the item closest to the center
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const center = offsetX + windowWidth / 2;
    const index = Math.round(
      (center - itemWidth / 2) / (itemWidth + separatorWidth)
    );
    if (onSnapToItem) {
      onSnapToItem(Math.max(0, Math.min(index, data.length - 1)));
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, idx) => idx.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + separatorWidth}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: (windowWidth - itemWidth) / 2,
        gap: separatorWidth,
      }}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={(_, index) => ({
        length: itemWidth + separatorWidth,
        offset: (itemWidth + separatorWidth) * index,
        index,
      })}
      windowSize={5}
    />
  );
}

export default memo(SnapCarousel);
