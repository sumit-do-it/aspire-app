import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { addCardRequest, toggleCardFreezeRequest } from "../redux/actions";
import { CardCarousel } from "../components/CardCarousel";
import { AddCardModal } from "../components/AddCardModal";
import useMainScreen from "../hooks/useMainScreen";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CardOptions from "../components/CardOptions";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const MainScreen: React.FC = () => {
  const { cards, cardOptions, loading, error, bottomSheetRef, selectedCard } =
    useMainScreen();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleAddCard = (cardName: string) => {
    dispatch(addCardRequest({ name: cardName }));
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading && cards.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>Loading your cards...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#111827" />
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Balance Section will only be shown if cards are available */}
        {selectedCard ? (
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>Available balance</Text>
            <Text style={styles.balanceAmount}>${selectedCard?.balance}</Text>
            <Pressable
              onPress={() => {
                console.log("Show Balance");
              }}
              style={styles.rowCenter}
            >
              <Ionicons name="eye-outline" size={16} color="#9CA3AF" />
              <Text style={styles.balanceSubtext}>Show balance</Text>
            </Pressable>
          </View>
        ) : null}

        {/* Cards Section */}

        <View style={styles.cardsSectionHeader}>
          <Text style={styles.sectionTitle}>Debit Cards</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleOpenModal}
            disabled={loading}
          >
            <Ionicons name="add" size={20} color="#10B981" />
            <Text style={styles.addButtonText}>Add Card</Text>
          </TouchableOpacity>
        </View>

        {cards.length > 0 ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[500]}
            handleComponent={CardCarousel}
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
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="card-outline" size={64} color="#6B7280" />
            <Text style={styles.emptyStateTitle}>No cards yet</Text>
            <Text style={styles.emptyStateText}>
              Add your first card to get started
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={handleOpenModal}
            >
              <Text style={styles.emptyStateButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        )}

        <View>
          {/* Add Card Modal */}
          <AddCardModal
            visible={modalVisible}
            onClose={handleCloseModal}
            onAddCard={handleAddCard}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  loadingText: {
    color: "#F9FAFB",
    fontSize: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB",
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 8,
  },
  balanceSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  cardsSection: {
    flex: 1,
    paddingTop: 20,
  },
  cardsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F9FAFB",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bottomSheetContainer: {
    paddingTop: 120,
  },
  bottomSheetContentContainer: {
    padding: 16,
  },
});
