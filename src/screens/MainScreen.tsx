import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../redux/store";
import {
  fetchCardsRequest,
  addCardRequest,
  toggleCardFreezeRequest,
} from "../redux/actions";
import { CardCarousel } from "../components/CardCarousel";
import { AddCardModal } from "../components/AddCardModal";

export const MainScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {
    cards,
    loading,
    error,
    selectedCard: selectedCardIndex,
  } = useSelector((state: RootState) => state.cards);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCardsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleAddCard = (cardName: string) => {
    dispatch(addCardRequest({ name: cardName }));
    setModalVisible(false);
  };

  const handleToggleFreeze = (cardId: string) => {
    dispatch(toggleCardFreezeRequest({ cardId }));
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading && cards.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingText}>Loading your cards...</Text>
      </SafeAreaView>
    );
  }

  return (
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

      <View style={{ position: "absolute", left: 0, right: 0, top: 120 }}>
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balanceAmount}>$3,000.00</Text>
          <View style={styles.rowCenter}>
            <Ionicons name="eye-outline" size={16} color="#9CA3AF" />
            <Text style={styles.balanceSubtext}>Show balance</Text>
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
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
        </View>
      </View>

      {cards.length > 0 ? (
        <CardCarousel
          cards={cards}
          selectedCardIndex={selectedCardIndex}
          onToggleFreeze={handleToggleFreeze}
        />
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

      {/* Add Card Modal */}
      <AddCardModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onAddCard={handleAddCard}
        loading={loading}
      />
    </SafeAreaView>
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
    paddingVertical: 16,
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
  quickActions: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 16,
  },
  actionText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
