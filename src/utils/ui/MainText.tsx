import React from 'react';
import {
  Text,
  StyleSheet,
  type StyleProp,
  type TextStyle,
  TextProps,
} from 'react-native';

export const MainText = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 18,
  },
});
