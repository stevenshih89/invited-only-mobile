import React, {FC} from 'react';
import {Linking} from 'react-native';
import * as S from './HelpAndSecurity.style';
import IOLogo from 'assets/images/icons/io.svg';
import ChevronRight from 'assets/images/icons/arrow-right-s-line.svg';

const HelpAndSecurity: FC = () => {
  const handleSupportPress = () => {
    Linking.openURL('mailto:Support@invitedonly.com');
  };

  const handleGuidelinesPress = () => {};

  return (
    <S.Container>
      <S.SupportSection testID="support-section" onPress={handleSupportPress}>
        <S.SectionTitle>Need Help?</S.SectionTitle>
        <S.SupportContent>
          <S.LogoContainer>
            <IOLogo width={16} height={16} />
          </S.LogoContainer>
          <S.SupportText>Support@invitedonly.com</S.SupportText>
        </S.SupportContent>
      </S.SupportSection>

      <S.GuidelinesSection testID="guidelines-section" onPress={handleGuidelinesPress}>
        <S.GuidelinesContent>
          <S.GuidelinesTitle>IO Values and Guidlines</S.GuidelinesTitle>
          <S.GuidelinesDescription>See what IO stands for and what we ask of community</S.GuidelinesDescription>
        </S.GuidelinesContent>
        <ChevronRight width={20} height={20} />
      </S.GuidelinesSection>
      <S.SecuritySection testID="security-section">
        <S.SecurityTitle>Security</S.SecurityTitle>
        <S.SecurityDescription>
          Your security and privacy are our utmost concern. Our mobile app is designed with advanced measures to ensure the protection of
          your personal information. Rest easy knowing that your data is handled with the highest level of security and confidentiality,
          providing you with a safe and private experience
        </S.SecurityDescription>
      </S.SecuritySection>
    </S.Container>
  );
};

export default HelpAndSecurity;
