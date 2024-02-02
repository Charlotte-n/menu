import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import theme from '../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const Total: FC<IProps> = () => {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <View>
            <View className="flex-row items-center">
                <Text>合计:</Text>
                <Text
                    className="ml-[10]"
                    style={{ fontSize: 18, color: theme.colors.deep01Primary }}
                >
                    455kcal
                </Text>
            </View>
            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setIsVisible(!isVisible)}
            >
                <Text style={{ fontWeight: '800' }}>查看营养分析</Text>
                {isVisible ? (
                    <Icon type={'antdesign'} name={'down'} size={15}></Icon>
                ) : (
                    <Icon type={'antdesign'} name={'right'} size={15}></Icon>
                )}
            </TouchableOpacity>
            {isVisible && (
                <View className="mt-[13]">
                    <Text>碳水化合物: 3.00g</Text>
                    <Text>脂肪: 3.00g</Text>
                    <Text>蛋白质: 3.00g</Text>
                </View>
            )}
        </View>
    )
}

export default memo(Total)
