import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Animated,
    Dimensions,
    Image,
    TouchableOpacity,
    View,
} from 'react-native'
import AutoText from '../../../../components/auto-text'
import StickyHeader from './components/StickyHeader'
import CommentCard from './components/CommentCard'
import { RefreshControl } from 'react-native-gesture-handler'
import theme from '../../../../styles/theme/color'
import {
    getCommunicateContentApi,
    getRecordMemoryApi,
    getTopicApi,
} from '../../../../apis/communicate'
import { useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'
import { yingshe } from '../../../../data/date'
import { useRoute } from '@react-navigation/native'
import {
    CommunicateContentData,
    GetCommunicateContentData,
} from '../../../../apis/types/communicate'
interface IProps {
    children?: ReactNode
    navigation: any
}

const Communicate: FC<IProps> = ({ navigation }) => {
    const route = useRoute()
    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    const [headHeight, setHeadHeight] = useState(-1)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [titles, setTitles] = useState()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const [recordNumber, setRecordNumber] = useState(() => [0, 0, 0])
    const recordText = ['记录了', '饮食记录', '吃多了']
    const refresh = () => {
        getDietRecord()
        getTopic()
        getCommunicateContent()
    }
    //路由变化
    useEffect(() => {
        refresh()
    }, [(route.params as { refresh: number })?.refresh])
    const gotoRecordToday = () => {
        navigation.navigate('RecordToday')
    }
    //获取饮食记录的
    const getDietRecord = () => {
        getRecordMemoryApi(userInfo.id).then((res) => {
            setRecordNumber(res.data)
        })
    }
    const getTopic = () => {
        getTopicApi().then((res) => {
            res.data.unshift({
                desc: '全部',
                id: 0,
                status: 1,
            })
            setTitles(res.data)
        })
    }

    const [communicate, setCommunicate] = useState([] as CommunicateContentData)
    const getCommunicateContent = () => {
        const data: GetCommunicateContentData = {
            id: topicId === 0 ? 0 : null,
            pageNum: 1,
            topicId: topicId,
            pageSize: 10,
        }
        getCommunicateContentApi(data, userInfo.id).then((res) => {
            const result = res.data.map((item) => {
                if (item.images) {
                    item.images = (item.images as string)?.split('|')
                    item.images = item.images.slice(
                        0,
                        item.images.length > 4 ? 4 : item.images.length - 1,
                    )
                }
                return item
            })
            setCommunicate(result)
        })
    }
    useEffect(() => {
        refresh()
    }, [])
    //获取饮食广场的内容
    const [topicId, setTopicId] = useState(0)
    const getId = (value: number) => {
        setTopicId(value)
    }
    useEffect(() => {
        getCommunicateContent()
    }, [topicId])
    //获取评论的
    return (
        <Animated.ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={refresh}
                    tintColor={theme.colors.deep01Primary}
                    title={isRefreshing ? '刷新中....' : '下拉刷新'}
                />
            }
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white pl-[20] pr-[20]"
            style={{ flex: 1 }}
            onScroll={
                Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: scrollY },
                            }, // 记录滑动距离
                        },
                    ],
                    { useNativeDriver: true },
                ) // 使用原生动画驱动
            }
            scrollEventThrottle={1}
        >
            {/*标题*/}
            <View
                onLayout={(e) => {
                    let { height } = e.nativeEvent.layout
                    setHeadHeight(height) // 给头部高度赋值
                }}
            >
                <View>
                    <AutoText
                        fontSize={7}
                        style={{
                            fontWeight: 800,
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >
                        饮食圈
                    </AutoText>
                    <AutoText
                        style={{
                            color: '#937747',
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >
                        和大家一起监督与交流饮食生活吧~
                    </AutoText>
                </View>
                {/*    统计记录*/}
                <View
                    className="border border-solid mt-[20] pl-[10] pr-[10] pb-[10] pt-[10] bg-[#F9F6ED]"
                    style={{
                        borderWidth: 1,
                        borderColor: '#CCC6B5',
                        borderRadius: 10,
                    }}
                >
                    <View className="border-b border-b-[#CCC6B5] pb-[10]">
                        <AutoText>我在本月圈内统计</AutoText>
                    </View>
                    {/*记录内容*/}
                    <View className="mt-[10] flex-row">
                        {recordNumber?.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    className="justify-center items-center"
                                    style={{
                                        width:
                                            (Dimensions.get('window').width -
                                                50) /
                                            3,
                                        borderRightColor: '#CCC6B5',
                                        borderRightWidth: index === 2 ? 0 : 1,
                                    }}
                                >
                                    <AutoText
                                        style={{
                                            color: '#908E9D',
                                            marginBottom: 5,
                                        }}
                                    >
                                        {recordText[index]}
                                    </AutoText>
                                    <AutoText
                                        style={{
                                            color: '#908E9D',
                                        }}
                                    >
                                        {item}条
                                    </AutoText>
                                </View>
                            )
                        })}
                    </View>
                </View>
                {/*    今天的记录*/}
                <View className="mt-[20]">
                    <View className="flex-row mb-[10]">
                        <AutoText
                            style={{
                                fontFamily: 'RunXing',
                                fontWeight: 800,
                                flex: 1,
                            }}
                        >
                            写下今天的记录:
                        </AutoText>
                        <AutoText
                            style={{
                                color: '#967133',
                                fontWeight: 800,
                            }}
                        >
                            {new Date().getMonth() +
                                1 +
                                '月' +
                                new Date().getDate() +
                                '日 '}

                            {'星期' + yingshe[Number(new Date().getDay())]}
                        </AutoText>
                    </View>
                    <TouchableOpacity onPress={() => gotoRecordToday()}>
                        <View
                            className="border border-solid border-[#A2C098] pl-[10] pr-[10] pt-[10] flex-row  min-h-[80] bg-[#F2FCF1]"
                            style={{
                                borderRadius: 10,
                            }}
                        >
                            <AutoText
                                fontSize={4.5}
                                style={{
                                    color: '#CBD7CB',
                                }}
                            >
                                <Image
                                    style={{
                                        width: 10,
                                        height: 10,
                                    }}
                                    source={require('../../../../../assets/icon/write.png')}
                                ></Image>
                                写下今天吃了什么与此刻的心情
                            </AutoText>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="mt-[10]">
                    <AutoText
                        fontSize={7}
                        style={{
                            textAlign: 'center',
                            fontWeight: 700,
                        }}
                    >
                        饮食圈广场
                    </AutoText>
                </View>
            </View>
            {/*    饮食圈广场*/}
            {/*  吸顶导航 */}
            <StickyHeader
                titles={titles}
                props={{
                    stickyHeaderY: headHeight,
                    stickyScrollY: scrollY,
                }}
            >
                {{ getId: getId }}
            </StickyHeader>
            {/*    内容*/}
            <View className="mt-[15]">
                {communicate?.map((item, index) => {
                    return (
                        <View key={index} className="mb-[15]">
                            <CommentCard index={index} data={item}>
                                {{
                                    getCommunicateContent:
                                        getCommunicateContent,
                                }}
                            </CommentCard>
                        </View>
                    )
                })}
            </View>
        </Animated.ScrollView>
    )
}

export default memo(Communicate)
