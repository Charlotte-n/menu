import { FoodCommentListData } from '../../apis/types/food'
import { createSlice } from '@reduxjs/toolkit'

interface initialStateType {
    comment: FoodCommentListData
    parentId: number
}
const initialState: initialStateType = {
    comment: [] as FoodCommentListData,
    parentId: 0,
}
const FoodCommunicateSlice = createSlice({
    name: 'foodCommunicateSlice',
    initialState,
    reducers: {
        changeFoodCommunicateComment(state, { payload }) {
            state.comment = payload
        },
    },
})

export const { changeFoodCommunicateComment } = FoodCommunicateSlice.actions

export default FoodCommunicateSlice.reducer
