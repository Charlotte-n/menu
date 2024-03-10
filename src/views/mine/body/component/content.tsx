import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react'
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
import HealthTarget from './health-target'

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
    const [target, setTarget] = useState('')

    //获取到填写的数据
    const updateProfile = async () => {
        const param = {
            sex: String(Sex),
            birth: Birth,
            height: String(Height),
            weight: String(Weight),
            userid: id,
            target: String(Habit),
            gym: '0',
            exercise: Number(target),
        }
        const res = await getIntakeDailyApi(param)
        //获取用户信息
        if (res.code === 1) {
            Alert.alert('更新成功')
            //获取用户信息
            const userInfo = await getUserInfo(id)
            console.log(userInfo)
            //放到profile中
            dispatch(changeUserInfoAction(userInfo.data.user))
        }
    }
    //传递给父组件的方法
    useImperativeHandle(ref, () => {
        return {
            updateProfile,
        }
    })
    useEffect(() => {
        getUserInfo(id).then((res) => {
            console.log('获取用户信息成功')
        })
    }, [])
    return (
        <View>
            <SexPicker sex={sex} setSex={setSex}></SexPicker>
            <DatePicker birth={birth} setBirth={setBirth}></DatePicker>
            <HighPicker
                title={'身高'}
                modelTitle={'修改身高'}
                inputContent={'填写身高,例如160'}
                content={height}
                setValue={setHeight}
            ></HighPicker>
            <HighPicker
                title={'体重'}
                modelTitle={'修改体重'}
                inputContent={'填写体重,例如60'}
                content={weight}
                setValue={setWeight}
            ></HighPicker>
            <HabitPicker habit={habit} setHabit={setHabit}></HabitPicker>
            <HealthTarget
                target={target}
                setTarget={setTarget}
                height={60}
                fontSize={14}
            ></HealthTarget>
        </View>
    )
}

export default forwardRef(BodyContent)
