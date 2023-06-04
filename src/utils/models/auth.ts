import { useState, useCallback } from 'react';
import { Platform, Linking } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export const useAuthLevel = () => {
  const [needEnableAuth, setNeedEnableAuth] = useState(false);

  const checkAuthLevel = useCallback(async () => {
    const res = await LocalAuthentication.getEnrolledLevelAsync();
    setNeedEnableAuth(res === 0);
  }, []);

  return [needEnableAuth, checkAuthLevel] as const;
};

// Redirect to device settings screen
export const onSettingsRedirect = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('App-Prefs:');
  } else {
    Linking.sendIntent('android.settings.SECURITY_SETTINGS');
  }
};

export const authUser = async () => {
  const authState = await LocalAuthentication.authenticateAsync({
    fallbackLabel: 'Enter password',
    promptMessage: 'Authenticate to start using application',
    cancelLabel: 'Close ',
  });
  return authState.success;
}