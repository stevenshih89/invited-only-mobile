import React, {createContext, Dispatch, ReactNode, SetStateAction, useState} from 'react';

interface AuthContextData {
  user: any;
  onBoarding: any;
  setUser: Dispatch<SetStateAction<any>>;
  setOnBoarding: Dispatch<SetStateAction<any>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthContext: AuthContextData = {
  user: [],
  setUser: () => {},
  onBoarding: [],
  setOnBoarding: () => {},
};

const AuthContext = createContext<AuthContextData>(initialAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<any>(initialAuthContext.user);
  const [onBoarding, setOnBoarding] = useState<any>(initialAuthContext.onBoarding);

  const value = {
    user,
    setUser,
    onBoarding,
    setOnBoarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export {AuthProvider, AuthContext};
