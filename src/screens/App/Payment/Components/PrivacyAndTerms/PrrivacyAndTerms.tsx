import {FC, JSX} from 'react';
import * as S from './PrivacyAndTerms.style';
import {openLink} from 'helpers/links';

const PrivacyAndTerms: FC = (): JSX.Element => {
  return (
    <S.Container>
      <S.Description>
        By tapping, your App Store account will be charged. Your subscription will auto-renew for the same price and duration until you
        cancel via your App Store settings. You also agree to the Terms.
      </S.Description>
      <S.Description>More details can be found here:</S.Description>
      <S.LinksContainer>
        <S.LinkWrapper onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>
          <S.UnderlinedView>
            <S.LinkText>Privacy Policy</S.LinkText>
          </S.UnderlinedView>
        </S.LinkWrapper>
        <S.Separator>and</S.Separator>
        <S.LinkWrapper onPress={() => openLink('https://www.invitedonly.app/terms-of-service-eula')}>
          <S.UnderlinedView>
            <S.LinkText>Terms and Conditions (EULA)</S.LinkText>
          </S.UnderlinedView>
        </S.LinkWrapper>
      </S.LinksContainer>
    </S.Container>
  );
};

export default PrivacyAndTerms;
