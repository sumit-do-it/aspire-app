import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Card } from "@typings/index";
import { maskCardNumber } from "@utils/cardUtils";

interface CardComponentProps {
  card: Card;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;

export const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const [cardDetailsVisible, setCardDetailsVisible] = useState(false);

  return (
    <View style={[styles.cardContainer, card.isFrozen && styles.frozenCard]}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{card.name}</Text>
        <Ionicons
          name="card"
          size={24}
          color={card.isFrozen ? "#9CA3AF" : "#10B981"}
        />
      </View>

      {/* Card Number */}
      <View style={styles.cardNumberContainer}>
        <Text style={[styles.cardNumber, card.isFrozen && styles.frozenText]}>
          {cardDetailsVisible
            ? card.cardNumber
            : maskCardNumber(card.cardNumber)}
        </Text>
      </View>

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <View>
          <Text
            style={[styles.detailLabel, card.isFrozen && styles.frozenText]}
          >
            EXPIRES
          </Text>
          <Text
            style={[styles.detailValue, card.isFrozen && styles.frozenText]}
          >
            {card.expirationDate}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.detailLabel, card.isFrozen && styles.frozenText]}
          >
            CVV
          </Text>
          <Text
            style={[styles.detailValue, card.isFrozen && styles.frozenText]}
          >
            {cardDetailsVisible ? card.cvv : "***"}
          </Text>
        </View>
      </View>

      {/* Show Card Details Button */}
      <TouchableOpacity
        style={[
          styles.freezeButton,
          cardDetailsVisible
            ? styles.unfreezeButton
            : styles.freezeButtonActive,
        ]}
        onPress={() => {
          setCardDetailsVisible((value) => !value);
        }}
      >
        <Feather
          name={cardDetailsVisible ? "eye-off" : "eye"}
          size={16}
          color="#FFF"
        />
        <Text style={styles.freezeButtonText}>
          {cardDetailsVisible ? "Hide Details" : "Show Details"}
        </Text>
      </TouchableOpacity>

      {/* Frozen Overlay */}
      {card.isFrozen && (
        <View style={styles.frozenOverlay}>
          <Ionicons name="snow" size={32} color="#6B7280" />
          <Text style={styles.frozenLabel}>FROZEN</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 200,
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    position: "relative",
  },
  frozenCard: {
    // opacity: 0.7,
    backgroundColor: "#5c636e",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  cardNumberContainer: {
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "500",
    color: "#F9FAFB",
    letterSpacing: 2,
  },
  frozenText: {
    color: "#9CA3AF",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#9CA3AF",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F9FAFB",
    lineHeight: 18,
    height: 18,
    textAlignVertical: "center",
  },
  freezeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 2
  },
  freezeButtonActive: {
    backgroundColor: "#EF4444",
  },
  unfreezeButton: {
    backgroundColor: "#10B981",
  },
  freezeButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  frozenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(107, 114, 128, 0.3)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  frozenLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginTop: 8,
    letterSpacing: 1,
  },
});
