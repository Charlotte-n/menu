import { createSlice } from '@reduxjs/toolkit'
interface initialState {
    open: boolean
}
const initialState: initialState = {
    open: false,
}
const HomeSlice = createSlice({
    name: 'HomeSlice',
    initialState,
    reducers: {
        changeOpenAction(state, { payload }) {
            state.open = payload
        },
    },
})

export const { changeOpenAction } = HomeSlice.actions

export default HomeSlice.reducer
