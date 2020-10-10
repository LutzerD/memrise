import React, { useRef } from "react";
import { Animated } from "react-native";

export const FadeInText = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.Text // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.Text>
  );
};
