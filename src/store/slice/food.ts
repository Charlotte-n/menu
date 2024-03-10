import { createSlice } from '@reduxjs/toolkit'
import { FoodCommentListData } from '../../apis/types/food'

interface initialStateType {
    comment: FoodCommentListData
    parentId: number
}
const initialState: initialStateType = {
    comment: [] as FoodCommentListData,
    parentId: 0,
}
const FoodSlice = createSlice({
    name: 'FoodSlice',
    initialState,
    reducers: {
        changeCommentAction(state, { payload }) {
            state.comment = payload
        },
        changeParentIdAction(state, { payload }) {
            state.parentId = payload
        },
    },
})

export const { changeCommentAction, changeParentIdAction } = FoodSlice.actions

export default FoodSlice.reducer
