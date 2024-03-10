import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../../apis/types/mine'

interface initialState {
    userInfo: User
    token: string
    profile: User
    healthTarget: string
}
const initialState: initialState = {
    userInfo: {
        username: 'xiaoming',
    } as User,
    token: '',
    profile: {} as User,
    healthTarget: '',
}

export const LoginRegisterSlice = createSlice({
    name: 'LoginRegister',
    initialState,
    reducers: {
        changeUserInfoAction(state, { payload }) {
            state.userInfo = payload
        },
        changeTokenAction(state, { payload }) {
            state.token = payload
        },
        clearUserInfoAction(state) {
            state.token = ''
            state.userInfo = {} as User
        },
        changeUserProfileAction(state, { payload }) {
            state.profile = payload
        },
        changeHealthTargetAction(state, { payload }) {
            state.healthTarget = payload
        },
    },
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
    changeUserInfoAction,
    changeTokenAction,
    clearUserInfoAction,
    changeUserProfileAction,
    changeHealthTargetAction,
} = LoginRegisterSlice.actions

export default LoginRegisterSlice.reducer
