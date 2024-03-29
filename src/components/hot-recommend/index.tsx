import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import theme from '../../styles/theme/color'
import HotRecommendItem from './hot-recommend-item'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../apis/types/food'
import { Skeleton } from '@rneui/base'
import { LinearGradient } from 'react-native-svg'

interface IProps {
    children?: ReactNode
    title: string
    data: SingleFoodListType[]
}

const Index: FC<IProps> = ({ title, data }) => {
    const navigation = useNavigation()
    return (
        <View>
            <View className="flex-row items-center mb-[10]">
                <Text
                    style={{
                        marginRight: 2,
                        width: 2,
                        height: 10,
                        borderWidth: 2,
                        borderColor: theme.colors.deep01Primary,
                        borderRadius: 20,
                    }}
                />
                <Text
                    className=""
                    style={{
                        fontSize: 15,
                    }}
                >
                    {title}
                </Text>
            </View>
            <View className="pl-[10] pr-[10] flex-row mb-[5]">
                {data?.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                width:
                                    (Dimensions.get('window').width - 30) / 3,
                            }}
                            onPress={() => {
                                //@ts-ignore
                                navigation.navigate('food-detail', {
                                    id: item.id,
                                })
                            }}
                        >
                            <HotRecommendItem data={item}></HotRecommendItem>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <TouchableOpacity
                className="flex-row items-center justify-end"
                onPress={() => {
                    //@ts-ignore
                    navigation.navigate('HealthMealScreen')
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                    }}
                >
                    更多
                </Text>
                <Icon type={'antdesign'} name={'right'} size={14}></Icon>
            </TouchableOpacity>
            <View className="h-[10]"></View>
        </View>
    )
}

export default memo(Index)
