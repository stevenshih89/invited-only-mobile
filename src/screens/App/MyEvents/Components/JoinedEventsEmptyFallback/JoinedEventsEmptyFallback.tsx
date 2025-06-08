import React from 'react';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native';
import * as S from './JoinedEventsEmptyFallback.style';
import EmptyInvitesImage from 'src/assets/images/app/invites-empty-1.png';
import EmptyInvitesImage2 from 'src/assets/images/app/invites-empty-2.png';
import EmptyInvitesImage3 from 'src/assets/images/app/invites-empty-3.png';
import EmptyInvitesImage4 from 'src/assets/images/app/invites-empty-4.png';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import MyEventsFallbackImage from 'src/assets/images/app/joined-events-empty-fallback.png';

import useUser from 'hooks/user/useUser';

const JoinedEventsEmptyFallback = () => {
  const { user } = useUser();
  const isUnderReview = user?.uid && !user?.accountReviewed && !user?.accountConfirmed;


  return (
    <S.FallbackContainer>
      <S.Container>
        {!isUnderReview ? (
          <>
            <S.EmptyFallbackImage testID="empty-state-image" resizeMode="contain" source={MyEventsFallbackImage} />
            <S.FallbackTextContainer testID="empty-state-text-container">
              <S.TextContainer>
                <S.FallbackTitleText testID="empty-state-title">{`Build Your Profile,\nGet More Invites`}</S.FallbackTitleText>
              </S.TextContainer>
              <S.TextContainer>
                <S.FallbackInstructorTex testID="empty-state-description">Add details to attract invites!</S.FallbackInstructorTex>
              </S.TextContainer>
            </S.FallbackTextContainer>
          </>
        ) : (
          <FlatList
            numColumns={2}
            columnWrapperStyle={S.columnWrapperStyle}
            data={[EmptyInvitesImage, EmptyInvitesImage2, EmptyInvitesImage3, EmptyInvitesImage4]}
            renderItem={({ item }) => (
              <S.EmptyFallbackImage
                source={item}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          />
        )}
      </S.Container>
      <ModalLockedAccount />
    </S.FallbackContainer>
  );
};

export default JoinedEventsEmptyFallback;
