# Aspire Mobile App - Code Challenge

A React Native mobile application inspired by the Aspire banking app, featuring card management functionality with Redux Saga for state management.

## Features

- **Card Management**: View, add, and manage debit cards
- **Card Operations**: Freeze/unfreeze cards with visual feedback
- **Responsive Design**: Optimized for both iOS and Android
- **Redux Saga**: Async state management for API operations
- **TypeScript**: Fully typed for better development experience
- **Mock API**: Simulated backend operations with realistic delays

## Screenshots

The app includes:
- Modern dark theme UI matching banking app standards
- Card carousel with smooth scrolling
- Interactive freeze/unfreeze functionality
- Modal for adding new cards
- Loading states and error handling

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aspire-mobile-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally (if not already installed)**
   ```bash
   npm install -g @expo/cli
   ```

## Running the Application

### Development Mode
```bash
npm start
# or
yarn start
```

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

### Web (for testing)
```bash
npm run web
# or
yarn web
```

## Project Structure

```
src/
├── api/
│   └── mockApi.ts              # Mock API implementation
├── components/
│   ├── AddCardModal.tsx        # Modal for adding new cards
│   ├── CardCarousel.tsx        # Horizontal scrollable card carousel
│   ├── CardComponent.tsx       # Individual card component
│   ├── SnapCarousel.tsx        # Carousel utility component
│   ├── CardOptionItem.tsx      # Card option item component
│   └── CardOptions.tsx         # Card options list component
├── hooks/
│   └── useMainScreen.ts        # Custom hook for main screen logic
├── redux/
│   ├── actions.ts              # Redux actions
│   ├── reducers.ts             # Redux reducers
│   ├── sagas.ts                # Redux sagas for async operations
│   └── store.ts                # Redux store configuration
├── screens/
│   └── MainScreen.tsx          # Main application screen
├── typings/
│   └── index.ts                # TypeScript type definitions
└── utils/
    └── cardUtils.ts            # Utility functions for card operations
```

## Mock API Endpoints

The application uses a mock API that simulates the following operations:

- `fetchCards()`: Retrieves all cards
- `addCard(name: string)`: Creates a new card with generated details
- `toggleCardFreeze(cardId: string, currentStatus: boolean)`: Toggles card freeze status

## Key Features Implementation

### 1. Card Display
- Horizontal scrollable carousel
- Pixel-perfect design with shadows and gradients
- Visual differentiation for frozen cards (semi-transparent overlay)

### 2. Add Card Functionality
- Modal with form validation
- Auto-generated card numbers and expiration dates
- Error handling and loading states

### 3. Freeze/Unfreeze Cards
- Toggle button with visual feedback
- Animated state changes
- Persistent state management

### 4. Redux Saga Integration
- Async API calls with proper error handling
- Loading states for better UX
- Centralized state management

## Technical Implementation

### State Management
- **Redux Toolkit** for efficient Redux usage
- **Redux Saga** for handling async operations
- **TypeScript** for type safety

### Performance Optimizations
- Efficient rendering with React.memo where appropriate
- Optimized list rendering for card carousel
- Proper cleanup of side effects

### Cross-Platform Compatibility
- Tested on both iOS and Android
- Responsive design for different screen sizes
- Platform-specific adaptations where needed

## Data Storage

The application uses Redux for state management during the session. For persistence, you can extend the implementation to use:
- AsyncStorage for local persistence
- Real API integration when backend is available

## Testing

The codebase is structured for easy testing with:
- Modular components for unit testing
- Separated business logic in utilities
- Mock API for integration testing

To add tests, install testing dependencies:
```bash
npm install --save-dev @testing-library/react-native jest
```

## Future Enhancements

- Add real API integration
- Implement user authentication
- Add transaction history
- Include biometric authentication
- Add push notifications
- Implement offline support

## Dependencies

### Core Dependencies
- React Native (0.72.6)
- Redux Toolkit (^1.9.7)
- Redux Saga (^1.2.3)
- React Redux (^8.1.3)
- TypeScript (^5.1.3)

### UI Dependencies
- Expo Vector Icons
- React Native Reanimated
- React Native Safe Area Context

## Development Notes

- The app uses Expo for easier development and testing
- All components are fully typed with TypeScript
- Code follows React Native best practices
- Modular architecture for easy maintenance and scaling

## Support

For issues or questions, please check the following:
- Ensure all dependencies are installed correctly
- Verify React Native environment setup
- Check Expo CLI installation
- Ensure proper simulator/emulator setup

## License

This project is created for evaluation purposes as part of a coding challenge.