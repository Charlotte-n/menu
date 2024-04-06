import { createSlice } from '@reduxjs/toolkit'
import { groupClassificationType, GroupInfoType } from '../../apis/types/group'

interface initialStateType {
    showCreate: boolean
    threeGroup: GroupInfoType[]
    groupClassification: groupClassificationType
    isInner: boolean
    groupTitle: string
    currentTime: string
}

const initialState: initialStateType = {
    showCreate: false,
    threeGroup: [] as GroupInfoType[],
    groupClassification: [] as groupClassificationType,
    isInner: false,
    groupTitle: '',
    currentTime: '',
}
const GroupSlice = createSlice({
    name: 'GroupSlice',
    initialState,
    reducers: {
        changeShowCreateAction(state, { payload }) {
            state.showCreate = payload
        },
        changeThreeGroupAction(state, { payload }) {
            state.threeGroup = payload
        },
        changeGroupClassificationAction(state, { payload }) {
            state.groupClassification = payload
        },
        changeIsInnerAction(state, { payload }) {
            state.isInner = payload
        },
        changeGroupTitleAction(state, { payload }) {
            state.groupTitle = payload
        },
        changeCurrentTimeAction(state, { payload }) {
            state.currentTime = payload
        },
    },
})
export const {
    changeShowCreateAction,
    changeThreeGroupAction,
    changeGroupClassificationAction,
    changeIsInnerAction,
    changeGroupTitleAction,
    changeCurrentTimeAction,
} = GroupSlice.actions
export default GroupSlice.reducer
