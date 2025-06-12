import React, { useContext, FC, useState } from 'react';
import { Switch } from '@rneui/themed';
import ModalConfirmPhone from '../Settings/ModalConfirmPhone';
import * as S from './AccountSetting.style';
import ArrowRight from 'assets/images/icons/arrow-right-s-line.svg';
import TrashIcon from 'assets/images/icons/trash-solid.svg';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';
import Button from 'components/Button/Button';
import { blackColor, whiteColor } from 'constants/colors';
import { useAuthStore } from 'src/store/authStore';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import useUser from 'hooks/user/useUser';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { BackendApiContext } from 'contexts/BackendApiContex';

const AccountSetting: FC = () => {
  const { logout } = useAuthStore();
  const { user } = useUser();
  const [showLocation, setShowLocation] = useState(user?.showLocation);
  const { update } = useUpdateUser();
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { mutate: deleteUser, isPending: isDeletingUser } = invitedOnlyBackendApi.useMutation('delete', '/users/{id}', {
    onSuccess: () => {
      logout();
    },
    onError: error => {
      console.error(error);
    },
  });

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const userPhone = user?.phoneNumber;
  const userEmail = user?.email;

  if (isDeletingUser) {
    return <AppLoader />;
  }
  return (
    <S.Container>
      <S.InnerContainer>
        <S.StyledScrollView>
          <S.ContactSection>
            <S.ContactTitle>Contact</S.ContactTitle>
            <S.PhoneLabel>Phone number</S.PhoneLabel>
            <S.PhoneContainer>
              <S.PhoneNumberContainer>
                <S.PhoneNumberText>
                  {userPhone?.slice(0, 4)}
                  <S.PhoneNumberText> {userPhone?.slice(4, userPhone.length)}</S.PhoneNumberText>
                </S.PhoneNumberText>
              </S.PhoneNumberContainer>
            </S.PhoneContainer>
            <S.EmailLabel>Email</S.EmailLabel>
            <S.EmailInput value={userEmail} onChangeText={() => { }} />
          </S.ContactSection>
          <S.LocationSection>
            <S.LocationHeader>
              <S.LocationTitle>Share location</S.LocationTitle>
              <S.StyledSwitch
                testID="my-events-switch"
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={showLocation ? blackColor : whiteColor}
                value={showLocation}
                onValueChange={() => {
                  setShowLocation(!showLocation);
                }}
              />
              {/* <Switch
                testID="my-events-switch"
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                trackColor={{false: 'rgba(29, 29, 29, 1)', true: whiteColor}}
                thumbColor={''}
              /> */}
            </S.LocationHeader>
            <S.LocationDescription>Share your city with other</S.LocationDescription>
          </S.LocationSection>
          <S.DeleteAccountButton
            onPress={() => {
              setIsDeleteModalVisible(true);
            }}>
            <S.DeleteAccountContent>
              <S.IconContainer>
                <TrashIcon />
              </S.IconContainer>
              <S.DeleteAccountText>Delete my account</S.DeleteAccountText>
            </S.DeleteAccountContent>
            <ArrowRight width={20} height={20} />
          </S.DeleteAccountButton>
        </S.StyledScrollView>
        <Button
          title="Save Changes"
          onPress={() => {
            update({ showLocation: showLocation });
          }}
        />
      </S.InnerContainer>
      <ModalDefault
        isVisible={isDeleteModalVisible}
        onClose={() => {
          setIsDeleteModalVisible(false);
        }}
        onConfirm={() => {
          deleteUser({
            params: {
              path: {
                id: user?.uid || '',
              },
            },
          });
        }}
        confirmText="Delete"
        cancelText="Cancel"
        title="Are You Sure You Want to Delete Your Account?"
        description="You can register a new account. Your events and purchases will not be restored"
      />
      <ModalConfirmPhone isVisible={false} onClose={() => { }} verificationId={''} />
    </S.Container>
  );
};

export default AccountSetting;
