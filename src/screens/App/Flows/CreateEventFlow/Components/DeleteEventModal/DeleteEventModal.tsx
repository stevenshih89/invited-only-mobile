import { useContext } from 'react';
import Modal from 'react-native-modal';
import * as S from './DeleteEventModal.style';
import Button from 'components/Button/Button';
import CloseIcon from 'src/assets/images/icons/close-circle.svg';
import { showToast } from 'helpers/showToast';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { BackendApiContext } from 'contexts/BackendApiContex';

interface DeleteEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  eventId: string;
}

const DeleteEventModal = ({ isVisible, onClose, eventId }: DeleteEventModalProps) => {
  const navigation = useAppNavigation();
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { mutate: deleteEvent, isPending } = invitedOnlyBackendApi.useMutation('delete', '/events/{eventId}', {
    onSuccess: () => {
      onClose();
      navigation.navigate('/bottom-tabs-stack', { screen: '/my-events' });
      showToast('basic', 'Event deleted successfully', 'Event deleted');
    },
    onError: () => {
      showToast('basic', 'Error deleting event', 'Error');
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}>
      <S.ModalContent>
        <S.Title>Delete Event</S.Title>
        <S.CloseButton testID="close-button" onPress={onClose}>
          <CloseIcon width={14} height={14} />
        </S.CloseButton>
        <S.Description>Are you sure you want to delete this event?</S.Description>
        <S.ButtonContainer>
          <Button title="Delete" onPress={() => deleteEvent({ params: { path: { eventId } } })} disabled={isPending} />
        </S.ButtonContainer>
      </S.ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
