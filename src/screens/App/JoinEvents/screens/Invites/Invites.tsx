import {FC, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator} from '@ant-design/react-native';

import {components} from '@invited-only/invited-only-api';
import InviteCard from './Components/InviteCard/InviteCard';
import * as S from './Invites.style';
import useGetInvites from './hooks/useGetInvites';
import InvitesEmptyFallback from './Components/InvitesEmptyFallback/InvitesEmptyFallback';
import {whiteColor} from 'constants/colors';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import NewConnectionModal from 'screens/App/IO/components/InviteGuestsEvent/Components/NewConnectionModal/NewConnectionModal';

const Invites: FC = () => {
    const {data: pendingInvitesEvents, isLoading, updateInvitesData} = useGetInvites();
    const [newConnectionModal, setNewConnectionModal] = useState<components['schemas']['EventData'] | null>(null);

    if (pendingInvitesEvents.length === 0 && !newConnectionModal) {
        return <InvitesEmptyFallback />;
    }

    return (
        <S.Container>
            {isLoading ? (
                <ActivityIndicator size={'large'} color={whiteColor} />
            ) : (
                <FlatList
                    data={pendingInvitesEvents}
                    keyExtractor={item => item.uid}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={4}
                    windowSize={5}
                    initialNumToRender={4}
                    renderItem={({item}) => (
                        <S.InviteCardWrapper key={item.uid}>
                            <InviteCard event={item} updateInvitesData={updateInvitesData} setNewConnectionModal={setNewConnectionModal} />
                        </S.InviteCardWrapper>
                    )}
                />
            )}
            <ModalLockedAccount />
            <NewConnectionModal
                visible={newConnectionModal !== null}
                onClose={() => {
                    setNewConnectionModal(null);
                }}
                cardData={newConnectionModal}
                isEvent={true}
                eventId={newConnectionModal?.uid || ''}
            />
        </S.Container>
    );
};

export default Invites;
