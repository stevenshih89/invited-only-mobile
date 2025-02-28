import {useState} from 'react';
import {UserMutations} from "../apiv2/mutations/userMutations.ts";


export const useEmailChange = () => {
  const [email, setEmail] = useState('');
  const {mutate: changeEmailMutate} = UserMutations.useUserChangeEmail();

  const handleChangeEmail = async () => {
    changeEmailMutate(email);
  };

  return {
    handleChangeEmail,
    email,
    setEmail
  }
}
