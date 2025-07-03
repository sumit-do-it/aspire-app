import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddCardModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCard: (cardName: string) => void;
  loading?: boolean;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  visible,
  onClose,
  onAddCard,
  loading = false,
}) => {
  const [cardName, setCardName] = useState('');

  const handleSubmit = () => {
    const trimmedName = cardName.trim();
    
    if (!trimmedName) {
      Alert.alert('Error', 'Please enter a card name');
      return;
    }

    if (trimmedName.length < 2) {
      Alert.alert('Error', 'Card name must be at least 2 characters long');
      return;
    }

    if (trimmedName.length > 30) {
      Alert.alert('Error', 'Card name must be less than 30 characters');
      return;
    }

    onAddCard(trimmedName);
    setCardName('');
  };

  const handleClose = () => {
    setCardName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Add New Card</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                disabled={loading}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              Enter a name for your new card. The card number and expiration date will be generated automatically.
            </Text>

            {/* Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Card Name</Text>
              <TextInput
                style={styles.input}
                value={cardName}
                onChangeText={setCardName}
                placeholder="e.g., Shopping Card, Travel Card"
                placeholderTextColor="#9CA3AF"
                maxLength={30}
                editable={!loading}
                autoFocus
              />
              <Text style={styles.characterCount}>
                {cardName.length}/30
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.addButton,
                  loading && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={loading || !cardName.trim()}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.addButtonText}>Adding...</Text>
                  </View>
                ) : (
                  <>
                    <Ionicons name="add" size={20} color="#FFF" />
                    <Text style={styles.addButtonText}>Add Card</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#10B981',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});