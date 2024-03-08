import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import theme from '../../../../../styles/theme/color'
import { SingleFoodListType } from '../../../../../apis/types/food'
import AutoText from '../../../../../components/auto-text'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'react-native-svg'
import { Skeleton } from '@rneui/base'

interface IProps {
    children?: ReactNode
    FoodList: SingleFoodListType[]
}

const FoodContent: FC<IProps> = ({ FoodList }) => {
    const navigation = useNavigation()
    const route = useRoute()
    const gotoFoodDetail = (id: number) => {
        //@ts-ignore
        navigation.navigate('food-nutrients', {
            id: id,
            type: (route.params as { type: string }).type,
        })
    }
    const Item = ({
        hot,
        title,
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
                {FoodList && FoodList.length !== 0
                    ? FoodList.map((item, index) => (
                          <TouchableOpacity
                              key={item.id}
                              onPress={() => gotoFoodDetail(item.id as number)}
                          >
                              <Item
                                  title={item.title as string}
                                  hot={item.calories as number}
                                  id={item.id as number}
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
