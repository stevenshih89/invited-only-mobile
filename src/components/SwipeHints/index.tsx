import React from 'react';
import { Text, View } from 'react-native';
import { TapGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';
import RejectDemoIcon from 'assets/images/icons/reject-demo.svg';
import InviteDemoIcon from 'assets/images/icons/invite-demo.svg';
import MoreDetailsDemoIcon from 'assets/images/icons/more-details-demo.svg';
import useStyles from './styles.ts';
import { useDemoFlowStore } from "../../store/demoFlowStore";
import HandIC from 'assets/images/icons/hand.svg';

const SwipeHints = () => {
  const styles = useStyles();
  const { setIsVisibleSwipeGuide } = useDemoFlowStore();

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      setIsVisibleSwipeGuide(false);
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleGestureEvent}>
      <TapGestureHandler onHandlerStateChange={handleGestureEvent}>
        <View style={styles.container}>
          <View style={styles.fixedOverlayContainer} />
          <View style={styles.swipeHintsContainer}>
            <View style={styles.hintRow}>
              <View style={styles.swipeHintContainer}>
                <RejectDemoIcon />
                <HandIC style={styles.handIconContainer1} />
                <Text style={[styles.swipeHintTitle]}>Reject</Text>
              </View>
              <View style={[styles.swipeHintContainer, styles.swipeHintInviteContainer]}>
                <InviteDemoIcon />
                <HandIC style={styles.handIconContainer2} />
                <Text style={[styles.swipeHintTitle]}>Invite</Text>
              </View>
            </View>
            <View style={[styles.swipeHintContainer, styles.swipeHintMoreContainer]}>
              <MoreDetailsDemoIcon />
              <HandIC style={styles.handIconContainer3} />
              <Text style={[styles.swipeHintTitle, styles.swipeHintTitleWide]}>More Photos and Details</Text>
            </View>
          </View>
        </View>
      </TapGestureHandler>
    </PanGestureHandler>
  );
};

export default SwipeHints;
