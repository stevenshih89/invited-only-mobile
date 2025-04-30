import { useState, useEffect } from "react";
import { components } from "src/api/v1";

interface UseNewConnectionModalProps {
    swipeDataRes: components['schemas']['ConnectionRequest'] | undefined;
    allCards: components['schemas']['User'][];
}

interface UseNewConnectionModalResult {
    isModalVisible: boolean;
    closeModal: () => void;
    matchedCard: components['schemas']['User'] | components['schemas']['EventData'] | undefined;
}

export const useNewConnectionModal = ({ swipeDataRes, allCards }: UseNewConnectionModalProps): UseNewConnectionModalResult => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [matchedCard, setMatchedCard] = useState<components['schemas']['User'] | components['schemas']['EventData'] | undefined>();

    useEffect(() => {
        if (swipeDataRes?.status === 'connection-complete') {
            const matchedCard = allCards.find((card) => card.uid === swipeDataRes?.guestId);
            const matchedEvent = allCards.find((card) => card.uid === swipeDataRes?.eventId);
            setMatchedCard(matchedCard || matchedEvent);
            setIsModalVisible(true);
        }
    }, [swipeDataRes]);

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return {
        isModalVisible,
        closeModal,
        matchedCard,
    };
}; 