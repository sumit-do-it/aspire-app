import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SnapCarousel from "./SnapCarousel";
import { CardComponent } from "./CardComponent";
import { Card } from "@typings/index";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CardOptions from "./CardOptions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateSelectedCard } from "../redux/actions";

interface CardCarouselProps {
  cards: Card[];
  onToggleFreeze: (cardId: string) => void;
  selectedCardIndex: number;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_SPACING = 16;

const BottomSheetHandleComponent = React.memo(() => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state: RootState) => state.cards);
  const renderItem = ({ item, index }: { item: Card; index: number }) => (
    <CardComponent card={item} />
  );

  const onSnapToItem = (newIndex: number) => {
    if (newIndex >= 0) {
      dispatch(updateSelectedCard(newIndex));
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <SnapCarousel
        data={cards}
        renderItem={renderItem}
        itemWidth={CARD_WIDTH}
        separatorWidth={CARD_SPACING}
        onSnapToItem={onSnapToItem}
        initialIndex={0}
      />
    </View>
  );
});

export const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  selectedCardIndex,
  onToggleFreeze,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const selectedCard = cards[selectedCardIndex];

  const cardOptions = [
    {
      title: "Top-up account",
      description: "Deposite money to your account to use with card",
    },
    {
      title: "Weekly spending limit",
      description: "Your weekly spending limit is $5000",
    },
    {
      title: selectedCard?.isFrozen ? "Unfreeze card" : "Freeze card",
      description: selectedCard?.isFrozen
        ? "Your card is currently inactive"
        : "Your card is currently active",
      category: "SWITCH",
      onPress: () => {
        onToggleFreeze(selectedCard?.id);
      },
      status: selectedCard?.isFrozen,
    },
  ];

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[500]}
        handleComponent={BottomSheetHandleComponent}
      >
        <BottomSheetScrollView
          bounces={false}
          bouncesZoom={false}
          contentContainerStyle={[
            styles.bottomSheetContainer,
            styles.bottomSheetContentContainer,
          ]}
        >
          <CardOptions options={cardOptions} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  optionBtn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 4,
  },
  bottomSheetContainer: {
    paddingTop: 120,
  },
  carouselContainer: {
    position: "absolute",
    top: -100,
  },
  bottomSheetContentContainer: {
    padding: 16,
  },
  optionDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: "#666",
  },
});
