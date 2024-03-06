import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View, Animated, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import theme from '../../../../styles/theme/color'
import AutoText from '../../../../components/auto-text'
import { FoodListByCategoryApi } from '../../../../apis/food'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../../../apis/types/food'
interface IProps {
    children?: ReactNode
    data: any
}

const IntakeItem: FC<IProps> = ({ data }) => {
    const [foodDetail, setFoodDetail] = useState<any>()
    //查询食物
    const getFoodDetail = () => {
        FoodListByCategoryApi({ id: data.id }).then((res) => {
            console.log(res, '打印一下')
            setFoodDetail((res.data as FoodListByCategoryType).foods[0])
        })
    }

    useEffect(() => {
        getFoodDetail()
    }, [])
    return (
        <View
            className="flex-row justify-between items-center border rounded pt-[10] pb-[10] pl-[5] pr-[5]"
            style={{ borderColor: theme.colors.primary }}
        >
            <View>
                <AutoText
                    numberOfLines={1}
                    fontSize={4.3}
                    style={{
                        width: 100,
                    }}
                >
                    {foodDetail?.title}
                </AutoText>
                <AutoText
                    numberOfLines={1}
                    fontSize={4.3}
                    style={{
                        marginTop: 5,
                        width: 100,
                    }}
                >
                    {foodDetail?.calories}Kcal/100g
                </AutoText>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity>
                    <Icon
                        type={'antdesign'}
                        name={'minuscircle'}
                        size={20}
                        color={theme.colors.deep01Primary}
                    ></Icon>
                </TouchableOpacity>

                <Text className="pl-[10] pr-[10]">{data?.g}g</Text>
                <TouchableOpacity>
                    <Icon
                        type={'antdesign'}
                        name={'pluscircle'}
                        size={20}
                        color={theme.colors.deep01Primary}
                    ></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(IntakeItem)
