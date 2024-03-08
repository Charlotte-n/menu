import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import theme from '../../../../styles/theme/color'
import { Button } from '@rneui/themed'
import ViewShot from 'react-native-view-shot'
import { useAppDispatch } from '../../../../store'
import { changeUrl } from '../../../../store/slice/diet'
import RecordFood from '../../../../components/record-food'
import { useRoute } from '@react-navigation/native'
import { FoodListByCategoryApi } from '../../../../apis/food'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../../../apis/types/food'
import AutoText from '../../../../components/auto-text'
import { FoodNutrition, FoodNutritionData } from '../../../../data/diet'

const FoodNutrients: FC = () => {
    const route = useRoute()
    const view = useRef<any>()
    const dispatch = useAppDispatch()
    const [FoodDetail, setFoodDetail] = useState<SingleFoodListType>(
        {} as SingleFoodListType,
    )
    const [url, setUrl] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const capturePic = () => {
        view.current.capture().then((url: string) => {
            setUrl(url)
        })
    }

    const getFoodDetail = (id: number) => {
        FoodListByCategoryApi({ id: id }).then((res) => {
            setFoodDetail(
                (res?.data as FoodListByCategoryType)
                    .foods[0] as SingleFoodListType,
            )
        })
    }
    useEffect(() => {
        console.log(FoodDetail)
    }, [FoodDetail])
    useEffect(() => {
        //获取食物详情
        if (route.params as any) {
            getFoodDetail((route.params as any).id)
        } else {
            setFoodDetail({})
        }
        capturePic()
        dispatch(changeUrl(url))
    }, [url])
    return (
        <ScrollView className="flex-1 bg-white">
            <ViewShot
                ref={view}
                options={{
                    fileName: 'food',
                    format: 'png',
                    quality: 0.1,
                    result: 'base64',
                }}
            >
                {(route.params as { id: number }).id !== 0 ? (
                    <View>
                        <View className="pl-[30] pr-[30]">
                            <View
                                className=" justify-center"
                                style={{
                                    height:
                                        Dimensions.get('screen').height / 2.5,
                                }}
                            >
                                <View>
                                    <Text
                                        className="z-20 "
                                        style={{
                                            fontSize: 18,
                                        }}
                                        numberOfLines={1}
                                    >
                                        {FoodDetail.title}
                                    </Text>
                                    <Text
                                        className="absolute top-[15] left-0"
                                        style={{
                                            width: 54,
                                            height: 10,
                                            backgroundColor:
                                                theme.colors.deep01Primary,
                                            borderRadius: 20,
                                        }}
                                    ></Text>
                                </View>
                                <AutoText
                                    style={{
                                        marginTop: 10,
                                        fontSize: 13,
                                    }}
                                >
                                    {FoodDetail.calories?.toFixed(2)}Kcal/100g
                                </AutoText>
                            </View>
                            <View
                                style={{
                                    height:
                                        Dimensions.get('screen').height / 2.5,
                                }}
                            >
                                <View className="flex-row items-center">
                                    <View
                                        style={{
                                            width: 5,
                                            height: 5,
                                            borderRadius: 100,
                                            marginRight: 5,
                                            backgroundColor:
                                                theme.colors.deep01Primary,
                                        }}
                                    ></View>
                                    <AutoText fontSize={5}>热量解析</AutoText>
                                </View>
                                <View className="pl-[10]">
                                    {FoodNutritionData.map((item) => {
                                        return (
                                            <View
                                                key={item}
                                                className="flex-row border-b  pb-[15] pt-[15]"
                                                style={{
                                                    borderColor:
                                                        theme.colors.secondary,
                                                }}
                                            >
                                                <Text className="flex-1">
                                                    {
                                                        (FoodNutrition as any)[
                                                            item
                                                        ]
                                                    }
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#888',
                                                    }}
                                                >
                                                    {(FoodDetail as any)[item]
                                                        ? (FoodDetail as any)[
                                                              item
                                                          ]?.toFixed(2)
                                                        : 0}
                                                    kcal
                                                </Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                        <View className="m-auto">
                            <Button
                                onPress={() => {
                                    setIsVisible(true)
                                }}
                                title="记录饮食"
                                buttonStyle={{
                                    backgroundColor: theme.colors.deep01Primary,
                                    borderRadius: 20,
                                    width: Dimensions.get('screen').width / 2,
                                }}
                            ></Button>
                        </View>
                        <RecordFood
                            type={(route.params as { type: number }).type}
                            isVisible={isVisible}
                            id={(route.params as { id: number }).id}
                        >
                            {{
                                cancel: () => {
                                    setIsVisible(false)
                                },
                            }}
                        </RecordFood>
                    </View>
                ) : (
                    <View
                        className="items-center justify-center"
                        style={{
                            height: Dimensions.get('window').height - 200,
                        }}
                    >
                        <Image
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            source={require('../../../../../assets/images/search.png')}
                        ></Image>
                        <AutoText fontSize={6} style={{ marginTop: 20 }}>
                            不能识别到该食物
                        </AutoText>
                    </View>
                )}
            </ViewShot>
        </ScrollView>
    )
}

export default memo(FoodNutrients)
