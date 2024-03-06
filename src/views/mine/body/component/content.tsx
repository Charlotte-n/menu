import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Alert, View } from 'react-native'
import SexPicker from './sex-picker'
import DatePicker from './date-picker'
import HighPicker from './high-picker'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'
import HabitPicker from './habit-picker'
import { getUserInfo } from '../../../../apis/mine'
import { changeUserInfoAction } from '../../../../store/slice/login-register-slice'
import { getIntakeDailyApi } from '../../../../apis/home'
import { GetDailyIntakeData } from '../../../../apis/types/home'

const BodyContent = (props: any, ref: any) => {
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { id } = userInfo
    const dispatch = useAppDispatch()
    const { height, weight, birth, sex, habit } = userInfo
    const [Sex, setSex] = useState(() => userInfo.sex)
    const [Birth, setBirth] = useState('')
    const [Height, setHeight] = useState(() => userInfo.height)
    const [Weight, setWeight] = useState(() => userInfo.weight)
    const [Habit, setHabit] = useState(() => userInfo.habit)
    //获取到填写的数据
    const updateProfile = async () => {
        const param: GetDailyIntakeData = {
            sex: String(Sex),
            birth: Birth,
            height: Height,
            weight: Weight,
            userid: id,
            target: Habit,
            gym: '0',
            exercise: '0',
        }
        const res = await getIntakeDailyApi(param)
        console.log(res)
        if (res.code === 1) {
            Alert.alert('更新成功')
            //获取用户信息
            const userInfo = await getUserInfo(id)
            //放到profile中
            dispatch(changeUserInfoAction(userInfo.data))
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
