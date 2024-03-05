import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import theme from '../../../../../styles/theme/color'
import {
    FoodListByCategoryData,
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../../../../apis/types/food'
import AutoText from '../../../../../components/auto-text'
import { useNavigation } from '@react-navigation/native'
import { Selection } from 'victory-native'
import { LinearGradient } from 'react-native-svg'
import { Skeleton } from '@rneui/base'

interface IProps {
    children?: ReactNode
    FoodList: SingleFoodListType[]
}

const FoodContent: FC<IProps> = ({ FoodList }) => {
    const navigation = useNavigation()
    const gotoFoodDetail = (id: number) => {
        //@ts-ignore
        navigation.navigate('food-nutrients', { id: id })
    }
    const Item = ({
        hot,
        title,
        id,
    }: {
        hot: number
        title: string
        id: number
    }) => {
        return (
            <View
                className=" pl-[20] pr-[20] pt-[25] pb-[25] border-b"
                style={{
                    borderColor: theme.colors.secondary,
                }}
            >
                <AutoText className="flex-1" numberOfLines={1} fontSize={4.5}>
                    {title}
                </AutoText>
                <AutoText
                    fontSize={4.5}
                    style={{
                        marginTop: 10,
                    }}
                >
                    {hot}kcal/100g
                </AutoText>
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
                {FoodList.length !== 0
                    ? FoodList.map((item, index) => (
                          <TouchableOpacity
                              key={item.id}
                              onPress={() => gotoFoodDetail(item.id)}
                          >
                              <Item
                                  title={item.title}
                                  hot={item.calories}
                                  id={item.id}
                              ></Item>
                          </TouchableOpacity>
                      ))
                    : new Array(6).fill(0).map((item, index) => (
                          <Skeleton
                              key={index}
                              LinearGradientComponent={LinearGradient}
                              animation="wave"
                              style={{
                                  flex: 1,
                              }}
                              height={150}
                          ></Skeleton>
                      ))}
            </ScrollView>
        </View>
    )
}

export default memo(FoodContent)
