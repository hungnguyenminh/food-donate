import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from '@/redux/slices/userSlice';
import createWebStorage from 'redux-persist/es/storage/createWebStorage'; // Import reducer user

const createNoopStorage = (): {
  getItem: (_key: string) => Promise<null>;
  setItem: (_key: string, value: unknown) => Promise<unknown>;
  removeItem: (_key: string) => Promise<void>;
} => {
  return {
    getItem(_key): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key, value): Promise<unknown> {
      return Promise.resolve(value);
    },
    removeItem(_key): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  user: userReducer, // Kết hợp reducer user vào rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// khai báo persistedReducer làm reducer chính, kết hợp cả quản lí state và lưu trữ
const store = configureStore({
  reducer: persistedReducer,
});

// quản lý hành vi lưu trữ, chẳng hạn như lưu trữ trạng thái thủ công hoặc tải lại trạng thái từ bộ nhớ.
export const persistor = persistStore(store);

export default store;
