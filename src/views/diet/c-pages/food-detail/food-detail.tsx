import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import theme from '../../../../styles/theme/color'
import { Card } from '@rneui/themed'
import { useAppDispatch } from '../../../../store'
import { changeUrl } from '../../../../store/slice/diet'
import ViewShot from 'react-native-view-shot'
import { ingredients } from '../../../../data/diet'
import RecordFood from '../../../../components/record-food'

interface IProps {
    children?: ReactNode
}

const FoodDetail: FC<IProps> = () => {
    const [url, setUrl] = useState('')
    const view = useRef<any>()
    const [isCollect, setIsCollect] = useState(false)
    const [isWrite, setIsWrite] = useState(false)
    const dispatch = useAppDispatch()
    const [isVisible, setIsVisible] = useState(false)
    //进行
    const capturePic = () => {
        view.current.capture().then((uri: string) => {
            setUrl(uri)
        })
    }
    useEffect(() => {
        capturePic()
        dispatch(changeUrl(url))
    }, [url])

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <StatusBar></StatusBar>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: theme.colors.primary,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Card
                    containerStyle={{
                        marginTop: 120,
                        borderTopLeftRadius: 40,
                        borderTopEndRadius: 40,
                        width: Dimensions.get('screen').width,
                        paddingHorizontal: 15,
                        paddingVertical: 0,
                        marginHorizontal: 0,
                    }}
                >
                    {/*创建BFC*/}
                    <View className="h-[130]">
                        <View className="absolute top-[-100] items-center self-center">
                            <Image
                                source={require('../../../../../assets/images/bg_login_header.png')}
                                style={{ width: 180, height: 180 }}
                                className="rounded-full"
                            ></Image>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 20,
                                }}
                            >
                                口水鸡
                            </Text>
                        </View>
                    </View>
                    {/*  食谱介绍*/}
                    <View>
                        <Text
                            style={{
                                fontSize: 15,
                            }}
                        >
                            今天和大家分享一道超好吃的椒麻口水鸡，麻辣鲜香，超级入味，做法简单零失败，手残党也能一次成功，赶紧试试吧！
                        </Text>
                    </View>
                    {/*    做法*/}
                    <ViewShot
                        ref={view}
                        options={{
                            fileName: 'food',
                            format: 'png',
                            quality: 0.4,
                            result: 'base64',
                        }}
                    >
                        {/*  营养元素*/}

                        <View
                            className="flex-row justify-between mt-[20]"
                            style={{}}
                        >
                            {[1, 2, 3].map((item) => {
                                return (
                                    <View
                                        key={item}
                                        className="justify-center items-center"
                                        style={{
                                            backgroundColor:
                                                'rgba(255,214,71,0.55)',
                                            width:
                                                (Dimensions.get('screen')
                                                    .width -
                                                    30) /
                                                4,
                                            height: 100,
                                            borderRadius: 15,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 20,
                                                height: 40,
                                            }}
                                            source={require('../../../../../assets/icon/ic_蛋白质.png')}
                                        ></Image>
                                        <Text className="mt-[10]">420</Text>
                                    </View>
                                )
                            })}
                        </View>

                        {/*    成分*/}
                        <View className="mt-[20]">
                            <Text
                                className="text-[#C0AE7D]"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}
                            >
                                材料
                            </Text>
                            <View className="pl-[15] pr-[15]">
                                {ingredients.map((item, index) => {
                                    return (
                                        <View
                                            key={item.id}
                                            className="flex-row justify-between pb-[15] pt-[15] border-b border-[#F1F3F4]"
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                }}
                                            >
                                                {item.number}
                                            </Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                        <View className="mt-[20]">
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}
                                className="text-[#C0AE7D]"
                            >
                                口水鸡的做法
                            </Text>
                            {[1, 2, 3, 4].map((item, index) => {
                                return (
                                    <View key={item}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}
                                            className="text-[#C0AE7D] mt-[15]"
                                        >
                                            步骤{item}
                                        </Text>
                                        <Image
                                            source={require('../../../../../assets/test/img.png')}
                                            style={{
                                                width: '100%',
                                            }}
                                            className="mt-[10]"
                                            resizeMode={'cover'}
                                        ></Image>
                                        <Text
                                            className="mt-[10]"
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >
                                            调酱汁：碗中放入青椒小米椒圈+1勺蒜末+1勺辣椒粉+1勺白芝麻+1勺葱花淋上热油
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </ViewShot>

                    <View className="h-[20]"></View>
                </Card>
            </ScrollView>
            {/*    底部固定*/}
            <View
                className="absolute bottom-0  flex-row items-center pl-[20] border-t border-[#F1F3F4]  bg-white"
                style={{
                    width: Dimensions.get('screen').width,
                    height: 40,
                }}
            >
                {isCollect ? (
                    <TouchableOpacity onPress={() => setIsCollect(!isCollect)}>
                        <Image
                            source={require('../../../../../assets/icon/collect1.png')}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        ></Image>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsCollect(!isCollect)}>
                        <Image
                            source={require('../../../../../assets/icon/collect.png')}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        ></Image>
                    </TouchableOpacity>
                )}
                {isWrite ? (
                    <TouchableOpacity
                        onPress={() => {
                            setIsWrite(!isWrite)
                        }}
                    >
                        <Image
                            source={require('../../../../../assets/icon/write1.png')}
                            style={{
                                marginLeft: 20,
                                height: 25,
                                width: 25,
                            }}
                        ></Image>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            setIsWrite(!isWrite)
                            setIsVisible(true)
                        }}
                    >
                        <Image
                            source={require('../../../../../assets/icon/write.png')}
                            style={{
                                marginLeft: 20,
                                height: 25,
                                width: 25,
                            }}
                        ></Image>
                    </TouchableOpacity>
                )}
            </View>
            {/*<RecordFood isVisible={isVisible}>*/}
            {/*    {{*/}
            {/*        cancel: () => {*/}
            {/*            setIsVisible(false)*/}
            {/*            setIsWrite(false)*/}
            {/*        },*/}
            {/*    }}*/}
            {/*</RecordFood>*/}
        </SafeAreaView>
    )
}

export default memo(FoodDetail)
