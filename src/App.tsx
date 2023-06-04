import React from 'react';
import { Platform, UIManager, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WelcomeScreen } from '~/screens/WelcomeScreen';
import { TodoListScreen } from '~/screens/TodoListScreen';

import { DarkTheme, DefaultTheme } from './utils/theme';
import { type TRootStackParamList } from './utils/types';

const Stack = createNativeStackNavigator<TRootStackParamList>();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            animation: 'fade',
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TodoList" component={TodoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
