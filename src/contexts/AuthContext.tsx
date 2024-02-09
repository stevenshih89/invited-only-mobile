import {createContext} from 'react';

interface AuthContextData {
  user: any;
  setUser: any;
}

const AuthContext = createContext({} as AuthContextData);

export default AuthContext;
