# How to run

```bash
npm i
```

```bash
npx react-native start
```

For ios:

```bash
npx react-native run-ios
```

For android:

```bash
npx react-native run-android
```

# Before review

## Dependencies overview

- Bare React Native
- **expo-local-authentication** - assignment requirement
- **expo-secure-store** - since the application must be secured and **expo-local-authentication** must be used, it makes sense to use this package instead of **AsyncStorage** or packages from other vendors or own handwritten solution
- **nanoid** - great and lightweight tool for the _id_ generation. Alternatives: **Math.rand**, **uuid**
- **react-navigation** - standard navigation package
- **testing-library/react-native** - testing utilities enhancement
- UI styling - since this is an assignment, only the build-in styling tools are used. Alternatives: **Mantine**, **MUI**, **Tailwind**, **Styled Components**, etc...

## FAQ

### Project architecture

Since the functionality and size of the project is limited, there is simply no reason to use more complex architecture methodologies like [FSD](https://feature-sliced.design/) or [Atomic Design](https://atomicdesign.bradfrost.com/). If you want to see the FSD implementation with Next 13, you can follow [this link](https://github.com/jstrR/movie-app-experimental/tree/main).

### Theme provider

React navigation **useTheme()** hook under the hood uses **React.ContextProvider**, so there is no need to write your own context provider, as the project size and provided functionality is enough to cover the project needs. Alternatives: custom **ContextProvider**, UI library/package providers like **Mantine** or **Tailwind**.

### Business logic separation & Testing approach

All business logic and side effects have been extracted into their own models for the sake of maintainability, readability and testing. Only platform-specific logic/side effects are used in components. **Welcome-test** has been provided as an example of integration testing capabilities. Models are covered as they are the source of business logic. Ultimately, testing approaches are quite controversial and require product context. ([some good thoughts here](https://www.youtube.com/watch?v=FF50H2RWaEY))

### State management

Only **useState** is not enough to cover state management needs. Therefore, **useReducer** was used as a more sophisticated tool for the current needs. Even more complex state managers such as [Effector](https://effector.dev/), [Jotai](https://jotai.org/), [Zustand](https://zustand-demo.pmnd.rs/) were not used due to the assignment origin.
