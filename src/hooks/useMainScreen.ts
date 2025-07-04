import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchCardsRequest, toggleCardFreezeRequest } from "../redux/actions";

export default () => {
  const dispatch = useDispatch();
  const {
    cards,
    loading,
    error,
    selectedCard: selectedCardIndex,
  } = useSelector((state: RootState) => state.cards);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const selectedCard = cards[selectedCardIndex];

  const handleToggleFreeze = (cardId: string) => {
    dispatch(toggleCardFreezeRequest({ cardId }));
  };

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
        handleToggleFreeze(selectedCard?.id);
      },
      status: selectedCard?.isFrozen,
    },
  ];

  useEffect(() => {
    dispatch(fetchCardsRequest());
  }, [dispatch]);

  return {
    cards,
    cardOptions,
    modalVisible,
    setModalVisible,
    bottomSheetRef,
    loading,
    error,
    selectedCard
  };
};
