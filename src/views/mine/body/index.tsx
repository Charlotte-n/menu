import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions } from 'react-native'
import { ScrollView } from 'nativewind/dist/preflight'
import { Button } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import BodyContent from './component/content'
import { getUserInfo } from '../../../apis/mine'
import { useAppDispatch, useAppSelector } from '../../../store'
import { changeUserInfoAction } from '../../../store/slice/login-register-slice'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const Body: FC<IProps> = () => {
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { id } = userInfo
    //获取用户信息
    const dispatch = useAppDispatch()
    const childrenRef = useRef<any>()
    const getUserInfoApi = async () => {
        const res = await getUserInfo(id)
        dispatch(changeUserInfoAction(res.data.user))
    }
    //触发更新用户资料
    const updateUserProfile = () => {
        childrenRef.current.updateProfile()
    }
    useEffect(() => {
        getUserInfoApi().then((res) => {})
    }, [])
    return (
        <ScrollView
            className=" bg-white pl-[30] pr-[30]"
            style={{ height: Dimensions.get('screen').height - 115 }}
        >
            <BodyContent ref={childrenRef}></BodyContent>
            <Button
                title="确认提交"
                color={theme.colors.deep01Primary}
                containerStyle={{
                    borderRadius: 32,
                    marginTop: 40,
                }}
                onPress={() => updateUserProfile()}
            ></Button>
        </ScrollView>
    )
}

export default memo(Body)
