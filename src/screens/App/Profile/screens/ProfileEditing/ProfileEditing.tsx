import { FC, ReactElement } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import MyPhotos from './MyPhotos/MyPhotos';
import MyInterests from './MyInterests/MyInterests';
import MyBio from './MyBio/MyBio';
import MyLanguagesKnow from './MyLanguages/MyLanguagesKnow';
import ModalHeight from './ModalHeight';
import MyWork from './MyWork/MyWork';
import MyGeneral from './MyGeneral/MyGeneral';
import MyLocation from './MyLocation/MyLocation';
import * as S from './ProfileEditing.style';
import useUpdateUser from './hooks/useUpdateUser';
import { useAuthStore } from 'src/store/authStore';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import ModalSelectInterests from 'components/Modal/ModalSelectInterests/ModalSelectInterests';
import Button from 'components/Button/Button';
import invitedOnlyBackendApi from 'src/api/backend-api';

const ProfileEditing: FC = (): ReactElement => {
  const { userMetadata } = useAuthStore();
  const { data: user, isLoading } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: {
        id: userMetadata.uid
      }
    }
  })
  const { update, isPending } = useUpdateUser();
  if (isLoading) {
    return <AppLoader />
  }

  return (
    <Formik
      initialValues={{
        name: user?.name || '',
        gender: user?.gender || null,
        birthday: user?.birthday || '',
        showAge: user?.showAge || true,
        work: {
          title: user?.work?.title || '',
          description: user?.work?.description || '',
        },
        location: user?.location || '',
        bio: user?.bio || '',
      }}
      onSubmit={(values) => {
        update(values);
      }}
    >
      {({ setFieldValue, submitForm, values }) => (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <S.SafeAreaContainer>
            <S.MainContainer>
              <S.ScrollContainer
                showsHorizontalScrollIndicator={false}
                enableResetScrollToCoords={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 80 }}>
                <MyPhotos images={user?.photos || []} setImages={() => { }} />
                <MyGeneral
                  name={values.name || ''}
                  gender={values.gender || null}
                  date={values.birthday || ''}
                  showAge={values.showAge || true}
                  setShowAge={(value) => { setFieldValue('showAge', value) }}
                  setDate={(value) => { setFieldValue('birthday', value) }}
                  setIsVisibleHeightModal={() => { }}
                />
                <MyWork
                  textNameWork={values.work.title || ''}
                  setTextNameWork={(value) => { setFieldValue('work.title', value) }}
                  textDescription={values.work.description || ''}
                  setTextDescription={(value) => { setFieldValue('work.description', value) }}
                />
                <MyLocation homeAddress={values.location || ''} setHomeAddress={(value) => { setFieldValue('location', value) }} country={values.location || ''} setCountry={(value) => { setFieldValue('location', value) }} />
                <MyBio bio={values.bio || ''} setBio={(value) => { setFieldValue('bio', value) }} />
                {true && (
                  <S.SaveButtonContainer>
                    <Button title="Save" onPress={() => { submitForm() }} loading={false} />
                  </S.SaveButtonContainer>
                )}
                <MyInterests
                  listOfInterests={[]}
                  setIsVisibleInterestsModal={() => { }}
                  loading={false}
                />
                <MyLanguagesKnow />
              </S.ScrollContainer>
            </S.MainContainer>
          </S.SafeAreaContainer>
          <ModalSelectInterests
            modalInterests={false}
            setModalInterests={() => { }}
            onSave={() => { }}
            setListOfInterests={() => { }}
            listOfInterests={[]}
          />
          <ModalHeight
            saveUserInfo={() => { }}
            showHeight={false}
            setShowHeight={() => { }}
            heightsList={[]}
            height={null}
            setHeight={() => { }}
            isVisible={false}
            onClose={() => { }}
          />
        </View>
      )}
    </Formik>
  );
};

export default ProfileEditing;

