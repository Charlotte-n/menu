import { createSlice } from '@reduxjs/toolkit'
import { ResponseDailyIntake } from '../../apis/types/home'
interface initialState {
    open: boolean
    dailyIntake: ResponseDailyIntake
}
const initialState: initialState = {
    open: false,
    dailyIntake: {} as ResponseDailyIntake,
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
    },
})

export const { changeOpenAction, changeDailyIntake } = HomeSlice.actions

export default HomeSlice.reducer
