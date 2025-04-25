import { FC, ReactElement } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import MyPhotos from './MyPhotos/MyPhotos';
import MyInterests from './MyInterests/MyInterests';
import MyBio from './MyBio/MyBio';
import MyLanguagesKnow from './MyLanguages/MyLanguagesKnow';
import MyWork from './MyWork/MyWork';
import MyGeneral from './MyGeneral/MyGeneral';
import MyLocation from './MyLocation/MyLocation';
import * as S from './ProfileEditing.style';
import useUpdateUser from 'hooks/user/useUpdateUser';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import ModalSelectInterests from 'components/Modal/ModalSelectInterests/ModalSelectInterests';
import Button from 'components/Button/Button';
import AvailableInterests from 'screens/App/Components/Intrests/AvailableInterests';
import { showToast } from 'helpers/showToast';
import useUser from 'hooks/user/useUser';

const ProfileEditing: FC = (): ReactElement => {
  const { user } = useUser();
  const { update, isPending } = useUpdateUser();
  if (isPending) {
    return <AppLoader />
  }

  return (
    <Formik
      initialValues={{
        name: user?.name || '',
        gender: user?.gender || undefined,
        birthday: user?.birthday || '',
        showAge: user?.showAge || true,
        work: {
          title: user?.work?.title || '',
          description: user?.work?.description || '',
        },
        location: user?.location || '',
        bio: user?.bio || '',
        interests: user?.interests || [],
        photos: user?.photos || [],
        email: user?.email || '',
      }}
      onSubmit={async (values) => {
        const updatePayload = {
          ...values,
        };
        await update(updatePayload);
        showToast('success', 'Profile updated successfully');
      }}
    >
      {({ setFieldValue, submitForm, values, dirty }) => {
        return (
          <View style={{ flex: 1, backgroundColor: 'black', marginBottom: 30 }}>
            <S.SafeAreaContainer>
              <S.MainContainer>
                <S.ScrollContainer
                  showsHorizontalScrollIndicator={false}
                  enableResetScrollToCoords={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingTop: 20, paddingBottom: 80 }}>
                  <MyPhotos images={values.photos || []} setImages={(value) => { setFieldValue('photos', value) }} />
                  <MyGeneral
                    name={values.name || ''}
                    gender={values.gender || null}
                    date={values.birthday || ''}
                    showAge={values.showAge}
                    setShowAge={(value) => { setFieldValue('showAge', value) }}
                    setDate={(value) => { setFieldValue('birthday', value) }}

                  />
                  <MyWork
                    textNameWork={values.work.title || ''}
                    setTextNameWork={(value) => { setFieldValue('work.title', value) }}
                    textDescription={values.work.description || ''}
                    setTextDescription={(value) => { setFieldValue('work.description', value) }}
                  />
                  <MyLocation homeAddress={values.location || ''} setHomeAddress={(value) => { setFieldValue('location', value) }} country={values.location || ''} setCountry={(value) => { setFieldValue('location', value) }} />
                  <MyBio bio={values.bio || ''} setBio={(value) => { setFieldValue('bio', value) }} />

                  <MyInterests
                    availableInterests={AvailableInterests}
                    loading={false}
                  />
                  <MyLanguagesKnow />
                </S.ScrollContainer>
              </S.MainContainer>
            </S.SafeAreaContainer>
            <ModalSelectInterests
              modalInterests={false}
              setModalInterests={() => { }}
              availableInterests={AvailableInterests}
              formikFieldName="interests"
              formikValues={values}
              setFieldValue={setFieldValue}
            />
            {dirty && (
              <S.SaveButtonContainer>
                <Button title="Save" onPress={() => { submitForm() }} loading={false} />
              </S.SaveButtonContainer>
            )}
          </View>
        )
      }}
    </Formik>
  );
};

export default ProfileEditing;

