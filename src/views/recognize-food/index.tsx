import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Image, ScrollView, View } from 'react-native'
import AutoText from '../../components/auto-text'
import ViewShot from 'react-native-view-shot'
import { changeUrl } from '../../store/slice/diet'
import { useAppDispatch, useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
import theme from '../../styles/theme/color'
import { Text } from '@rneui/themed'

interface IProps {
    children?: ReactNode
}

const RecognizeFood: FC<IProps> = () => {
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
    useEffect(() => {
        //获取食物
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
                    quality: 0.1,
                    result: 'base64',
                }}
            >
                {RecognizeFoodInfo.length !== 0 &&
                RecognizeFoodInfo[0].name !== '非菜' ? (
                    <View className="pl-[20] pr-[20] mt-[10] mb-[20]">
                        {RecognizeFoodInfo.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    className="flex-row  items-end border rounded mt-[15] pt-[10] pb-[10] pl-[5] pr-[5]"
                                    style={{
                                        borderColor: theme.colors.deep01Primary,
                                    }}
                                >
                                    <View className="flex-1 flex-row items-center">
                                        <View>
                                            <AutoText
                                                numberOfLines={1}
                                                className="w-[50]"
                                                style={{
                                                    width: 120,
                                                }}
                                            >
                                                {item.name}
                                            </AutoText>
                                            <Text style={{ fontSize: 12 }}>
                                                {item.calorie}Kcal/100g
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )
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
