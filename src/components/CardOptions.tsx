import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import CardOptionItem from "./CardOptionItem";
import { CardOption } from "../typings";

type CardOptionProps = {
    options: CardOption[]
}

const CardOptions = (props: CardOptionProps) => {

  const renderItem = useCallback((item: CardOption, index: number) => {
    return <CardOptionItem key={item.title} item={item} />;
  }, []);

  return (
    <>
      <Text style={styles.heading}>Card Options</Text>
      <View style={styles.listContainer}>{props.options.map(renderItem)}</View>
    </>
  );
};

export default CardOptions;

const styles = StyleSheet.create({
  heading: { fontWeight: "bold", fontSize: 16, marginBottom: 12 },
  listContainer: {},
});
