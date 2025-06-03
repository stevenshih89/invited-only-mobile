import React from 'react';
import {Image} from 'react-native';

const FastImage = {
  priority: {
    low: 'low',
    normal: 'normal',
    high: 'high',
  },
  cacheControl: {
    immutable: 'immutable',
    web: 'web',
    cacheOnly: 'cacheOnly',
  },
  resizeMode: {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  },
};

const FastImageComponent = ({source, ...props}: any) => {
  return <Image source={source} {...props} />;
};

FastImageComponent.priority = FastImage.priority;
FastImageComponent.cacheControl = FastImage.cacheControl;
FastImageComponent.resizeMode = FastImage.resizeMode;

// Мокаем всю библиотеку
jest.mock('react-native-fast-image', () => FastImageComponent);

export default FastImageComponent;
