import {blackColor, transparentWhite16Color} from 'constants/colors';
import {Keyboard, Platform, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {View} from 'react-native';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {KeyboardAvoidingView} from 'react-native';
import {ScreenHeight} from '@rneui/base';
import { useEmailChange } from 'hooks/useEmailChange';

const EmailChange = () => {
  
  const {
    handleChangeEmail,
    email,
    setEmail} = useEmailChange()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: blackColor, paddingHorizontal: 20}}>
        <SafeAreaView style={{flex: 1, paddingBottom: 0, borderTopColor: transparentWhite16Color, borderTopWidth: 1}}>
          <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'space-between'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? ScreenHeight * 0.12 : 0}>
            <View style={{marginTop: 38}}>
              <Input value={email} onChange={setEmail} placeholder="Enter your new email" />
            </View>
            <Button onPress={handleChangeEmail} title="Change" />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailChange;
