import { configureStore } from "@reduxjs/toolkit";
const createSagaMiddleware = require("redux-saga").default;
import { cardsReducer } from "./reducers";
import { rootSaga } from "./sagas";
import storage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

// Redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cards"], // Only persist the cards reducer
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, cardsReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cards: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
