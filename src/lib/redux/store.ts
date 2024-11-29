import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import  shoesReducer  from "./features/shoes/shoesSlice";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from './customStorage'
const persistConfig = {
  key: 'shoes',
  storage: storage,
  whitelist: ['cart', 'userInfo', 'favorites', 'populatedCart']
}
 
const persistedReducer = persistReducer(persistConfig, shoesReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
      // other middleware...
    ,
  });

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
