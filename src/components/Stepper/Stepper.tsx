import React, {FC, ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';

interface StepperProps {
  active: number;
  content: ReactNode[];
  wrapperStyle?: ViewStyle;
}

const Stepper: FC<StepperProps> = (props): JSX.Element => {
  const {active, content, wrapperStyle} = props;
  return <View style={wrapperStyle}>{content[active]}</View>;
};

export default Stepper;
