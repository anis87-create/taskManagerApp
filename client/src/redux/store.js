import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage or AsyncStorage (for React Native)
import { persistStore } from 'redux-persist';
import userReducer from './userSlice'; // Your slice

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,  // Wrapping your userReducer with persistReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
