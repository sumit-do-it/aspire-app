import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import SnapCarousel from './SnapCarousel';
import { CardComponent } from './CardComponent';
import { Card } from '@typings/index';
import BottomSheet from '@gorhom/bottom-sheet';

interface CardCarouselProps {
  cards: Card[];
  onToggleFreeze: (cardId: string) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_SPACING = 16;

export const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  onToggleFreeze,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderItem = ({ item }: { item: Card }) => (
    <CardComponent card={item} />
  );

  const selectedCard = cards[activeIndex];

  return (
    <View style={styles.container}>
      <SnapCarousel
        data={cards}
        renderItem={renderItem}
        itemWidth={CARD_WIDTH}
        separatorWidth={CARD_SPACING}
        onSnapToItem={setActiveIndex}
        initialIndex={0}
      />
      <BottomSheet ref={bottomSheetRef} snapPoints={[180]}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 12 }}>Card Options</Text>
          <TouchableOpacity onPress={() => {/* Top-up logic */}} style={styles.optionBtn}>
            <Text>Top-up account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Set limit logic */}} style={styles.optionBtn}>
            <Text>Weekly spending limit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onToggleFreeze(selectedCard.id)} style={styles.optionBtn}>
            <Text>{selectedCard.isFrozen ? 'Unfreeze card' : 'Freeze card'}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    marginVertical: 20,
  },
  optionBtn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});