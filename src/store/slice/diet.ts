import { createSlice } from '@reduxjs/toolkit'
import { RecognizeFood } from '../../apis/types/diet'
interface initialState {
    RecognizeFoodInfo: RecognizeFood[]
    url: string
    isCapture: boolean
}
const initialState: initialState = {
    RecognizeFoodInfo: [] as RecognizeFood[],
    url: '',
    isCapture: false,
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
    },
})

export const { changeRecognizeFoodInfoAction, changeUrl, changeIsCapture } =
    DietSlice.actions

export default DietSlice.reducer
