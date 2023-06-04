/**
 * @format
 */
import '@testing-library/jest-native';
import { renderHook, act } from '@testing-library/react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { useAuthLevel } from '~/utils/models/auth';

jest.mock('expo-local-authentication', () => ({
  __esModule: true,
  getEnrolledLevelAsync: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useAuthLevel', () => {
  it('check Auth enabled', async () => {
    const getEnrolledLevelAsyncFn = jest
      .spyOn(LocalAuthentication, 'getEnrolledLevelAsync')
      .mockReturnValue(
        new Promise(resolve => {
          resolve(1);
        }),
      );

    const { result } = renderHook(() => useAuthLevel());

    await act(async () => { await result.current[1]() });
    expect(getEnrolledLevelAsyncFn).toBeCalled();
    expect(result.current[0]).toBe(false);

  });

  it('check no Auth enabled', async () => {
    const getEnrolledLevelAsyncFn = jest
      .spyOn(LocalAuthentication, 'getEnrolledLevelAsync')
      .mockReturnValue(
        new Promise(resolve => {
          resolve(0);
        }),
      );

    const { result } = renderHook(() => useAuthLevel());

    await act(async () => { await result.current[1]() });
    expect(getEnrolledLevelAsyncFn).toBeCalled();
    expect(result.current[0]).toBe(true);
  });
});
