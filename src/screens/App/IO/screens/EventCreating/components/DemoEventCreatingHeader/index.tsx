import {Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppNavigation} from 'hooks/useAppNavigation.tsx';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import React from 'react';
import useStyles from './styles.ts';

const DemoEventCreatingHeader = () => {
  const styles = useStyles();
  const {top} = useSafeAreaInsets();
  const {goBack} = useAppNavigation();

  return (
    <View
      style={{
        ...styles.headerStyle,
        paddingTop: top,
      }}>
      <TouchableOpacity onPress={goBack} style={styles.iconContainer}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={styles.headerTitleStyle}>Share New Table / Event</Text>
      <View
        style={{
          ...styles.overlayContainer,
          height: top + 38,
        }}
      />
    </View>
  );
};

export default DemoEventCreatingHeader;
