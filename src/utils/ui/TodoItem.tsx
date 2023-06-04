import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { MainText } from './MainText';
import type { TTodoItem } from '../types';

export const TodoItem = ({
  item,
  onPress,
  onRemove,
}: {
  item: TTodoItem;
  onPress: (item: TTodoItem) => void;
  onRemove: (item: TTodoItem) => void;
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => {
          onPress(item);
        }}>
        <View style={styles.containerLabel}>
          <View style={[styles.icon, { backgroundColor: colors.textAction }]} />
          <MainText numberOfLines={1} style={{ color: colors.textAction }}>
            {item.label}
          </MainText>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item)}>
          <MainText style={{ color: colors.textAction }}>REMOVE</MainText>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  containerButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  containerLabel: {
    alignItems: 'center',
    flex: 7,
    flexDirection: 'row',
  },
  icon: {
    borderRadius: 50,
    height: 20,
    marginRight: 8,
    width: 20,
  },
  removeButton: {
    flex: 3,
    marginLeft: 24,
  },
});
