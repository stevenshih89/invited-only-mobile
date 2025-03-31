jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    KeyboardAwareFlatList: (props: any) => <View {...props}>{props.data.map((item: any) => props.renderItem({item, key: item}))}</View>,
  };
});
