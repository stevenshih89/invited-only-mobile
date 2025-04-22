import React, {useState} from 'react';
import * as S from './Events.style';
import MyEvents from './MyEvents'; // Your existing list component
import JoinedEventsScreen from './Components/JoinedEventsScreen/JoinedEventsScreen'; // The placeholder
import EventsHeader from './Components/EventsHeader/EventsHeader';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground'; // Assuming path

type TabType = 'MyEvents' | 'JoinedEvents';

const Events = () => {
  const [activeTab, setActiveTab] = useState<TabType>('MyEvents');

  return (
    <DefaultBackground>
      <S.ScreenContainer>
        <EventsHeader />
        <S.TabsRow>
          <S.TabButton isActive={activeTab === 'MyEvents'} onPress={() => setActiveTab('MyEvents')}>
            <S.TabButtonText isActive={activeTab === 'MyEvents'}>My Events</S.TabButtonText>
          </S.TabButton>
          <S.TabButton isActive={activeTab === 'JoinedEvents'} onPress={() => setActiveTab('JoinedEvents')}>
            <S.TabButtonText isActive={activeTab === 'JoinedEvents'}>Joined Events</S.TabButtonText>
          </S.TabButton>
        </S.TabsRow>
        <S.ContentContainer>
          {activeTab === 'MyEvents' && <MyEvents />}
          {activeTab === 'JoinedEvents' && <JoinedEventsScreen />}
        </S.ContentContainer>
      </S.ScreenContainer>
    </DefaultBackground>
  );
};

export default Events;
