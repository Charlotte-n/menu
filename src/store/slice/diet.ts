import { createSlice } from '@reduxjs/toolkit'
import { RecognizeFood } from '../../apis/types/diet'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../apis/types/food'
interface initialState {
    RecognizeFoodInfo: RecognizeFood[]
    url: string
    isCapture: boolean
    //食物
    breakFastFoodList: SingleFoodListType[]
    lunchFastFoodList: SingleFoodListType[]
    dinnerFastFoodList: SingleFoodListType[]
    fruitFoodList: SingleFoodListType[]
    otherFoodList: SingleFoodListType[]
}
const initialState: initialState = {
    RecognizeFoodInfo: [] as RecognizeFood[],
    url: '',
    isCapture: false,
    //食物
    breakFastFoodList: [] as SingleFoodListType[],
    lunchFastFoodList: [] as SingleFoodListType[],
    dinnerFastFoodList: [] as SingleFoodListType[],
    fruitFoodList: [] as SingleFoodListType[],
    otherFoodList: [] as SingleFoodListType[],
}

const DietSlice = createSlice({
    name: 'DietSlice',
    initialState,
    reducers: {
        changeRecognizeFoodInfoAction(state, { payload }) {
            state.RecognizeFoodInfo = payload
        },
        changeUrl(state, { payload }) {
            state.url = payload
        },
        changeIsCapture(state, { payload }) {
            state.isCapture = payload
        },
        changeFoodList(
            state,
            {
                payload,
            }: { payload: { index: number; foods: SingleFoodListType[] } },
        ) {
            const { index, foods } = payload
            switch (index) {
                case 1:
                    state.breakFastFoodList = [...new Set(foods)]
                    break
                case 2:
                    state.lunchFastFoodList = [...new Set(foods)]
                    break
                case 4:
                    state.dinnerFastFoodList = [...new Set(foods)]
                    break
                case 5:
                    state.fruitFoodList = [...new Set(foods)]
                    break
                case 10:
                    state.otherFoodList = [...new Set(foods)]
                    break
            }
        },
    },
})

export const {
    changeRecognizeFoodInfoAction,
    changeUrl,
    changeIsCapture,
    changeFoodList,
} = DietSlice.actions

export default DietSlice.reducer
