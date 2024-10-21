import {
    blackColor,
    transparentWhite16Color,
  } from 'constants/colors';
  import {useState} from 'react';
  import {SafeAreaView} from 'react-native';
  import {View} from 'react-native';
  import Button from 'components/Button/Button';
  import firestore from '@react-native-firebase/firestore';
  import Input from 'components/Inputs/Input';
  import auth from '@react-native-firebase/auth'
import { showToast } from 'helpers/showToast';
  
  const EmailChange = () => {
    
    const [email, setEmail] = useState('')
    
    const handleChangeEmail = async () => {
        const user = auth().currentUser
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
      <View style={{flex: 1, backgroundColor: blackColor, paddingHorizontal: 20}}>
        <SafeAreaView style={{flex: 1, paddingBottom: 0, borderTopColor: transparentWhite16Color, borderTopWidth: 1, justifyContent: 'space-between'}}>
        <View style={{marginTop: 38, }}>
            <Input value={email} onChange={setEmail} placeholder='Enter your new email'/>
        </View>
            <Button onPress={handleChangeEmail} title='Change'/>
        </SafeAreaView>
      </View>
    );
  };
    
  export default EmailChange;
  