import react from 'react';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { MainScreen } from "@screens/MainScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </GestureHandlerRootView>
  );
}
