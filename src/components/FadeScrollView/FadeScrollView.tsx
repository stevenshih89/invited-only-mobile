import React, {ReactNode, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

interface FadeScrollViewProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  fadeColor?: string;
  fadeSize?: number;
}

const FadeScrollView: React.FC<FadeScrollViewProps> = ({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  fadeColor = '#000000',
  fadeSize = 40,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Calculate opacity for top and bottom fades based on scroll position
  const topFadeOpacity = scrollY.interpolate({
    inputRange: [0, fadeSize],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const bottomFadeOpacity = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1], // Always visible until we know content height
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}>
        {children}
      </Animated.ScrollView>
      
      {/* Top fade gradient */}
      <Animated.View style={[styles.fadeMask, styles.topFade, {opacity: topFadeOpacity}]}>
        <LinearGradient
          colors={[fadeColor, 'transparent']}
          style={styles.gradient}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        />
      </Animated.View>
      
      {/* Bottom fade gradient */}
      <Animated.View style={[styles.fadeMask, styles.bottomFade, {opacity: bottomFadeOpacity}]}>
        <LinearGradient
          colors={['transparent', fadeColor]}
          style={styles.gradient}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  fadeMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1,
    pointerEvents: 'none',
  },
  topFade: {
    top: 0,
  },
  bottomFade: {
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
});

export default FadeScrollView;
