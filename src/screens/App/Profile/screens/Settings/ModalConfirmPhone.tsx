import {StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, lightGray2Color, whiteColor} from 'constants/colors';
import {RefObject, useState, type FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {screenHeight} from 'constants/common';
import {useUser} from 'src/store/userStore';
import {showToast} from 'helpers/showToast';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

const ModalDeleteMyAccount: FC<{isVisible: boolean; onClose: () => void; verificationId: string}> = ({
  isVisible,
  onClose,
  verificationId,
}) => {
  const [code, setCode] = useState<string>('');

  const userHost = useUser((i: any) => i?.user);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  const handleConfirm = async () => {
    if (!verificationId || !code) {
      return;
    }
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      await auth().currentUser?.reauthenticateWithCredential(credential);
      await deleteUser();
    } catch (e) {
      // console.log('error credential', e);
    }
  };

  const deleteUser = async () => {
    try {
      if (userHost.accountType === 'host') {
        const docSnapshot = await firestore().collection('userInfo').doc(userHost.uid).get();
        const docData = docSnapshot.data();

        if (docData?.eventsList && docData?.eventsList.length > 0) {
          for (const item of docData?.eventsList) {
            await firestore().collection('Events').doc(item).delete();
            await firestore().collection('messages').doc(item).delete();
          }
        }
      } else {
        const docSnapshot = await firestore().collection('messages').where('uidGuest', '==', userHost.uid).get();
        if (!docSnapshot.empty) {
          const deletePromises = docSnapshot.docs.map(doc => {
            return firestore().collection('messages').doc(doc.id).delete();
          });
          await Promise.all(deletePromises);
        }
      }
      await messaging().deleteToken();
      await auth().currentUser?.delete();
      await firestore().collection('userInfo').doc(userHost.uid).delete();
      await auth().signOut();
      showToast('inviteMatch', '', 'Your account has been deleted', {
        ownerPhoto: userHost?.photos[0].image,
        status: 'SUCCESSED',
      });
    } catch (e) {
      // console.log('error delete', e);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View
          style={{
            backgroundColor: blackColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 40,
            paddingTop: 16,
            paddingHorizontal: 30,
            flex: 1,
            justifyContent: 'center', // Center vertically
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(24, 812), fontFamily: Satoshi400, marginBottom: 20, textAlign: 'center'}}>
            Please confirm that this is your account
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginBottom: 20,
            }}>
            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              keyboardAppearance="dark"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={{
                    borderRadius: 10,
                    backgroundColor: lightGray2Color,
                    flex: 1,
                    height: screenHeight / 18,
                    marginHorizontal: 8,
                  }}>
                  <Text style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : '_')}
                  </Text>
                </View>
              )}
            />
          </View>
          <Button title="Confirm" onPress={handleConfirm} />
          <Button title="Cancel" variant="transparent" onPress={onClose} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalDeleteMyAccount;

const styles = StyleSheet.create({
  cell: {
    lineHeight: 38,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginVertical: 'auto',
    fontSize: RFValue(16, 812),
    textAlign: 'center',
    color: whiteColor,
    fontFamily: Satoshi400,
  },
  focusCell: {
    borderRadius: 20,
    borderColor: '#000',
  },
});
