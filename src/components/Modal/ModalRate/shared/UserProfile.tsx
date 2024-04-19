import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';

import styles from 'components/Modal/ModalRate/styles.ts';

import FlashIcon from 'assets/images/icons/flash.svg';

export interface IUser {
  name: string;
  online: boolean;
  image: string;
}

type UserProfileProps = {
  user: IUser;
};

function imageSource(source: any): {uri: string} | any {
  if (typeof source === 'string') {
    return {uri: source};
  }

  return source;
}

const UserProfile: FC<UserProfileProps> = ({user}) => {
  const {name, image, online = false} = user;

  return (
    <View>
      <View>
        <Image source={imageSource(image)} style={styles.userPhoto} />
        {online && <View style={styles.greenCircle} />}
      </View>
      <View style={styles.userName}>
        <Text style={styles.title}>{name}</Text>
        <FlashIcon width={19} height={19} />
      </View>
    </View>
  );
};

export default UserProfile;
