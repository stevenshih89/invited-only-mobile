import {createContext, FC, ReactNode, useState} from 'react';
interface EventContextType {
  myEvents?: any;
  setMyEvents?: any;
  activeEvent?: any;
  setActiveEvent?: any;
}
interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextType>({});

const EventProvider: FC<EventProviderProps> = ({children}) => {
  const [myEvents, setMyEvents] = useState<any>([]);
  const [activeEvent, setActiveEvent] = useState<any>({});

  const value = {
    myEvents,
    setMyEvents,
    activeEvent,
    setActiveEvent,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export {EventProvider, EventContext};
