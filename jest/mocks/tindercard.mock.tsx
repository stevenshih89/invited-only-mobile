jest.mock('rn-tinder-card-bn-digital', () => {
  const React = require('react');
  const {View} = require('react-native');
  //@ts-ignore
  const CardItem = props => {
    return <View {...props}>{props.children}</View>;
  };
  const TinderCard = props => {
    return <View {...props}>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: CardItem,
    TinderCard,
  };
});
