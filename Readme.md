# How to run

```bash
npm i
```

```bash
npx react-native start
```

For ios:

```bash
cd ios && pod install
```

```bash
cd .. && npx react-native start
```

```bash
npx react-native run-ios
```

For android:

```bash
npx react-native start
```

```bash
npx react-native run-android
```

## FAQ

### Project architecture

Since the functionality and size of the project is limited, there is simply no reason to use more complex architecture methodologies like [FSD](https://feature-sliced.design/) or [Atomic Design](https://atomicdesign.bradfrost.com/). If you want to see the FSD implementation with Next 13, you can follow [this link](https://github.com/jstrR/movie-app-experimental/tree/main)

### Theme provider

React navigation **useTheme()** hook under the hood uses **React.ContextProvider**, so there is no need to write your own context provider, as the project size and provided functionality is enough to cover the project needs. Alternatives: custom **ContextProvider**, UI library/package providers like **Mantine** or **Tailwind**

### Business logic separation & Testing approach

All business logic and side effects have been extracted into their own models for the sake of readability and testability. Only platform-specific logic/side effects are used in components. **Welcome-test** has been provided as an example of integration testing capabilities. Models are covered as they are the source of business logic. Ultimately, despite understanding the pros and cons, testing approaches are quite controversial and require product context.

### State management

Only **useState** is not enough to cover state management needs. Therefore, **useReducer** was used as a more sophisticated tool for the current needs. Even more complex state managers such as [Effector](https://effector.dev/), [Jotai](https://jotai.org/), [Zustand](https://zustand-demo.pmnd.rs/) were not used due to the assignment origin

## UI preview
![iPhone 14 Pro - Main](https://github.com/jstrR/rn-todo/assets/25367655/650dc49b-9da3-432f-bf9d-e64a03c0cb10)
![iPhone 14 Pro - Secondary](https://github.com/jstrR/rn-todo/assets/25367655/e0f576ae-268a-4811-9d77-38a6d00f4a86)
![iPhone 14 Pro - Dark mode](https://github.com/jstrR/rn-todo/assets/25367655/29e81bd2-7b72-47be-bf45-6fb9a677bdf2)


[Google Pixel 6Pro - Main](https://github.com/jstrR/rn-todo/assets/25367655/67dc639b-17b8-432e-b5d0-909a3619fb58)
