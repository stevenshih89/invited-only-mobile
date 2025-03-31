import React from 'react';
import {View, Text} from 'react-native';
import useStyles from '../styles.ts';

export const OverlayRight = ({isHost}: {isHost: boolean}) => {
  const styles = useStyles();
  return (
    <View style={[styles.overlayLabelContainerInvite]}>
      <Text style={styles.overlayLabelTextInvite}>{isHost ? 'INVITE' : 'Join'}</Text>
    </View>
  );
};

export const OverlayLeft = () => {
  const styles = useStyles();
  return (
    <View style={[styles.overlayLabelContainer]}>
      <Text style={styles.overlayLabelText}>NOPE</Text>
    </View>
  );
};
