import React from 'react';
import * as S from './HeaderRightProfileEditing.style';
import {myProfileViewPath, profileStackPath} from 'constants/pathLocations';
import {useAppNavigation} from 'hooks/useAppNavigation';

const HeaderRightProfileEditing = () => {
  const navigation = useAppNavigation();

  const goToMyProfileView = (): void => {
    navigation.navigate(profileStackPath as any, {screen: myProfileViewPath} as never);
  };

  return (
    <S.PreviewButton testID="preview-button" onPress={goToMyProfileView}>
      <S.PreviewText>Preview</S.PreviewText>
    </S.PreviewButton>
  );
};

export default HeaderRightProfileEditing;
