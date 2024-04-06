import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
import AutoText from '../../../../../components/auto-text'
import WheelPicker from 'react-native-wheely'
import { foodTime } from '../../../../../data/diet'
import { BodyData } from '../../../../../data/mine'
import { useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
interface IProps {
    children?: ReactNode
    habit: any
    setHabit: any
    height?: number
    fontSize?: number
}

const HabitPicker: FC<IProps> = ({ habit, setHabit, height, fontSize }) => {
    const [isShow, setIsShow] = useState(false)
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //进行联动
    const selected = useRef(userInfo.exercise)
    return (
        <TouchableOpacity
            className="flex-row items-center border-[#F1F3F4] border-b"
            onPress={() => {
                setIsShow(true)
            }}
            style={{
                height: height ? height : 59,
            }}
        >
            <Text
                className="flex-1"
                style={{
                    fontSize: fontSize ? fontSize : 15,
                    fontWeight: '300',
                }}
            >
                运动习惯
            </Text>
            <View className="flex-row items-center">
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {selected.current >= 0
                        ? BodyData[selected.current]
                        : Number(habit) >= 0
                          ? BodyData[selected.current]
                          : ''}
                </Text>
                <Icon
                    type={'antdesign'}
                    name={'caretdown'}
                    size={10}
                    color={'#666666'}
                    style={{
                        marginLeft: 10,
                        marginRight: 15,
                    }}
                ></Icon>
            </View>
            <Dialog isVisible={isShow}>
                <View className="flex-row justify-between">
                    <Dialog.Title title={'运动习惯'}></Dialog.Title>
                    <TouchableOpacity
                        onPress={() => {
                            if (!selected.current) {
                                setHabit(0)
                                selected.current = 0
                            }
                            setIsShow(false)
                        }}
                    >
                        <Icon type="antdesign" name={'close'}></Icon>
                    </TouchableOpacity>
                </View>

                <WheelPicker
                    selectedIndex={Number(selected.current)}
                    options={BodyData}
                    onChange={(index) => {
                        selected.current = index
                        setHabit(selected.current)
                    }}
                />
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HabitPicker)
