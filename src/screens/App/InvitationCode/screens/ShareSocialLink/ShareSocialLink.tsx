import React, {useState} from 'react';
import {TouchableOpacity, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import * as S from './ShareSocialLink.style';
import InstagramIcon from 'assets/images/icons/instagram.svg';
import TikTokIcon from 'assets/images/icons/tiktok.svg';
import FacebookIcon from 'assets/images/icons/facebook.svg';
import LinkedInIcon from 'assets/images/icons/linkedin.svg';
import TwitterIcon from 'assets/images/icons/twitter.svg';
import InfoIcon from 'assets/images/icons/info-circle.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ModalShareSocialLink from 'components/Modal/ModalShareSocialLink/ModalShareSocialLink';
import Button from 'components/Button/Button';
import {bottomTabsStackPath} from 'constants/pathLocations';
import {useAppNavigation} from 'hooks/useAppNavigation';
import useUpdateUser from 'hooks/user/useUpdateUser';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

type SocialNetwork = 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'other';

const ShareSocialLink = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetwork | null>(null);
  const [profileLink, setProfileLink] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useAppNavigation();
  const {update, isPending} = useUpdateUser();
  const socialNetworks = [
    {id: 'instagram', icon: InstagramIcon},
    {id: 'tiktok', icon: TikTokIcon},
    {id: 'facebook', icon: FacebookIcon},
    {id: 'linkedin', icon: LinkedInIcon},
    {id: 'other', icon: TwitterIcon},
  ];

  const validateSocialLink = (link: string, network: SocialNetwork): boolean => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(link)) {
      return false;
    }

    const instagramPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[\w.-]+\/?$/;
    const facebookPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/[\w.-]+\/?$/;
    const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[\w.-]+\/?$/;

    switch (network) {
      case 'instagram':
        if (!instagramPattern.test(link)) {
          return false;
        }
        break;
      case 'facebook':
        if (!facebookPattern.test(link)) {
          return false;
        }
        break;
      case 'linkedin':
        if (!linkedinPattern.test(link)) {
          return false;
        }
        break;
      case 'tiktok':
        break;
      case 'other':
        break;
    }

    return true;
  };

  const handleSkip = () => {
    Keyboard.dismiss();
    navigation.navigate(bottomTabsStackPath);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!selectedNetwork || !profileLink) {
      return;
    }

    if (!validateSocialLink(profileLink, selectedNetwork)) {
      return;
    }

    update({socialLinks: [{[selectedNetwork]: profileLink}]}).finally(() => {
      navigation.navigate(bottomTabsStackPath);
    });
  };

  const handleNetworkSelect = (network: SocialNetwork) => {
    setSelectedNetwork(network);
    if (profileLink) {
      validateSocialLink(profileLink, network);
    }
  };

  if (isPending) {
    return <AppLoader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.SafeArea>
        <S.Container>
          <S.UpperContent>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32}}>
              <BackButton onPress={() => navigation.goBack()} />
              <LogoPrimary2 />
              <View style={{width: 24}} />
            </View>
            <S.Title>Want to join?</S.Title>
            <S.Description>{`This app is invite-only. Drop a link to one of your social profiles, and we'll check it out.`}</S.Description>

            <S.SocialButtonsContainer>
              {socialNetworks.map(network => {
                const Icon = network.icon;
                const isSelected = selectedNetwork === network.id;
                return (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 56,
                    }}
                    onPress={() => handleNetworkSelect(network.id as SocialNetwork)}
                    activeOpacity={0.8}
                    key={network.id}
                    testID={`social-button-${network.id}`}>
                    <S.GradientCell
                      backgroundColor={isSelected ? '#202020' : ' #0f0f0f'}
                      key={network.id}
                      gradientProps={{
                        start: {x: 0, y: 0},
                        end: {x: 1, y: 1},
                        colors: isSelected
                          ? ['rgba(26, 26, 26, 0.3)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0)']
                          : ['transparent'],
                      }}>
                      <Icon width={24} height={24} />
                    </S.GradientCell>
                  </TouchableOpacity>
                );
              })}
            </S.SocialButtonsContainer>
            <S.Input
              placeholder="Paste link here"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={profileLink}
              onChangeText={(text: string) => {
                setProfileLink(text);
              }}
              autoCapitalize="none"
              testID="profile-link-input"
            />
            <S.HelpButton testID="help-button" onPress={() => setIsModalVisible(true)}>
              <S.HelpText>How to get your profile link?</S.HelpText>
              <InfoIcon width={16} height={16} />
            </S.HelpButton>
          </S.UpperContent>
          <S.ButtonsContainer>
            <Button
              title="Submit Request"
              disabled={!profileLink || !selectedNetwork || !validateSocialLink(profileLink, selectedNetwork)}
              variant="default"
              onPress={handleSubmit}
            />
            <Button title="Skip" variant="gray" onPress={handleSkip} />
          </S.ButtonsContainer>
        </S.Container>
        <ModalShareSocialLink isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      </S.SafeArea>
    </TouchableWithoutFeedback>
  );
};

export default ShareSocialLink;
