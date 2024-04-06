import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
import { useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import { targetData } from '../../../../../data/mine'
import WheelPicker from 'react-native-wheely'

interface IProps {
    children?: ReactNode
    target: number
    setTarget: any
    height?: number
    fontSize?: number
}

const HealthTarget: FC<IProps> = ({ height, fontSize, target, setTarget }) => {
    const [isShow, setIsShow] = useState(false)
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //进行联动
    const selected = useRef(userInfo.target)
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
                健康目标
            </Text>
            <View className="flex-row items-center">
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {selected.current != null &&
                    (selected.current as number) >= 0
                        ? targetData[Number(selected.current)]
                        : target
                          ? targetData[Number(selected.current)]
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
                    <Dialog.Title title={'健康目标'}></Dialog.Title>
                    <TouchableOpacity
                        onPress={() => {
                            if (!selected.current) {
                                setTarget(0)
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
                    options={targetData}
                    onChange={(index) => {
                        selected.current = index
                        setTarget(selected.current)
                    }}
                />
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HealthTarget)
