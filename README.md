# RN-Chat

A React Native chat application with Firebase integrations and supporting account, contact, and device-feature screens.

[Repository](https://github.com/MirzaAlbab/RN-Chat)

## Features

- Chat and contact screens
- Firebase authentication, database, messaging, and storage dependencies
- Google sign-in integration
- Map, QR-code, and biometric-related components

## Technology

`react` 17.0.2 · `react-native` 0.68.1 · `redux` ^4.2.0

## Getting started

Install Node.js and a React Native CLI development environment compatible with the version in `package.json`. Android requires a compatible JDK, Android SDK, and an emulator or connected device. iOS requires macOS, Xcode, and CocoaPods.

```bash
git clone https://github.com/MirzaAlbab/RN-Chat.git
cd RN-Chat
```

```bash
npm install
npm start
```

In another terminal, build Android:

```bash
npm run android
```

For iOS, install the pods under `ios/` first, then run `npm run ios`. If the project integrates Firebase, supply your own platform configuration and enable the authentication providers used by the app.

## Development and checks

```bash
npm test
npm run lint
```

## Project structure

- `__tests__/` — JavaScript test files
- `android/` — Android native project
- `ios/` — iOS native project
- `src/` — Application source

## Project notes

Use your own Firebase project configuration and configure provider settings and native permissions for the features you enable. The project uses React Native 0.68.1.

## License

No root `LICENSE` file was present in the reviewed repository. Consult the repository owner about reuse; dependencies and third-party assets retain their own terms.
