import * as SecureStore from 'expo-secure-store';
import { renderHook, act } from '@testing-library/react-native';

import {
  saveTodoListAsync,
  getTodoListAsync,
  todoListReducer,
  storeName,
  useTodoListModel
} from '~/utils/models/todoList';

const todoItems = [{ id: '1', label: 'label' }];

jest.mock('expo-secure-store', () => ({
  __esModule: true,
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
}));

jest.mock("nanoid", () => ({ nanoid: () => "2" }));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Interactions with Secure Store', () => {
  it('saveTodoListAsync', async () => {
    const spy = jest.spyOn(SecureStore, 'setItemAsync');
    await saveTodoListAsync(todoItems);

    expect(spy).toBeCalledWith(storeName, JSON.stringify(todoItems));
  });

  it('getTodoListAsync', async () => {
    const spy = jest.spyOn(SecureStore, 'getItemAsync').mockReturnValue(
      new Promise(resolve => {
        resolve(JSON.stringify(todoItems));
      }),
    );
    const res = await getTodoListAsync();

    expect(spy).toBeCalledWith(storeName);
    expect(res).toEqual(todoItems);
  });
});

describe('todoListReducer', () => {
  it('add action', async () => {
    const addAction = {
      type: 'add' as const,
      item: { id: '2', label: 'label2' },
    };
    const spy = jest.spyOn(SecureStore, 'setItemAsync');
    const newStore = todoListReducer(todoItems, addAction);

    const res = [...todoItems, addAction.item];
    expect(spy).toBeCalledWith(storeName, JSON.stringify(res));
    expect(newStore).toEqual(res);
  });

  it('update action', async () => {
    const updateAction = {
      type: 'update' as const,
      item: { id: '1', label: 'label1' },
    };
    const spy = jest.spyOn(SecureStore, 'setItemAsync');
    const newStore = todoListReducer(todoItems, updateAction);

    const res = [updateAction.item];
    expect(spy).toBeCalledWith(storeName, JSON.stringify(res));
    expect(newStore).toEqual(res);
  });

  it('delete action', async () => {
    const deleteAction = {
      type: 'delete' as const,
      item: { id: '1', label: 'label' },
    };
    const spy = jest.spyOn(SecureStore, 'setItemAsync');
    const newStore = todoListReducer(todoItems, deleteAction);

    expect(spy).toBeCalledWith(storeName, JSON.stringify([]));
    expect(newStore).toEqual([]);
  });

  it('initial action', async () => {
    const initialAction = {
      type: 'initial' as const,
      item: { id: '1', label: 'label1' },
      items: todoItems,
    };
    const spy = jest.spyOn(SecureStore, 'setItemAsync');
    const newStore = todoListReducer(todoItems, initialAction);

    expect(spy).not.toBeCalled();
    expect(newStore).toEqual(initialAction.items);
  });
});

describe('useTodoListModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(SecureStore, 'getItemAsync').mockReturnValue(
      new Promise(resolve => {
        resolve(JSON.stringify(todoItems));
      }),
    );
  });

  it('removeItem handler', async () => {
    const deleteItem = { id: '1', label: 'label' };
    const { result } = renderHook(() => useTodoListModel());

    await act(() => { result.current[5]() });
    await act(() => { result.current[3](deleteItem) });

    expect(result.current[0]).toEqual([]);
  });

  it('submitItem handler with add', async () => {
    const addItem = 'label2';
    const { result } = renderHook(() => useTodoListModel());

    await act(() => { result.current[4](addItem) });

    expect(result.current[0]).toEqual([{ id: '2', label: 'label2' }]);
  });

  it('submitItem handler with update', async () => {
    const updateItem = 'label2';
    const { result } = renderHook(() => useTodoListModel());

    await act(() => { result.current[5]() });
    await act(() => { result.current[2](todoItems[0]!) });
    await act(() => { result.current[4](updateItem) });

    expect(result.current[0]).toEqual([{ id: todoItems[0]?.id, label: updateItem }]);
  });

  it('setInitialItems handler', async () => {
    const { result } = renderHook(() => useTodoListModel());

    await act(() => { result.current[5]() });

    expect(result.current[0]).toEqual(todoItems);
  });
});