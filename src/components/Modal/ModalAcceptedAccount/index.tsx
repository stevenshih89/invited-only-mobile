import React, {FC, useContext} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUser} from '../../../store/userStore';
import {blackColor, whiteColor} from 'constants/colors';
import Logo from 'assets/images/icons/logo.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Loading from 'components/Loading/Loading';
import Button from 'components/Button/Button';
import {commonStackPath, demoFlowStackPath, demoIntroPath, earlyAccessPath} from 'constants/pathLocations';
import {showToast} from 'helpers/showToast';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {RootStackParamList} from 'typescript/types';

interface RejectAccount {
  isVisible?: boolean;
  setIsVisible?: any;
  userInfo: any;
  // image: any;
}

const useChangeModalAccepted = () => {
  const queryClient = useQueryClient();
  const user = useUser((i: any) => i.user);
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  const acceptAccountMutation = useMutation({
    mutationFn: async (uid: string) => {
      try {
        await firestore().collection(apiUserInfoCollection).doc(uid).update({showModalAccept: false});
        queryClient.invalidateQueries({queryKey: ['userInfo', uid]});
      } catch (error) {
        logErrorToSentry(error, 'error showModalAccept');
        throw error; // Rethrow the error after logging
      }
    },
    onSuccess: () => {
      // Optional: Handle success if needed, like showing a success message
    },
    onError: error => {
      // Optional: Handle error if needed, like showing an error message
    },
  });

  return {acceptAccountMutation};
};

const ModalAcceptedAccount: FC<RejectAccount> = ({isVisible, setIsVisible, userInfo}) => {
  const navigation = useNavigation<RootStackParamList>();
  const {acceptAccountMutation} = useChangeModalAccepted();
  const {user} = useUser();

  const handleContinue = async () => {
    if (user.accountType === 'host' && !user?.isPassedDemo) {
      navigation.navigate(demoFlowStackPath, {screen: demoIntroPath} as never);
    } else {
      navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);
    }

    setIsVisible(false);
    try {
      await acceptAccountMutation.mutateAsync(user.uid);
    } catch (error) {
      showToast('inviteMatch', 'An issue occurred while updating user data. Please try again later.', 'Error');
      logErrorToSentry(error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropOpacity={1}
      backdropColor={blackColor}
      animationInTiming={1}
      animationOutTiming={1}
      style={{
        margin: 0,
        zIndex: 999,
      }}>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 24}}>
          <Logo />
          <Text style={{color: whiteColor, fontSize: RFValue(48, 812), fontFamily: Satoshi500, marginTop: 35}}>Accepted!</Text>
          <View style={{}}>
            <Loading
              topPosition={false}
              userInfo={userInfo}
              text={userInfo?.name}
              styleContainer={{height: 490, flex: 0}}
              showCheckIcon={true}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(20, 812), fontFamily: Satoshi400, marginBottom: 30}}>
            Congratulations! Join invitation accepted. Welcome aboard!
          </Text>
          <Button onPress={handleContinue} title="Continue" buttonStyle={{width: '100%'}} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalAcceptedAccount;
