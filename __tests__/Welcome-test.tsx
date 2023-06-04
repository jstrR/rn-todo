/**
 * @format
 */
import '@testing-library/jest-native';
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import * as AuthModel from '~/utils/models/auth';

import { WelcomeScreen } from '~/screens/WelcomeScreen';

jest.mock('react-native-safe-area-context', () => ({
  __esModule: true,
  useSafeAreaInsets: jest.fn(() => ({ bottom: 0, top: 0, left: 0, right: 0 })),
}));

jest.mock('../src/utils/models/auth.ts', () => ({
  useAuthLevel: jest.fn(() => [true, () => {}]),
  onSettingsRedirect: jest.fn(),
  authUser: jest.fn(() => true),
}));

const navigation = {
  replace: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Welcome screen', () => {
  it('initial render', () => {
    renderer.create(
      <WelcomeScreen navigation={navigation as any} route={{} as any} />,
    );
  });

  it('render with Auth option enabled', async () => {
    const useAuthFn = jest
      .spyOn(AuthModel, 'useAuthLevel')
      .mockReturnValue([false, async () => {}]);
    const authUserFn = jest.spyOn(AuthModel, 'authUser').mockReturnValue(
      new Promise(resolve => {
        resolve(true);
      }),
    );

    render(<WelcomeScreen navigation={navigation as any} route={{} as any} />);

    const description = await screen.findByText(
      'You will need to authenticate before you can use the application!',
    );
    const actionButton = await screen.findByText('Go to TODO List');

    expect(description).toBeOnTheScreen();
    expect(actionButton).toBeOnTheScreen();

    fireEvent.press(actionButton);
    expect(authUserFn).toBeCalled();
    await waitFor(() => expect(navigation.replace).toBeCalledWith('TodoList'));
  });

  it('render with no Auth option enabled', async () => {
    const useAuthFn = jest
      .spyOn(AuthModel, 'useAuthLevel')
      .mockReturnValue([true, async () => {}]);
    const onSettingsRedirectFn = jest
      .spyOn(AuthModel, 'onSettingsRedirect')
      .mockReturnValue();

    render(<WelcomeScreen navigation={navigation as any} route={{} as any} />);

    const description = await screen.findByText(
      'Please set the authentication method before using the application!',
    );
    const actionButton = await screen.findByText('Go to Settings');

    expect(description).toBeOnTheScreen();
    expect(actionButton).toBeOnTheScreen();

    fireEvent.press(actionButton);
    expect(onSettingsRedirectFn).toBeCalled();
  });
});
