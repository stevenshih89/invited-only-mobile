import {useSharedValue} from 'react-native-reanimated';
import {useRef} from 'react';
import {ICarouselInstance} from 'react-native-reanimated-carousel';
import CalendarIcon from 'assets/images/icons/calendar-event-gray.svg';
import IOIcon from 'assets/images/icons/io-gray.svg';
import ExportIcon from 'assets/images/icons/export-gray.svg';
import EyeIcon from 'assets/images/icons/eye-solid-gray.svg';

export const useReanimatedCarousel = () => {
  const slidesList = [
    {
      id: 1,
      title: 'Unlimited Tables/Events Sharing',
      description: 'Share an unlimited number of events or tables with guests and increase visibility',
      icon: CalendarIcon,
    },
    {
      id: 2,
      title: 'Unlimited Invitations',
      description: 'Send as many invitations as you need to connect with potential guests or hosts',
      icon: ExportIcon,
    },
    {
      id: 3,
      title: 'Unlimited Swipes',
      description: 'Enjoy unlimited swiping for discovering new connections and events',
      icon: IOIcon,
    },
    {
      id: 4,
      title: '5 Super Invites a Week',
      description: 'Unlock 5 Super Invites weekly to boost your chances of securing guests or events',
      icon: ExportIcon,
    },
    {
      id: 5,
      title: 'See Who Wants to Join You',
      description: 'View a list of guests who are interested in joining your event or table',
      icon: EyeIcon,
    },
  ];

  const progressValue = useSharedValue(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const handlePaginationPress = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progressValue.value,
      animated: true,
    });
  };

  return {slidesList, progressValue, carouselRef, handlePaginationPress};
};
