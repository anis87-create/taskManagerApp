import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage or AsyncStorage (for React Native)
import { persistStore } from 'redux-persist';
import userReducer from './userSlice'; // Your slice
import taskReducer from './taskSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
  reducer: {
    user: persistedUserReducer,  // Wrapping your userReducer with persistReducer
    task: taskReducer // Wrapping your taskReducer with persistReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
