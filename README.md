# Paidy Secure Todo App

A secure to-do list application built with React Native and Expo. This app uses biometric authentication (such as Face ID or fingerprint) to protect your tasks and ensure only you can access your to-do list.

## Features
- Secure login with biometric authentication
- Add, view, and manage your tasks
- Simple and clean user interface

## Getting Started

### Prerequisites
- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd paidy-secure-todo-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Expo Local Authentication:
   ```sh
   npx expo install expo-local-authentication
   ```

### Running the App
Start the development server:
```sh
npx expo start --tunnel
```
Scan the QR code with your Expo Go app or run on an emulator.

## Project Structure
- `App.js` - Entry point
- `src/components/` - Reusable components
- `src/screens/` - App screens (authentication, todo list)
- `assets/` - Images and static assets

## License
MIT
