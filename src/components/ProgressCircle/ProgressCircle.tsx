import { FC } from "react";
import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

interface IProgressCircle {
    size: number,
    strokeWidth: number,
    progress: number,
    color: string,
    backgroundColor: string
}

export const ProgressCircle: FC<IProgressCircle> = ({size, strokeWidth, progress, color, backgroundColor}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Svg width={size} height={size} style={{position: 'absolute', zIndex: 10}}>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            <Circle cx="50%" cy="50%" r={radius} stroke={backgroundColor} strokeWidth={strokeWidth} fill="none" />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
      </View>
    );
  };