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
import { addCaloriesApi } from '../../../../apis/diet'
import { CaloriesBodyData } from '../../../../apis/types/diet'
import { useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'
interface IProps {
    children?: any
    data: any
    time: number
}

const IntakeItem: FC<IProps> = ({ data, time, children }) => {
    const GetDailyIntake = children.GetDailyIntake
    const [foodDetail, setFoodDetail] = useState<SingleFoodListType>()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //查询食物
    const getFoodDetail = () => {
        FoodListByCategoryApi({ id: data.id }).then((res) => {
            setFoodDetail((res.data as FoodListByCategoryType).foods[0])
        })
    }

    useEffect(() => {
        getFoodDetail()
    }, [])
    //减少食物
    const changeFood: CaloriesBodyData = {
        calories: foodDetail?.calories || (0 as number),
        foodId: foodDetail?.id as number,
        id: userInfo.id,
        cellulose: foodDetail?.cellulose || (0 as number),
        protein: foodDetail?.protein || (0 as number),
        fat: foodDetail?.fat || (0 as number),
        carbohydrate: foodDetail?.carbohydrate || (0 as number),
        operator: 0,
        type: time,
        g: 100,
    }
    const decline = async (operator: number) => {
        changeFood.operator = operator
        await addCaloriesApi(changeFood).then((res) => {
            console.log(res)
        })
        //更新食物
        await GetDailyIntake()
    }
    //增加食物
    const decrease = async (operator: number) => {
        //修改食物
        changeFood.operator = operator
        await addCaloriesApi(changeFood).then((res) => {
            // console.log(res)
        })
        //更新食物
        await GetDailyIntake()
    }

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
                <TouchableOpacity
                    onPress={() => {
                        decline(0)
                    }}
                >
                    <Icon
                        type={'antdesign'}
                        name={'minuscircle'}
                        size={20}
                        color={theme.colors.deep01Primary}
                    ></Icon>
                </TouchableOpacity>

                <Text className="pl-[10] pr-[10]">{data?.g}g</Text>
                <TouchableOpacity
                    onPress={() => {
                        decrease(1)
                    }}
                >
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
