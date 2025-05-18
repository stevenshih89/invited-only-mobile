import { useState, useEffect } from "react";
import { components } from "@invited-only/invited-only-api";
import * as amplitude from '@amplitude/analytics-react-native';

interface UseNewConnectionModalProps {
    swipeDataRes: components['schemas']['ConnectionRequest'] | undefined;
    allCards: components['schemas']['User'][];
    isEvent: boolean;
}

interface UseNewConnectionModalResult {
    isModalVisible: boolean;
    closeModal: () => void;
    matchedCard: components['schemas']['User'] | components['schemas']['EventData'] | undefined;
}




const useNewConnectionModal = ({ swipeDataRes, allCards, isEvent }: UseNewConnectionModalProps): UseNewConnectionModalResult => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [matchedCard, setMatchedCard] = useState<components['schemas']['User'] | components['schemas']['EventData'] | undefined>();


    useEffect(() => {
        if (swipeDataRes?.status === 'connection-complete') {
            amplitude.track('New Match Modal Opened', {
                eventId: swipeDataRes?.eventId,
                guestId: swipeDataRes?.guestId,
                hostId: swipeDataRes?.hostId,
            });
            const matchedCard = allCards.find((card) => card.uid === swipeDataRes?.guestId);
            const matchedEvent = allCards.find((card) => card.uid === swipeDataRes?.eventId);
            if (isEvent) {
                setMatchedCard(matchedEvent);
            } else {
                setMatchedCard(matchedCard);
            }
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

export default useNewConnectionModal;