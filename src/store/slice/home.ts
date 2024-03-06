import { createSlice } from '@reduxjs/toolkit'
import { ResponseDailyIntake } from '../../apis/types/home'
interface initialState {
    open: boolean
    dailyIntake: ResponseDailyIntake
    dailyIntaked: ResponseDailyIntake
}
const initialState: initialState = {
    open: false,
    dailyIntake: {} as ResponseDailyIntake,
    dailyIntaked: {} as ResponseDailyIntake,
}
const HomeSlice = createSlice({
    name: 'HomeSlice',
    initialState,
    reducers: {
        changeOpenAction(state, { payload }) {
            state.open = payload
        },
        changeDailyIntake(state, { payload }) {
            state.dailyIntake = payload
        },
        changeDailyIntaked(state, { payload }) {
            state.dailyIntaked = payload
        },
    },
})

export const { changeOpenAction, changeDailyIntake, changeDailyIntaked } =
    HomeSlice.actions

export default HomeSlice.reducer
