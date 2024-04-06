import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import SearchGroup from './components/search-group'
import CategoryGroup from './components/category-group'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'
import { getClassGroupApi, getThreeGroupApi } from '../../../../apis/group'
import {
    changeGroupClassificationAction,
    changeThreeGroupAction,
} from '../../../../store/slice/group'

interface IProps {
    children?: ReactNode
}

const group: FC<IProps> = () => {
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const dispatch = useAppDispatch()
    const getThreeGroup = () => {
        getThreeGroupApi(userInfo.id).then((res) => {
            dispatch(changeThreeGroupAction(res.data))
        })
    }
    //小组分类
    const groupClassification = () => {
        getClassGroupApi().then((res) => {
            dispatch(changeGroupClassificationAction(res.data))
        })
    }
    useEffect(() => {
        getThreeGroup()
        groupClassification()
    }, [])
    return (
        <ScrollView className="" showsVerticalScrollIndicator={false}>
            {/*推荐小组*/}
            <View className="relative">
                <SearchGroup></SearchGroup>
            </View>
            {/*分类小组*/}
            <View className="mb-[10]">
                <CategoryGroup></CategoryGroup>
            </View>
        </ScrollView>
    )
}

export default memo(group)
