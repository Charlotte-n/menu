import { createSlice } from '@reduxjs/toolkit'
import { SingleDish } from '../../apis/types/food'

interface InterfaceType {
    mealList: SingleDish[]
}

const initialState: InterfaceType = {
    mealList: [] as SingleDish[],
}

const MealSlice = createSlice({
    name: 'mealStore',
    initialState,
    reducers: {
        changeMealListAction(state, { payload }) {
            state.mealList = [...new Set(payload)] as SingleDish[]
        },
    },
})

export const { changeMealListAction } = MealSlice.actions

export default MealSlice.reducer
