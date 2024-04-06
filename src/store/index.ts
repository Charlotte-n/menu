import { configureStore } from '@reduxjs/toolkit'
import LoginRegisterSlice from './slice/login-register-slice'
import DietSlice from './slice/diet'
import HomeSlice from './slice/home'
import FoodSlice from './slice/food'
import MealSlice from './slice/meal'
import CommonSlice from './slice/common'
import FoodCommunicateSlice from './slice/food-communicate'
import GroupSlice from './slice/group'
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
import { useImperativeHandle } from 'react'

const persistConfig = {
    key: 'userInfo',
    storage: AsyncStorage,
}
const persistHomeConfig = {
    key: 'homeData',
    storage: AsyncStorage,
}
const persistFoodConfig = {
    key: 'foodData',
    storage: AsyncStorage,
}
const persistDietConfig = {
    key: 'DietData',
    storage: AsyncStorage,
}
const persistMealConfig = {
    key: 'MealData',
    storage: AsyncStorage,
}
const persistFoodCommunicateConfig = {
    key: 'FoodCommunicateData',
    storage: AsyncStorage,
}
const persistGroupConfig = {
    key: 'GroupData',
    storage: AsyncStorage,
    blacklist: ['currentTime'],
}

const LoginStorePersist = persistReducer(persistConfig, LoginRegisterSlice)
const HomeStorePersist = persistReducer(persistHomeConfig, HomeSlice)
const FoodStorePersist = persistReducer(persistFoodConfig, FoodSlice)
const DietStorePersist = persistReducer(persistDietConfig, DietSlice)
const FoodCommunicatePersist = persistReducer(
    persistFoodCommunicateConfig,
    FoodCommunicateSlice,
)
const GroupStorePersist = persistReducer(persistGroupConfig, GroupSlice)
const store = configureStore({
    reducer: {
        LoginRegisterSlice: LoginStorePersist,
        DietSlice: DietStorePersist,
        HomeSlice: HomeStorePersist,
        FoodSlice: FoodStorePersist,
        MealSlice: MealSlice,
        CommonSlice: CommonSlice,
        FoodCommunicateSlice: FoodCommunicateSlice,
        GroupSlice: GroupStorePersist,
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
