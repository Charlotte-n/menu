import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@rneui/themed'
import theme from '../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const IntakeItem: FC<IProps> = () => {
    return (
        <View
            className="flex-row justify-between items-center border rounded pt-[10] pb-[10] pl-[5] pr-[5]"
            style={{ borderColor: theme.colors.primary }}
        >
            <View>
                <Text>米饭</Text>
                <Text style={{ fontSize: 12 }}>116.00Kcal/100g</Text>
            </View>
            <View className="flex-row items-center">
                <Icon
                    type={'antdesign'}
                    name={'minuscircle'}
                    size={15}
                    color={theme.colors.deep01Primary}
                ></Icon>

                <Text className="pl-[10] pr-[10]">100g</Text>
                <Icon
                    type={'antdesign'}
                    name={'pluscircle'}
                    size={15}
                    color={theme.colors.deep01Primary}
                ></Icon>
            </View>
        </View>
    )
}

export default memo(IntakeItem)
