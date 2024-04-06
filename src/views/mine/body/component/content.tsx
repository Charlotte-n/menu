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
import HealthTarget from './health-target'

const BodyContent = (props: any, ref: any) => {
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { id } = userInfo
    const dispatch = useAppDispatch()
    const { height, weight, birth, sex } = userInfo
    const [Sex, setSex] = useState(() => userInfo.sex)
    const [Birth, setBirth] = useState('')
    const [Height, setHeight] = useState(() => userInfo.height)
    const [Weight, setWeight] = useState(() => userInfo.weight)
    const [Habit, setHabit] = useState(() => userInfo.exercise)
    const [target, setTarget] = useState(() => userInfo.target)
    //获取到填写的数据
    const updateProfile = async () => {
        const param = {
            sex: Number(Sex),
            birth: Birth,
            height: Number(Height),
            weight: Number(Weight),
            userid: id,
            exercise: Habit,
            target: Number(target),
            gym: 0,
        }
        try {
            const res = await getIntakeDailyApi(param)
            console.log(res, '用户信息')
            //获取用户信息
            if (res.code === 1) {
                Alert.alert('更新成功')
                const userInfo = await getUserInfo(id)
                console.log(userInfo.data.user)
                dispatch(changeUserInfoAction(userInfo.data.user))
            }
        } catch (e) {
            console.log(e, '更新出错了')
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
            <HabitPicker
                habit={Habit as number}
                setHabit={setHabit}
            ></HabitPicker>
            <HealthTarget
                target={target as number}
                setTarget={setTarget}
                height={60}
                fontSize={14}
            ></HealthTarget>
        </View>
    )
}

export default forwardRef(BodyContent)
