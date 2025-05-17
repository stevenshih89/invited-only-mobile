import React, { FC, JSX } from 'react';
import * as S from './Buttons.style';
import Button from 'components/Button/Button';

const Buttons: FC<{ isButtonDisabled: boolean; buttonTitle: string; restorePurchases: () => void; getOfferings: () => void }> = ({
  isButtonDisabled,
  buttonTitle,
  restorePurchases,
  getOfferings,
}): JSX.Element => {
  return (
    <>
      <Button title={buttonTitle} onPress={getOfferings} disabled={isButtonDisabled} />
      <S.RestoreButton onPress={restorePurchases}>
        <S.UnderlineView>
          <S.RestoreText>Restore purchases</S.RestoreText>
        </S.UnderlineView>
      </S.RestoreButton>
    </>
  );
};

export default Buttons;
