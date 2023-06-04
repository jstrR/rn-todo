import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import { MainText } from './MainText';

export const ButtonInput = ({
  updateValue,
  onSubmit,
}: {
  updateValue?: string;
  onSubmit: (label: string) => void;
}) => {
  const { colors } = useTheme();

  const [inputValue, setInputValue] = useState(updateValue || '');

  useEffect(() => {
    setInputValue(updateValue || '');
  }, [updateValue]);

  //Low computations, no need to useMemo or etc..
  const isDisabled = !inputValue;

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <TextInput
          onChangeText={e => setInputValue(e)}
          onSubmitEditing={!isDisabled ? handleSubmit : () => {}}
          placeholder="Enter label"
          placeholderTextColor={colors.textSecondary}
          value={inputValue}
          style={[
            styles.input,
            { borderColor: colors.textAction, color: colors.textAction },
          ]}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isDisabled}
          style={[
            styles.button,
            {
              backgroundColor: colors.textAction,
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}>
          <MainText style={[styles.buttonLabel, { color: colors.primary }]}>
            {updateValue ? 'Update' : 'Add'}
          </MainText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 12,
  },
  input: {
    borderBottomWidth: 1,
    flex: 7,
    fontSize: 18,
    marginHorizontal: 16,
    paddingVertical: 14,
  },
  button: {
    borderRadius: 16,
    flex: 3,
    paddingVertical: 14,
  },
  buttonLabel: {
    fontWeight: '500',
    textAlign: 'center',
  },
});
