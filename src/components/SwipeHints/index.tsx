import React from 'react';
import {TapGestureHandler, PanGestureHandler, State} from 'react-native-gesture-handler';
import {useDemoFlowStore} from '../../store/demoFlowStore';
import * as S from './index.style';
import RejectDemoIcon from 'assets/images/icons/reject-demo.svg';
import InviteDemoIcon from 'assets/images/icons/invite-demo.svg';
import MoreDetailsDemoIcon from 'assets/images/icons/more-details-demo.svg';
import HandIC from 'assets/images/icons/hand.svg';

const SwipeHints = () => {
  const {setIsVisibleSwipeGuide} = useDemoFlowStore();

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      setIsVisibleSwipeGuide(false);
    }
  };

  return (
    <PanGestureHandler testID="gesture-handler" onHandlerStateChange={handleGestureEvent}>
      <TapGestureHandler onHandlerStateChange={handleGestureEvent}>
        <S.Container>
          <S.FixedOverlayContainer />
          <S.SwipeHintsContainer>
            <S.HintRow>
              <S.SwipeHintMainContainer>
                <RejectDemoIcon />
                <S.HandIconContainer1>
                  <HandIC />
                </S.HandIconContainer1>
                <S.SwipeHintTitle>Reject</S.SwipeHintTitle>
              </S.SwipeHintMainContainer>
              <S.SwipeHintInviteContainer>
                <InviteDemoIcon />
                <S.HandIconContainer2>
                  <HandIC />
                </S.HandIconContainer2>
                <S.SwipeHintTitle>Invite</S.SwipeHintTitle>
              </S.SwipeHintInviteContainer>
            </S.HintRow>
            <S.SwipeHintMoreContainer>
              <MoreDetailsDemoIcon />
              <S.HandIconContainer3>
                <HandIC />
              </S.HandIconContainer3>
              <S.SwipeHintTitleWide>More Photos and Details</S.SwipeHintTitleWide>
            </S.SwipeHintMoreContainer>
          </S.SwipeHintsContainer>
        </S.Container>
      </TapGestureHandler>
    </PanGestureHandler>
  );
};

export default SwipeHints;
