import {StyleProp, View, ViewStyle} from 'react-native';
import {FC, ReactNode, useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import * as S from './FullEvent.style';
import CheckCircleIcon from 'assets/images/icons/check-circle.svg';
import {INVITE_MATCH_STATUS} from 'constants/common';
import {showToast} from 'helpers/showToast';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

interface FullEventProps {
  activeEvent: any;
  totalQuantityGuests: number;
  totalRequestsGuests?: number;
  acceptQuantityGuest: number;
  rightComponent?: ReactNode;
  text: string;
  styleContainer?: StyleProp<ViewStyle>;
}

const FullEvent: FC<FullEventProps> = ({activeEvent, totalRequestsGuests, rightComponent, text, styleContainer}) => {
  const [actualActiveEventData, setActualActiveEventData] = useState([]);
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);

  const getActiveEventData = async () => {
    try {
      const getEventData = (await firestore().collection(apiEventsCollection).doc(activeEvent.id).get()).data();
      if (getEventData) {
        setActualActiveEventData(getEventData);
      }
    } catch (error) {
      showToast('basic', 'An issue occurred while fetching the event data. Please try again later.', 'Error');
      logErrorToSentry(error);
    }
  };

  useEffect(() => {
    getActiveEventData();
  }, [activeEvent]);

  return (
    <S.Container style={styleContainer}>
      <S.EventWrapper>
        <S.UsersWrapper>
          {actualActiveEventData?.usersList?.map((item, index) => {
            if (item.status === INVITE_MATCH_STATUS && index < 2) {
              return (
                <S.User key={item.uid}>
                  {index < 1 ? (
                    <S.Avatar source={{uri: item.userPhoto}} />
                  ) : (
                    <S.Avatar
                      style={{
                        transform: [{translateX: -10}],
                      }}
                      source={{uri: item.userPhoto}}
                    />
                  )}
                  <View style={{position: 'absolute', left: index < 1 ? 7 : -2}}>
                    <CheckCircleIcon width={18} height={18} />
                  </View>
                </S.User>
              );
            }
            return null;
          })}
          {totalRequestsGuests && activeEvent?.usersList?.length > 1 ? (
            <S.RequestsWrapper
              style={{
                transform: [{translateX: activeEvent?.usersList?.length >= 2 ? -20 : -10}],
              }}>
              <S.RequestsCountWrapper>
                <S.TextCount>{`+${totalRequestsGuests}`}</S.TextCount>
              </S.RequestsCountWrapper>
            </S.RequestsWrapper>
          ) : null}
          <S.TextContent
            style={{
              transform: [
                {
                  translateX:
                    activeEvent?.usersList?.length >= 2 && totalRequestsGuests ? -20 : activeEvent?.usersList?.length > 1 ? -10 : 0,
                },
              ],
            }}>
            {text}
          </S.TextContent>
        </S.UsersWrapper>
        {rightComponent && rightComponent}
      </S.EventWrapper>
    </S.Container>
  );
};

export default FullEvent;
