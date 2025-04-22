import React from 'react';
import {View,Text} from 'react-native';

import useStyles from '../styles.ts';

interface CardsListProps {
  cardsList: any[];
  isHost: boolean;
  cardRef: any;
  handleReject: (params: {uid: string; id?: string; withSwipeAnimation: boolean}) => void;
  handleInvite: (params: {uid: string; id?: string; withSwipeAnimation: boolean}) => void;
  handleScroll: (event: any) => void;
}

const CardsList: React.FC<CardsListProps> = ({cardsList}) => {
  const styles = useStyles();

  return (
    <>
      {cardsList?.map((item, index) => (
        <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
          <Text>deprecated</Text>
        </View>
      ))}
    </>
  );
};

export default CardsList;
