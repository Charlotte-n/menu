import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
import AutoText from '../../../../../components/auto-text'
import { useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import { BodyData, BodyTargetData, targetData } from '../../../../../data/mine'
import WheelPicker from 'react-native-wheely'

interface IProps {
    children?: ReactNode
    target: string
    setTarget: any
    height?: number
    fontSize?: number
}

const HealthTarget: FC<IProps> = ({ height, fontSize, target, setTarget }) => {
    const [isShow, setIsShow] = useState(false)
    const { healthTarget } = useAppSelector((state) => {
        return {
            healthTarget: state.LoginRegisterSlice.healthTarget,
        }
    }, shallowEqual)
    //进行联动
    const selected = useRef(healthTarget)

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
                    {selected.current
                        ? targetData[Number(selected.current)]
                        : target
                          ? target
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
                        selected.current = String(index)
                        setTarget(selected.current)
                    }}
                />
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HealthTarget)
