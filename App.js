import react from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import { MainScreen } from "@screens/MainScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainScreen />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
