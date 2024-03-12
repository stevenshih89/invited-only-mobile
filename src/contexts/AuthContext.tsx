import React, {createContext, Dispatch, ReactNode, SetStateAction, useState} from 'react';

interface AuthContextData {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthContext: AuthContextData = {
  user: [],
  setUser: () => {},
};

const AuthContext = createContext<AuthContextData>(initialAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<any>(initialAuthContext.user);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export {AuthProvider, AuthContext};
