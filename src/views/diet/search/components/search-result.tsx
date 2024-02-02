import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'
import theme from '../../../../styles/theme/color'
import { Icon } from '@rneui/themed'

interface IProps {
    children?: ReactNode
}

const SearchResult: FC<IProps> = () => {
    return (
        <View>
            <Text className="mb-[10]">食物</Text>
            <View
                className="flex-row justify-between items-center border rounded pt-[10] pb-[10] pl-[5] pr-[5]"
                style={{ borderColor: theme.colors.primary }}
            >
                <View>
                    <Text>米饭</Text>
                    <Text style={{ fontSize: 12 }}>116.00Kcal/100g</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="pl-[10] pr-[10]">100g</Text>
                    <Icon
                        type={'antdesign'}
                        name={'pluscircle'}
                        size={15}
                        color={theme.colors.deep01Primary}
                    ></Icon>
                </View>
            </View>
        </View>
    )
}

export default memo(SearchResult)
