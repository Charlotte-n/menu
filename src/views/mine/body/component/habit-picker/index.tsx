import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
import AutoText from '../../../../../components/auto-text'
import WheelPicker from 'react-native-wheely'
import { foodTime } from '../../../../../data/diet'
interface IProps {
    children?: ReactNode
    habit: any
    setHabit: any
    height?: number
    fontSize?: number
}

const HabitPicker: FC<IProps> = ({ habit, setHabit, height, fontSize }) => {
    const [isShow, setIsShow] = useState(false)
    //进行联动
    const selected = useRef(habit)
    const BodyData = [
        '久坐不动',
        '轻度活动',
        '中度活动',
        '重度活动',
        '非常重度活动',
    ]
    return (
        <TouchableOpacity
            className="flex-row items-center border-[#F1F3F4] border-b"
            onPress={() => setIsShow(true)}
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
                    {selected.current
                        ? BodyData[selected.current]
                        : habit >= 0
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
                            setIsShow(false)
                        }}
                    >
                        <Icon type="antdesign" name={'close'}></Icon>
                    </TouchableOpacity>
                </View>

                <WheelPicker
                    selectedIndex={selected.current}
                    options={BodyData}
                    onChange={(index) => {
                        selected.current = index
                    }}
                />
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HabitPicker)
