import { createSlice } from '@reduxjs/toolkit'
import { RecognizeFood } from '../../apis/types/diet'
interface initialState {
    RecognizeFoodInfo: RecognizeFood[]
}
const initialState: initialState = {
    RecognizeFoodInfo: [] as RecognizeFood[],
}

const DietSlice = createSlice({
    name: 'DietSlice',
    initialState,
    reducers: {
        changeRecognizeFoodInfoAction(state, { payload }) {
            state.RecognizeFoodInfo = payload
        },
    },
})

export const { changeRecognizeFoodInfoAction } = DietSlice.actions

export default DietSlice.reducer
