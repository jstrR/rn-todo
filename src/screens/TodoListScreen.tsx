import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTodoListModel } from '~/utils/models/todoList';
import { MainText, TodoItem, ButtonInput } from '~/utils/ui';

export const TodoListScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const [
    todoList,
    selectedItem,
    setSelectedItem,
    onRemove,
    onSubmit,
    setInitialItems,
  ] = useTodoListModel();

  useEffect(() => {
    setInitialItems();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}>
      <MainText style={[styles.headingText, { color: colors.primary }]}>
        TODO List:
      </MainText>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          data={todoList}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onRemove={onRemove}
              onPress={setSelectedItem}
            />
          )}
        />
      </View>
      <ButtonInput
        onSubmit={onSubmit}
        updateValue={selectedItem?.label || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headingText: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'left',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    marginBottom: 14,
  },
  listContentContainer: {
    rowGap: 16,
  },
});
