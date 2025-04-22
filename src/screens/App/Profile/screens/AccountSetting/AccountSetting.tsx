import { FC } from 'react';
import { Switch } from '@rneui/themed';
import { View } from 'react-native';
import ModalConfirmPhone from '../Settings/ModalConfirmPhone';
import * as S from './AccountSetting.style';
import ArrowRight from 'assets/images/icons/arrow-right-s-line.svg';
import TrashIcon from 'assets/images/icons/trash-solid.svg';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';
import Button from 'components/Button/Button';
import { blackColor, whiteColor } from 'constants/colors';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { useAuthStore } from 'src/store/authStore';

const AccountSetting: FC<{
  route: any;
}> = ({ route }) => {
  const { userMetadata: user } = useAuthStore();
  const { data: userData } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: user?.uid,
      },
    },
  });

  const userPhone = userData?.phoneNumber;

  return (
    <View>
      <S.Container>
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
            <S.EmailInput value={''} onChangeText={''} />
          </S.ContactSection>
          <S.LocationSection>
            <S.LocationHeader>
              <S.LocationTitle>Share location</S.LocationTitle>
              <Switch
                testID="my-events-switch"
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                trackColor={{ false: 'rgba(29, 29, 29, 1)', true: whiteColor }}
                thumbColor={''}
                value={false}
                onValueChange={() => { }}
              />
            </S.LocationHeader>
            <S.LocationDescription>Share your city with other</S.LocationDescription>
          </S.LocationSection>
          <S.DeleteAccountButton onPress={() => { }}>
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
          buttonStyle={{
            marginBottom: 40,
          }}
          onPress={() => { }}
        />
      </S.Container>
      <ModalDefault
        isVisible={false}
        onClose={() => { }}
        onConfirm={() => { }}
        confirmText="Delete"
        cancelText="Cancel"
        title="Are You Sure You Want to Delete Your Account?"
        description="You can register a new account. Your events and purchases will not be restored"
      />
      <ModalConfirmPhone
        isVisible={false}
        onClose={() => { }}
        verificationId={''}
      />
    </View>
  );
};

export default AccountSetting;
