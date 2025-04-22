import {FlatList} from 'react-native';
import {FC, ReactElement, useEffect} from 'react';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import EmptyState from './Components/EmptyState/EmptyState';
import NotificationRow from './Components/NotificationRow/NotificationRow';
import * as S from './Notifications.style';
import {useNotifications} from 'hooks/useNotifications';
import LoaderIcon from 'assets/images/icons/loader.svg';

interface Notifications {
  body: string;
  id: string;
  mark: string;
  title: string;
  uid: string;
  path?: string;
  data?: any;
}

const COUNT_NOTIFICATIONS_TO_ADD = 5;

const Notifications: FC = (): ReactElement => {
  const {loading, notifications, setLimitNotifications, handleDelete, handleNavigate} = useNotifications();

  const rotationLoader = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotationLoader.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }

    return () => {
      cancelAnimation(rotationLoader);
    };
  }, [rotationLoader, loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotationLoader.value}deg`}],
    };
  });

  if (loading) {
    return (
      <S.SafeAreaContainer>
        <Animated.View style={animatedStyle}>
          <LoaderIcon />
        </Animated.View>
      </S.SafeAreaContainer>
    );
  }

  if (!notifications.length) {
    return <EmptyState />;
  }

  return (
    <S.Container>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setLimitNotifications(prev => prev + COUNT_NOTIFICATIONS_TO_ADD)}
        renderItem={({item}) => <NotificationRow item={item} handleDelete={handleDelete} handleNavigate={handleNavigate} />}
      />
    </S.Container>
  );
};

export default Notifications;
