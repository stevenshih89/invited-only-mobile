import {createContext, FC, ReactNode, useState} from 'react';
interface EventContextType {
  myEvents?: any;
  setMyEvents?: any;
  activeEvent?: any;
  setActiveEvent?: any;
  indexEvent?: any;
  setIndexEvent?: any;
}
interface EventProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextType>({});

const EventProvider: FC<EventProviderProps> = ({children}) => {
  const [myEvents, setMyEvents] = useState<any>([]);
  const [indexEvent, setIndexEvent] = useState<number>(0);
  const [activeEvent, setActiveEvent] = useState<any>({});

  const value = {
    myEvents,
    setMyEvents,
    activeEvent,
    setActiveEvent,
    indexEvent,
    setIndexEvent
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export {EventProvider, EventContext};
