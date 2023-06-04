import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TRootStackParamList = {
  Welcome: undefined;
  TodoList: undefined;
};

export type TProps = NativeStackScreenProps<TRootStackParamList, 'Welcome', 'TodoList'>;

export type TTodoItem = {
  id: string;
  label: string;
};

export type TItemAction = {
  type: 'add' | 'update' | 'delete' | 'initial';
  item: TTodoItem;
  items?: TTodoItem[];
};
