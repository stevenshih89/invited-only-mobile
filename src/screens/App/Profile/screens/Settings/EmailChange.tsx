import {
    blackColor,
    transparentWhite16Color,
  } from 'constants/colors';
  import {useState} from 'react';
  import {Keyboard, Platform, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
  import {View} from 'react-native';
  import Button from 'components/Button/Button';
  import firestore from '@react-native-firebase/firestore';
  import Input from 'components/Inputs/Input';
  import auth from '@react-native-firebase/auth'
  import { showToast } from 'helpers/showToast';
  import { KeyboardAvoidingView } from 'react-native';
  import {isEmailValid} from 'helpers/regExpValidators';
  import { ScreenHeight } from '@rneui/base';

  
  const EmailChange = () => {
    
    const [email, setEmail] = useState('')
    
    const handleChangeEmail = async () => {
        const user = auth().currentUser
        const _isValidEmail = isEmailValid(email);
        if (!email || !_isValidEmail) {
        showToast('inviteMatch', 'Email is not valid', 'Error')
        return;
        }
        try {
            await firestore().collection('userInfo').doc(user?.uid).update({
                email
            })
            showToast('inviteMatch', 'Email has been changed', 'Success')
        } catch (error) {
            showToast('inviteMatch', `${error}`, 'Error')
        }
    }
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, backgroundColor: blackColor, paddingHorizontal: 20}}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0, borderTopColor: transparentWhite16Color, borderTopWidth: 1}}>
            <KeyboardAvoidingView
              style={{flex: 1, justifyContent: 'space-between'}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? ScreenHeight * 0.12 : 0}
            >
              <View style={{marginTop: 38}}>
                <Input value={email} onChange={setEmail} placeholder='Enter your new email'/>
              </View>
              <Button onPress={handleChangeEmail} title='Change'/>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    );
  };
    
  export default EmailChange;
  