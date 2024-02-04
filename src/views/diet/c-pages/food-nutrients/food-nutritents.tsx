import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import theme from '../../../../styles/theme/color'
import { BottomSheet, Button, Card } from '@rneui/themed'
import ViewShot from 'react-native-view-shot'
import { useAppDispatch } from '../../../../store'
import { changeUrl } from '../../../../store/slice/diet'
import RecordFood from '../../../../components/record-food'

interface IProps {
    children?: ReactNode
}

const FoodNutrients: FC<IProps> = () => {
    const view = useRef<any>()
    const dispatch = useAppDispatch()
    const [url, setUrl] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const capturePic = () => {
        view.current.capture().then((url: string) => {
            setUrl(url)
        })
    }
    useEffect(() => {
        capturePic()
        dispatch(changeUrl(url))
    }, [url])
    return (
        <ScrollView className="flex-1 bg-white ">
            <ViewShot
                ref={view}
                options={{
                    fileName: 'food',
                    format: 'png',
                    quality: 0.4,
                    result: 'base64',
                }}
            >
                <View className="pl-[30] pr-[30]">
                    <View
                        className=" justify-center"
                        style={{
                            height: Dimensions.get('screen').height / 2.5,
                        }}
                    >
                        <View>
                            <Text
                                className="z-20"
                                style={{
                                    fontSize: 20,
                                }}
                            >
                                鸡腿
                            </Text>
                            <Text
                                className="absolute top-[15] left-0"
                                style={{
                                    width: 54,
                                    height: 10,
                                    backgroundColor: theme.colors.deep01Primary,
                                    borderRadius: 20,
                                }}
                            ></Text>
                        </View>
                        <Text
                            className="mt-[10]"
                            style={{
                                fontSize: 13,
                            }}
                        >
                            181.00Kcal/100g
                        </Text>
                    </View>
                    <View
                        style={{
                            height: Dimensions.get('screen').height / 2.5,
                        }}
                    >
                        <View className="flex-row items-center">
                            <View
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: 100,
                                    marginRight: 5,
                                    backgroundColor: theme.colors.deep01Primary,
                                }}
                            ></View>
                            <Text>热量解析</Text>
                        </View>
                        <View className="pl-[10]">
                            {[1, 2, 3, 4].map((item, index) => {
                                return (
                                    <View
                                        key={item}
                                        className="flex-row border-b  pb-[15] pt-[15]"
                                        style={{
                                            borderColor: theme.colors.secondary,
                                        }}
                                    >
                                        <Text className="flex-1">热量</Text>
                                        <Text
                                            style={{
                                                color: '#888',
                                            }}
                                        >
                                            56.00kcal
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ViewShot>
            <View className="m-auto">
                <Button
                    onPress={() => {
                        console.log(123)
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
            <RecordFood isVisible={isVisible}>
                {{
                    cancel: () => {
                        setIsVisible(false)
                    },
                }}
            </RecordFood>
        </ScrollView>
    )
}

export default memo(FoodNutrients)
