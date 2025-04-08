import {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {Notifications} from 'hooks/useNotifications';
import SwipeableItem, {useSwipeableItemParams} from 'react-native-swipeable-item';
import DeleteIcon from 'assets/images/icons/trashcan-white.svg';
import * as S from './NotificationRow.style';
import {blackColor} from 'constants/colors';
import {formatDistance} from 'date-fns';

interface NotificationRowProps {
  item: Notifications;
  handleDelete: (id: string) => void;
  handleNavigate: (path: string, data: any) => void;
}

const UnderlayLeft = ({id, handleDelete}: {id: string; handleDelete: (id: string) => void}) => {
  const {close} = useSwipeableItemParams<Notifications>();

  const handleDeleteNotification = () => {
    handleDelete(id);
    close();
  };

  return (
    <S.UnderlayRight>
      <TouchableOpacity style={{alignItems: 'center'}} onPress={handleDeleteNotification}>
        <DeleteIcon width={22} height={22} />
        <S.DeleteText>Delete</S.DeleteText>
      </TouchableOpacity>
    </S.UnderlayRight>
  );
};

const NotificationRow: FC<NotificationRowProps> = ({item, handleDelete, handleNavigate}) => {
  return (
    <SwipeableItem
      key={item.id}
      item={item}
      renderUnderlayLeft={() => <UnderlayLeft handleDelete={handleDelete} id={item.docId} />}
      snapPointsLeft={[100]}>
      <S.Container style={{backgroundColor: blackColor}}>
        <TouchableOpacity
          disabled={!item?.path}
          activeOpacity={0.7}
          style={{backgroundColor: blackColor, flex: 1, flexDirection: 'row'}}
          onPress={() => handleNavigate(item.path || '', item.data)}>
          <S.Image source={{uri: item?.image}} />
          <S.ContentContainer>
            <S.HeaderContainer>
              <S.Title>{item.title}</S.Title>
              <S.TimeAgoText>
                {item?.createdAt ? formatDistance(item?.createdAt.toDate(), new Date(), {addSuffix: false}) : ''}
              </S.TimeAgoText>
            </S.HeaderContainer>
            {item.body.toLowerCase() !== 'invited only' && <S.BodyText>{item.body}</S.BodyText>}
          </S.ContentContainer>
        </TouchableOpacity>
      </S.Container>
    </SwipeableItem>
  );
};

export default NotificationRow;
