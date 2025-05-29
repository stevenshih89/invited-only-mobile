import { createContext, ReactNode } from 'react';
import { FirebaseCollectionsResponse } from 'src/apiv2/queries/appSettingsQueries';


interface CollectionsProvider {
  children: ReactNode;
  firebaseCollectionNames?: FirebaseCollectionsResponse;
}

const initialAuthContext: FirebaseCollectionsResponse = {
  adminChats: '',
  admins: '',
  appSettings: '',
  events: '',
  messages: '',
  report: '',
  unfinishedRegistrationUsers: '',
  userInfo: '',
  attendees: '',
  connectionRequests: '',
  userPhoneUids: '',
};

export const FirebaseCollectionsContext = createContext<FirebaseCollectionsResponse>(initialAuthContext);

const FirebaseCollectionsProvider = ({ children, firebaseCollectionNames }: CollectionsProvider) => {

  return (
    <FirebaseCollectionsContext.Provider value={firebaseCollectionNames ? firebaseCollectionNames : initialAuthContext}>
      {children}
    </FirebaseCollectionsContext.Provider>
  );
};

export default FirebaseCollectionsProvider;
