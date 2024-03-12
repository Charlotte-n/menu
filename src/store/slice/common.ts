import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navigateRef: null,
}
export const useCommonStore = createSlice({
    name: 'commonStore',
    initialState,
    reducers: {
        changeNavigateAction(state, { payload }) {
            state.navigateRef = payload
        },
    },
})

export const { changeNavigateAction } = useCommonStore.actions
export default useCommonStore.reducer
