import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    ToastAndroid,
    Platform,
    TouchableOpacity,
    View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import theme from '../../../../styles/theme/color'
import { Card } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { changeUrl } from '../../../../store/slice/diet'
import ViewShot from 'react-native-view-shot'
import Comment from './components/common'
import CommentModal from './components/comment-modal'
import { getCommentsApi, RecipeListApi } from '../../../../apis/food'
import {
    changeCommentAction,
    changeParentIdAction,
} from '../../../../store/slice/food'
import { useRoute } from '@react-navigation/native'
import { SingleDish } from '../../../../apis/types/food'
import {
    addCollectApi,
    cancelCollectApi,
    JudgeCollectApi,
} from '../../../../apis/common'
import { addCollectBody } from '../../../../apis/types/common'
import { shallowEqual } from 'react-redux'
interface IProps {
    children?: ReactNode
}

const FoodDetail: FC<IProps> = () => {
    const [url, setUrl] = useState('')
    const view = useRef<any>()
    const [isWrite, setIsWrite] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useAppDispatch()
    const route = useRoute()
    const [RecipeDetail, setRecipeDetail] = useState<SingleDish>(
        {} as SingleDish,
    )
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)

    //获取食谱详情
    const getRecipeDetail = async () => {
        await RecipeListApi({
            id: (route.params as { id: number }).id,
        }).then((res) => {
            console.log(res)
            //数据的处理
            let materials = (res.data.dishes[0].materials as string)
                .trim()
                .split('\\n')
            materials.pop()
            let stepImage = (res.data.dishes[0].stepImg as string)
                .trim()
                .split('\\n')
            stepImage.pop()
            let result: SingleDish = res.data.dishes.map((item) => {
                return {
                    id: item.id,
                    materials: materials,
                    amount: (item.amount as string)?.trim().split('\\n'),
                    stepImg: stepImage,
                    image: item.image,
                    key: item.key,
                    name: item.name?.trim(),
                    score: item.score,
                    step: (item.step as string)?.trim().split('\\n'),
                }
            })[0]
            setRecipeDetail(result)
        })
    }
    useEffect(() => {
        getRecipeDetail().then()
    }, [])
    //评论的显示和隐藏
    const disShow = () => {
        setIsVisible(false)
    }
    const show = () => {
        setIsVisible(true)
    }
    //进行
    const capturePic = () => {
        view.current.capture().then((uri: string) => {
            setUrl(uri)
            dispatch(changeUrl(uri))
        })
    }
    useEffect(() => {
        capturePic()
    }, [RecipeDetail])
    //#获取评论
    const getComments = () => {
        //食物id
        getCommentsApi((route.params as { id: number }).id, userInfo.id).then(
            (res) => {
                dispatch(changeCommentAction(res.data))
            },
        )
    }
    useEffect(() => {
        getComments()
    }, [])

    //评论的显示
    const disShowEdit = () => {
        setIsWrite(false)
    }
    //#

    //#收藏
    const handleCollect = async () => {
        const data: addCollectBody = {
            foodId: (route.params as { id: number }).id,
            userid: userInfo.id,
            type: 2,
        }
        await addCollectApi(data)
            .then(() => {})
            .catch((e) => {
                console.log(e, '添加收藏出错了')
            })
        JudgeCollect()
        if (Platform.Version === 33) {
            ToastAndroid.showWithGravity(
                '收藏成功',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            )
        }
    }

    const cancelCollect = async () => {
        const data: addCollectBody = {
            foodId: (route.params as { id: number }).id,
            userid: userInfo.id,
            type: 2,
        }
        await cancelCollectApi(data)
            .then(() => {
                JudgeCollect()
            })
            .catch((e) => {
                console.log(e, '取消收藏')
            })
    }
    //#查询这个菜谱是否进行了收藏
    const [isCollect, setIsCollect] = useState<boolean>(false)
    const JudgeCollect = () => {
        const data: addCollectBody = {
            foodId: (route.params as { id: number }).id,
            userid: userInfo.id,
            type: 2,
        }
        JudgeCollectApi(data).then((res) => {
            setIsCollect(!res.data)
        })
    }
    useEffect(() => {
        JudgeCollect()
    }, [RecipeDetail])
    //#

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
                    // backgroundColor: theme.colors.primary,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Card
                    containerStyle={{
                        backgroundColor: 'white',
                        marginTop: 120,
                        width: Dimensions.get('screen').width,
                        marginHorizontal: 0,
                        paddingHorizontal: 0,
                        borderTopLeftRadius: 40,
                        borderTopEndRadius: 40,
                    }}
                >
                    {/*    做法*/}
                    <ViewShot
                        ref={view}
                        options={{
                            fileName: 'food-detail-health',
                            format: 'png',
                            quality: 0.4,
                            result: 'base64',
                        }}
                    >
                        {/*创建BFC*/}
                        <View
                            className="pl-[10] pr-[10]"
                            style={{
                                minHeight: 150,
                            }}
                        >
                            <View className="absolute top-[-100] items-center self-center">
                                {RecipeDetail.image ? (
                                    <Image
                                        source={{
                                            uri: RecipeDetail.image as string,
                                        }}
                                        style={{ width: 180, height: 180 }}
                                        className="rounded-full"
                                    ></Image>
                                ) : null}
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: 20,
                                        minHeight: 100,
                                    }}
                                >
                                    {RecipeDetail.name?.trim()}
                                </Text>
                            </View>
                        </View>
                        <View className="mt-[20] ml-[15] mr-[15]">
                            <Text
                                className="text-[#C0AE7D]"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}
                            >
                                材料
                            </Text>
                            <View className="pl-[15] pr-[15] ">
                                {(RecipeDetail.materials as string[])?.map(
                                    (item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                className="flex-row justify-between items-center pb-[15] pt-[15] border-b border-[#F1F3F4]"
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        flex: 1,
                                                    }}
                                                >
                                                    {item?.trim()}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {RecipeDetail.amount[
                                                        index
                                                    ]?.trim()}
                                                </Text>
                                            </View>
                                        )
                                    },
                                )}
                            </View>
                        </View>
                    </ViewShot>
                    <View className="mt-[20] ml-[15] mr-[15]">
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}
                            className="text-[#C0AE7D]"
                        >
                            {RecipeDetail.name}的做法
                        </Text>
                        {(RecipeDetail.stepImg as string[])?.map(
                            (item, index) => {
                                return (
                                    <View key={item}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}
                                            className="text-[#C0AE7D] mt-[15]"
                                        >
                                            步骤{index + 1}
                                        </Text>
                                        {RecipeDetail.stepImg.length ? (
                                            <View>
                                                <Image
                                                    source={{
                                                        uri: item?.trim(),
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        height: 200,
                                                        borderRadius: 20,
                                                    }}
                                                    className="mt-[10]"
                                                    resizeMode={'cover'}
                                                ></Image>
                                            </View>
                                        ) : null}

                                        <Text
                                            className="mt-[10]"
                                            style={{
                                                fontSize: 15,
                                            }}
                                        >
                                            {RecipeDetail.step[index]?.trim()}
                                        </Text>
                                    </View>
                                )
                            },
                        )}
                    </View>
                    {/*评论区域*/}
                    <View className="mt-[20] ml-[15] mr-[15]">
                        <Comment foodId={(route.params as { id: number }).id}>
                            {{
                                show: show,
                            }}
                        </Comment>
                    </View>
                    <View className="h-[50]"></View>
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
                    <TouchableOpacity onPress={() => cancelCollect()}>
                        <Image
                            source={require('../../../../../assets/icon/collect1.png')}
                            style={{
                                height: 25,
                                width: 25,
                            }}
                        ></Image>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => handleCollect()}>
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
                            dispatch(changeParentIdAction(0))
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
                            show()
                            dispatch(changeParentIdAction(0))
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

            {/*    评论弹窗*/}
            {isVisible ? (
                <CommentModal foodId={RecipeDetail.id}>
                    {{
                        disShow: disShow,
                        disShowEdit: disShowEdit,
                    }}
                </CommentModal>
            ) : null}
        </SafeAreaView>
    )
}

export default memo(FoodDetail)
