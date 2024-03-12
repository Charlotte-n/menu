import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Image, ScrollView, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import AutoText from '../../components/auto-text'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../apis/types/food'
import ViewShot from 'react-native-view-shot'
import { Item } from '../diet/components/food-tab'
import { FoodListByCategoryApi } from '../../apis/food'
import { changeUrl } from '../../store/slice/diet'
import { useAppDispatch, useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const RecognizeFood: FC<IProps> = () => {
    const FoodDetail = useRef([] as SingleFoodListType[])
    const view = useRef<any>()
    const [url, setUrl] = useState('')
    const dispatch = useAppDispatch()
    //使用查询的食物
    const { RecognizeFoodInfo } = useAppSelector((state) => {
        return {
            RecognizeFoodInfo: state.DietSlice.RecognizeFoodInfo,
        }
    }, shallowEqual)
    //获取食物
    const capturePic = () => {
        view.current.capture().then((url: string) => {
            setUrl(url)
        })
    }
    const getFoodDetail = () => {
        for (let value of RecognizeFoodInfo) {
            FoodListByCategoryApi({ title: value.name })
                .then((res) => {
                    if (FoodDetail.current.length) {
                        return
                    }
                    if ((res?.data as FoodListByCategoryType).foods.length) {
                        FoodDetail.current = (
                            res?.data as FoodListByCategoryType
                        ).foods
                    } else {
                        FoodDetail.current = []
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }
    useEffect(() => {
        //获取食物
        getFoodDetail()
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
                {FoodDetail.current.length ? (
                    <View className="pl-[20] pr-[20] mt-[10]">
                        {FoodDetail.current.map((item) => {
                            return <Item data={item} key={item.id}></Item>
                        })}
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
                            source={require('../../../assets/images/search.png')}
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

export default memo(RecognizeFood)
