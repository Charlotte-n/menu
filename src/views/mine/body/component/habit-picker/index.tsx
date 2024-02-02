import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
interface IProps {
    children?: ReactNode
    habit: any
    setHabit: any
}

const HabitPicker: FC<IProps> = ({ habit, setHabit }) => {
    const [isShow, setIsShow] = useState(false)
    //进行联动
    const selected = useRef(habit)

    return (
        <TouchableOpacity
            className="flex-row items-center border-[#F1F3F4] border-b"
            onPress={() => setIsShow(true)}
            style={{
                height: 59,
            }}
        >
            <Text
                className="flex-1"
                style={{ fontSize: 15, fontWeight: '300' }}
            >
                运动习惯
            </Text>
            <View className="flex-row items-center">
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {selected.current ? selected.current : habit ? habit : ''}
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
                <Dialog.Title title={'运动习惯'}></Dialog.Title>
                <TouchableOpacity
                    onPress={() => {
                        setIsShow(false)
                        selected.current = '久坐不动'
                        setHabit(selected.current)
                    }}
                >
                    <View>
                        <Text
                            style={{
                                height: 40,
                                fontSize: 16,
                            }}
                        >
                            久坐不动
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIsShow(false)
                        selected.current = '喜欢健身'
                        setHabit(selected.current)
                    }}
                >
                    <Text
                        style={{
                            height: 40,
                            fontSize: 16,
                        }}
                    >
                        喜欢健身
                    </Text>
                </TouchableOpacity>
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HabitPicker)
