import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SnapCarousel from "./SnapCarousel";
import { CardComponent } from "./CardComponent";
import { Card } from "@typings/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateSelectedCard } from "../redux/actions";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_SPACING = 16;

export const CardCarousel: React.FC = () => {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    position: "absolute",
    top: -100,
  },
});
