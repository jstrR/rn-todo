import { useReducer, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import * as SecureStore from 'expo-secure-store';

import type { TTodoItem, TItemAction } from "../types";

export const storeName = 'PaidyTODO';

// It's ok to put it here since it's only used in this file
export const layoutAnimConfig = {
  duration: 300,
  create: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export const saveTodoListAsync = async (items: TTodoItem[]) => {
  try {
    await SecureStore.setItemAsync(storeName, JSON.stringify(items));
  } catch (e) { }
};

export const getTodoListAsync = async (): Promise<TTodoItem[]> => {
  try {
    const result = await SecureStore.getItemAsync(storeName);
    if (result) {
      const items: TTodoItem[] = JSON.parse(result);
      return items;
    } else {
      return [];
    }
  } catch (e) { return []; }
};

export const todoListReducer = (state: TTodoItem[], action: TItemAction): TTodoItem[] => {
  switch (action.type) {
    case 'add': {
      const newItems = [...state, action.item];
      saveTodoListAsync(newItems);
      return newItems;
    }
    case 'update': {
      const updatedItems = state.map(item => item.id === action.item.id ? action.item : item);
      saveTodoListAsync(updatedItems);
      return updatedItems;
    }
    case 'delete': {
      const deletedItems = state.filter(item => item.id !== action.item.id);
      saveTodoListAsync(deletedItems);
      return deletedItems;
    }
    case 'initial': {
      if (action.items) {
        return action.items;
      }
      return state;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const useTodoListModel = () => {
  const [todoList, dispatch] = useReducer(todoListReducer, []);
  const [selectedItem, setSelectedItem] = useState<TTodoItem | null>(null);

  const removeItem = (item: TTodoItem) => {
    LayoutAnimation.configureNext(layoutAnimConfig);
    dispatch({ type: 'delete', item });
    if (selectedItem) {
      setSelectedItem(null);
    }
  };

  const submitItem = (label: string) => {
    if (selectedItem) {
      dispatch({ type: 'update', item: { ...selectedItem, label } });
      setSelectedItem(null);
    } else {
      const id = nanoid();
      LayoutAnimation.configureNext(layoutAnimConfig);
      dispatch({ type: 'add', item: { id, label } });
    }
  };

  // Retrieves previously stored items, if they exist
  const setInitialItems = async () => {
    const items = await getTodoListAsync();
    if (items.length) {
      dispatch({ type: 'initial', item: items[0]!, items });
    }
  };

  return [todoList, selectedItem, setSelectedItem, removeItem, submitItem, setInitialItems] as const;
};