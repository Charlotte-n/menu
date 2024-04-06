import React, { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { Alert, View } from 'react-native'
import SexPicker from '../../mine/body/component/sex-picker'
import DatePicker from '../../mine/body/component/date-picker'
import HighPicker from '../../mine/body/component/high-picker'
import HabitPicker from '../../mine/body/component/habit-picker'
import { useAppDispatch, useAppSelector } from '../../../store'
import { shallowEqual } from 'react-redux'
import HealthTarget from '../../mine/body/component/health-target'
import { getIntakeDailyApi } from '../../../apis/home'
import { changeDailyIntake } from '../../../store/slice/home'
import { Button } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import { getUserInfo } from '../../../apis/mine'
import { changeUserInfoAction } from '../../../store/slice/login-register-slice'

interface IProps {
    children?: any
}

const DialogContent: FC<IProps> = ({ children }) => {
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const dispatch = useAppDispatch()
    const { cancel } = children
    const [sex, setSex] = useState('')
    const [birth, setBirth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [habit, setHabit] = useState('')
    const [target, setTarget] = useState('')
    //收集信息就可以了
    const getDailyIntake = async () => {
        const param = {
            sex: String(sex),
            birth: birth,
            height: String(height),
            weight: String(weight),
            userid: userInfo.id,
            exercise: Number(habit),
            target: String(target),
            gym: 0,
        }
        console.log(param)
        try {
            const res = await getIntakeDailyApi(param)
            //更新用户的信息
            if (res.code === 1) {
                dispatch(changeDailyIntake(res.data))
                //重新获取用户信息
                getUserInfo(userInfo.id).then((res) => {
                    dispatch(
                        changeUserInfoAction((res.data as { user: any }).user),
                    )
                })
                cancel()
            } else {
                //填写
                Alert.alert('所有的项目都要填写')
            }
        } catch (e) {
            console.log('获取每日饮食', e)
        }
    }

    return (
        <View>
            <SexPicker
                sex={sex as any}
                setSex={setSex}
                height={40}
                fontSize={14}
            ></SexPicker>
            <DatePicker
                birth={birth}
                setBirth={setBirth}
                height={40}
                fontSize={14}
            ></DatePicker>
            <HighPicker
                title={'身高'}
                modelTitle={'修改身高'}
                inputContent={'填写身高'}
                content={height}
                setValue={setHeight}
                height={40}
                fontSize={14}
            ></HighPicker>
            <HighPicker
                title={'体重'}
                modelTitle={'修改体重'}
                inputContent={'填写体重'}
                content={weight}
                setValue={setWeight}
                height={40}
                fontSize={14}
            ></HighPicker>
            <HabitPicker
                habit={habit}
                setHabit={setHabit}
                height={40}
                fontSize={14}
            ></HabitPicker>
            <HealthTarget
                target={Number(target)}
                setTarget={setTarget}
                height={40}
                fontSize={14}
            ></HealthTarget>
            <Button
                title={'确定'}
                buttonStyle={{
                    backgroundColor: theme.colors.deep01Primary,
                    marginTop: 20,
                }}
                onPress={() => getDailyIntake()}
            ></Button>
        </View>
    )
}
export default memo(DialogContent)
