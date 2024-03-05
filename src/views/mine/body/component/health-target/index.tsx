import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
import AutoText from '../../../../../components/auto-text'

interface IProps {
    children?: ReactNode
    target: string
    setTarget: any
    height?: number
    fontSize?: number
}

const HealthTarget: FC<IProps> = ({ height, fontSize, target, setTarget }) => {
    const [isShow, setIsShow] = useState(false)
    //进行联动
    const selected = useRef(target)
    const BodyTargetData = [
        {
            key: '0',
            target: '减脂',
        },
        {
            key: '1',
            target: '温和减脂',
        },
        {
            key: '2',
            target: '保持体型',
        },
        {
            key: '3',
            target: '温和增肌',
        },
        {
            key: '4',
            target: '增肌',
        },
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
                健康目标
            </Text>
            <View className="flex-row items-center">
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {selected.current ? selected.current : target ? target : ''}
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
                <Dialog.Title title={'健康目标'}></Dialog.Title>
                {BodyTargetData.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => {
                                setIsShow(false)
                                selected.current = item.key
                                setTarget(selected.current)
                            }}
                        >
                            <View>
                                <AutoText
                                    style={{
                                        height: 40,
                                        fontSize: 16,
                                    }}
                                >
                                    {item.target}
                                </AutoText>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HealthTarget)
