import { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import useGetSubscriptions from '../Payment/hooks/useGetSubscriptions';
import * as S from './Profile.style';
import TabsList from './components/TabsList/TabsList';
import HostPremium from './components/HostPremium/HostPremium';
import SuperInviteBlock from './components/SuperInviteAndJoinBlock/SuperInviteAndJoinBlock';
import ProfileImage from './components/ProfileImage/ProfileImage';

import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import { useProfile } from 'hooks/useProfile';
import { useSettings } from 'hooks/useSettings';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';
import { useLogout } from 'hooks/useLogout';
import { openLink } from 'helpers/links';
import useUser from 'hooks/user/useUser';

const Profile: FC = () => {
  const { userAge, acceptModalVisible, setAcceptModalVisible, changeAccountTypeModalVisible, setChangeAccountModalVisible } = useProfile();
  const { data: subscriptionData, isLoading: isLoadingSubscription } = useGetSubscriptions();
  const { user, isLoading } = useUser();

  const { openLogoutModal, isVisibleLogoutModal, setIsVisibleLogoutModal } = useSettings();
  const { handleLogout } = useLogout(() => setIsVisibleLogoutModal(false));

  if (!user || isLoading) {
    return (
      <S.Container>
        <ActivityIndicator />
      </S.Container>
    );
  }

  return (
    <S.Container>
      {acceptModalVisible && <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={user} setIsVisible={setAcceptModalVisible} />}
      {changeAccountTypeModalVisible && !acceptModalVisible && (
        <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={user} setIsVisible={setChangeAccountModalVisible} />
      )}
      <S.ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        <S.ContentContainer>
          <ProfileImage userData={user} />
          <S.NameContainer>
            <S.NameAgeContainer>
              <S.NameText>{`${user?.name} ${user?.date && userAge ? ',' : ''}`}</S.NameText>
              {userAge ? <S.AgeText>{` ${`${userAge}`}`}</S.AgeText> : null}
              {user?.accountConfirmed ? <S.CheckStarWhite /> : null}
            </S.NameAgeContainer>
            <S.AccountTypeContainer>
              <S.AccountTypeWrapper>
                <S.AccountTypeText>{subscriptionData?.status === 'active' ? 'Host' : 'Guest'}</S.AccountTypeText>
              </S.AccountTypeWrapper>
            </S.AccountTypeContainer>
          </S.NameContainer>
          {!isLoadingSubscription && <HostPremium subscriptionData={subscriptionData} />}
          <SuperInviteBlock />
          <TabsList />
          <S.LogoutButton onPress={openLogoutModal}>
            <S.LogoutText>Log out</S.LogoutText>
          </S.LogoutButton>
          <S.FooterLinks>
            <S.FooterLink onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>
              <S.FooterLinkText>Privacy Policy</S.FooterLinkText>
            </S.FooterLink>
            <S.FooterDivider />
            <S.FooterLink onPress={() => openLink('https://www.invitedonly.app/terms-of-service-eula')}>
              <S.FooterLinkText>Terms of Service</S.FooterLinkText>
            </S.FooterLink>
          </S.FooterLinks>
          <S.Copyright>
            <S.CopyrightText>© {new Date().getFullYear()} Invite Only</S.CopyrightText>
          </S.Copyright>
        </S.ContentContainer>
      </S.ScrollView>
      <ModalDefault
        isVisible={isVisibleLogoutModal}
        onClose={() => setIsVisibleLogoutModal(false)}
        onConfirm={handleLogout}
        confirmText="Log Out"
        cancelText="Cancel"
        title="Log Out?"
        description="Are you sure you want to log out?"
      />
    </S.Container>
  );
};

export default Profile;
