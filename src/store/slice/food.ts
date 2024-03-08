import { createSlice } from '@reduxjs/toolkit'

interface initialStateType {
    comment: []
}
const initialState: initialStateType = {
    comment: [],
}
const FoodSlice = createSlice({
    name: 'FoodSlice',
    initialState,
    reducers: {
        changeCommentAction(state, { payload }) {
            state.comment = payload
        },
    },
})

export const { changeCommentAction } = FoodSlice.actions

export default FoodSlice.reducer
