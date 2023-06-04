import React, { useEffect } from 'react';
import { AppState, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  useAuthLevel,
  onSettingsRedirect,
  authUser,
} from '~/utils/models/auth';
import { MainText } from '~/utils/ui';
import type { TProps } from '~/utils/types';

export const WelcomeScreen = ({ navigation }: TProps) => {
  // why use this hook instad of SafeAreaView: https://reactnavigation.org/docs/handling-safe-area/
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const [needEnableAuth, checkAuthLevel] = useAuthLevel();

  //Initial check
  useEffect(() => {
    checkAuthLevel();
  }, [checkAuthLevel]);

  //App state change check (when user goes to settings w/o closing the app)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkAuthLevel();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const onAuth = async () => {
    const isAuthed = await authUser();
    if (isAuthed) {
      // To disable navigation.goBack action in the next screen
      navigation.replace('TodoList');
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <MainText style={[styles.disclaimerText, { color: colors.text }]}>
        {needEnableAuth
          ? 'Please set the authentication method before using the application!'
          : 'You will need to authenticate before you can use the application!'}
      </MainText>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.primary,
          },
        ]}
        onPress={needEnableAuth ? onSettingsRedirect : onAuth}>
        <MainText style={[styles.buttonLabel, { color: colors.textAction }]}>
          {needEnableAuth ? 'Go to Settings' : 'Go to TODO List'}
        </MainText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  disclaimerText: {
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    borderRadius: 24,
    marginBottom: 28,
    minWidth: 250,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonLabel: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
