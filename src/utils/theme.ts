import { Theme } from "@react-navigation/native";

export const DefaultTheme = {
  dark: false,
  colors: {
    primary: '#6366f1',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#94A3B8',
    textAction: '#FFFFFF',
    border: '#FFFFFF',
    notification: '#0F172A'
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: '#6366f1',
    background: '#1E313B',
    card: '#1E313B',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    textAction: '#FFFFFF',
    border: '#1E313B',
    notification: '#FFFFFF'
  },
};

interface ExtendedTheme extends Theme {
  // Reference the Theme type's colors field and make our field an intersection
  colors: Theme['colors'] & {
    textSecondary: string;
    textAction: string;
  }
}

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme
}