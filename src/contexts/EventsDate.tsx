import {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';

type ActiveEventDate = 'all' | 'this_weekend' | 'this_month';

interface EventsDateType {
  activeEventDate: ActiveEventDate;
  setActiveEventDate: Dispatch<SetStateAction<ActiveEventDate>>;
}
interface EventProviderProps {
  children: ReactNode;
}
// @ts-ignore
const EventsDate = createContext<EventsDateType>({});

const EventsDateProvider: FC<EventProviderProps> = ({children}) => {
  const [activeEventDate, setActiveEventDate] = useState<ActiveEventDate>('all');

  const value = {
    activeEventDate,
    setActiveEventDate,
  };

  return <EventsDate.Provider value={value}>{children}</EventsDate.Provider>;
};

export {EventsDateProvider, EventsDate};
