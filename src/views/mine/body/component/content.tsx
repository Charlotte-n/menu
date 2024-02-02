import React, { forwardRef, useImperativeHandle, useState } from 'react'
import type { ReactNode } from 'react'
import { Alert, View } from 'react-native'
import SexPicker from './sex-picker'
import DatePicker from './date-picker'
import HighPicker from './high-picker'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'
import HabitPicker from './habit-picker'
import { getUserInfo, updateUserProfile } from '../../../../apis/mine'
import { changeUserProfileAction } from '../../../../store/slice/login-register-slice'

const BodyContent = (props: any, ref: any) => {
    const { profile, userInfo } = useAppSelector((state) => {
        return {
            profile: state.LoginRegisterSlice.profile,
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { id } = userInfo
    const dispatch = useAppDispatch()
    const { height, weight, birth, sex, habit } = profile
    const [Sex, setSex] = useState('')
    const [Birth, setBirth] = useState('')
    const [Height, setHeight] = useState('')
    const [Weight, setWeight] = useState('')
    const [Habit, setHabit] = useState('')
    //获取到填写的数据
    const updateProfile = async () => {
        const param = {
            sex: Number(Sex),
            birth: Birth,
            height: Height,
            weight: Weight,
            habit: Habit,
            id,
        }
        const res = await updateUserProfile(param)
        if (res.code === 1) {
            Alert.alert('更新成功')
            //获取用户信息
            const userInfo = await getUserInfo(id)
            //放到profile中
            dispatch(changeUserProfileAction(userInfo.data))
        }
    }
    //传递给父组件的方法
    useImperativeHandle(ref, () => {
        return {
            updateProfile,
        }
    })
    return (
        <View>
            <SexPicker sex={sex} setSex={setSex}></SexPicker>
            <DatePicker birth={birth} setBirth={setBirth}></DatePicker>
            <HighPicker
                title={'身高'}
                modelTitle={'修改身高'}
                inputContent={'填写身高'}
                content={height}
                setValue={setHeight}
            ></HighPicker>
            <HighPicker
                title={'体重'}
                modelTitle={'修改体重'}
                inputContent={'填写体重'}
                content={weight}
                setValue={setWeight}
            ></HighPicker>
            <HabitPicker habit={habit} setHabit={setHabit}></HabitPicker>
        </View>
    )
}

export default forwardRef(BodyContent)
