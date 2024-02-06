import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import theme from '../../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const FoodContent: FC<IProps> = () => {
    const Item = () => {
        return (
            <View
                className="flex-row pl-[20] pr-[20] pt-[25] pb-[25] border-b"
                style={{
                    borderColor: theme.colors.secondary,
                }}
            >
                <Text className="flex-1">米饭</Text>
                <Text>116.00kcal/100g</Text>
            </View>
        )
    }
    return (
        <View
            className="bg-white"
            style={{
                borderRadius: 10,
            }}
        >
            <ScrollView scroll-y showsVerticalScrollIndicator={false}>
                {new Array(20).fill(0).map((item, index) => (
                    <Item key={item + index}></Item>
                ))}
            </ScrollView>
        </View>
    )
}

export default memo(FoodContent)
