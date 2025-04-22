import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FirestoreTest from 'src/components/FirestoreTest/FirestoreTest';
import {blackColor} from 'constants/colors';

const FirestoreTestScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FirestoreTest />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: blackColor,
    flex: 1,
  },
});

export default FirestoreTestScreen;
