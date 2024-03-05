import { configureStore } from '@reduxjs/toolkit'
import LoginRegisterSlice from './slice/login-register-slice'
import DietSlice from './slice/diet'
import HomeSlice from './slice/home'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist/es/constants'

const persistConfig = {
    key: 'userInfo',
    storage: AsyncStorage,
}
const persistHomeConfig = {
    key: 'homeData',
    storage: AsyncStorage,
}
const LoginStorePersist = persistReducer(persistConfig, LoginRegisterSlice)
const HomeStorePersist = persistReducer(persistHomeConfig, HomeSlice)
const store = configureStore({
    reducer: {
        LoginRegisterSlice: LoginStorePersist,
        DietSlice: DietSlice,
        HomeSlice: HomeStorePersist,
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
//给hook添加类型
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector
export type AppDispatch = typeof store.dispatch
//导出持久化存储的store和persistor
export default store
export const persistor = persistStore(store)
