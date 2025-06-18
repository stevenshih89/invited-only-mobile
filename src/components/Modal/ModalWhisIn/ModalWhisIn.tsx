import React, { FC } from 'react';
import * as S from './ModalWhisIn.style';
import Button from 'components/Button/Button';
import useUser from 'hooks/user/useUser';
import { useFirstTimeShowStore } from 'src/store/firstTimeShowStore';

const ModalWhisIn: FC = () => {
  const { isWhosInModalShowed, setIsWhosInModalShowed } = useFirstTimeShowStore();

  const { user, isLoading } = useUser();

  if ((user?.uid && !user?.accountReviewed) || isLoading || isWhosInModalShowed) {
    return null;
  }

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.ContentWrapper>
          <S.StyledBlurView />
          <S.Title>Ready to See Who’s In?</S.Title>
          <S.Description>{`Explore people nearby who are open to joining events like yours`}</S.Description>
          <Button
            buttonStyle={{
              width: '90%',
              marginTop: 24,
            }}
            variant="default"
            onPress={() => {
              setIsWhosInModalShowed(true);
            }}
            title="See Who’s In"
          />
        </S.ContentWrapper>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default ModalWhisIn;
