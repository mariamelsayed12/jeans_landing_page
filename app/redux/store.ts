import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./feature/CartSlice";
import { useDispatch } from "react-redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


// ...

const persistCartConfig = {
    key: "Cart",
    storage,
};



const persistedCart=persistReducer(persistCartConfig,cartSlice)


export const store = configureStore({
    //root reducer
    reducer: {
        Cart:persistedCart,    
    },
    middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }),
})

export const persister=persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store
