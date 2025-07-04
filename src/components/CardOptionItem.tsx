import "react-native-reanimated"; // added for moti view
import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CardOption } from "../typings";
import Feather from "@expo/vector-icons/Feather";
import { MotiView } from "moti";

const CardOptionItem = ({ item }: { item: CardOption }) => {
  return (
    <Pressable
      disabled={!item.onPress}
      onPress={item.onPress}
      style={styles.optionBtn}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        <Text style={styles.optionDesc}>{item.description}</Text>
      </View>

      {/* Show switch only when category is switch + MotiView will create the fade In animation on value change */}
      {item.category === "SWITCH" ? (
        <MotiView
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 500 }}
        >
          <Feather
            name={item.status ? "toggle-right" : "toggle-left"}
            size={28}
            color="#666"
          />
        </MotiView>
      ) : null}
    </Pressable>
  );
};

export default CardOptionItem;

const styles = StyleSheet.create({
  optionBtn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: "#000",
    fontWeight: "500",
  },
  optionDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: "#666",
  },
  leftContainer: {
    gap: 4,
    flex: 1,
  },
});
