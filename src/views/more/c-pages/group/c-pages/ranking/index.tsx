import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, ScrollView, View } from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import theme from '../../../../../../styles/theme/color'
import { showMemberRankingApi } from '../../../../../../apis/group'
import { useRoute } from '@react-navigation/native'
import {
    RankingMemberBody,
    RankingType,
} from '../../../../../../apis/types/group'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const Ranking: FC<IProps> = () => {
    const route = useRoute()
    const [ranking, setRanking] = useState([] as RankingType)
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const getRanking = () => {
        const params: RankingMemberBody = {
            groupId: (route.params as { id: number }).id,
            pageNum: 0,
            pageSize: 50,
            userId: userInfo.id,
        }
        showMemberRankingApi(params).then((res) => {
            setRanking(res.data)
        })
    }
    useEffect(() => {
        getRanking()
    }, [])
    return (
        <View className="pl-[10] pr-[10] bg-[#F7F7F7] flex-1">
            <View className="items-center mt-[10]">
                <AutoText fontSize={7}>今日排行榜</AutoText>
            </View>
            <View className="flex-row mt-[10]">
                <AutoText
                    fontSize={4}
                    style={{
                        backgroundColor: '#F1F1F1',
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: '#F1F1F1',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                >
                    共{ranking.length}人
                </AutoText>
                <View className="flex-1"></View>
                <AutoText
                    fontSize={4}
                    style={{
                        backgroundColor: theme.colors.deep01Primary,
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: theme.colors.deep01Primary,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        color: 'white',
                        marginRight: 10,
                    }}
                >
                    今日
                </AutoText>
                <AutoText
                    fontSize={4}
                    style={{
                        backgroundColor: theme.colors.deep01Primary,
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: theme.colors.deep01Primary,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        color: 'white',
                    }}
                >
                    打卡时间
                </AutoText>
            </View>
            {/*    排行榜*/}
            <ScrollView
                className="mt-[20] bg-white pl-[20] pt-[10] pr-[10] pb-[10] flex-1"
                style={{
                    borderRadius: 10,
                }}
            >
                {ranking?.map((item, index) => {
                    return (
                        <View key={item.id}>
                            <View className="flex-row items-center pb-[20]">
                                <View className="flex-row items-center flex-1">
                                    <AutoText fontSize={6}>
                                        {index + 1}
                                    </AutoText>
                                    {item.avatar ? (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 100,
                                                marginLeft: 10,
                                                marginRight: 5,
                                            }}
                                            source={{ uri: item.avatar }}
                                        ></Image>
                                    ) : (
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 100,
                                                marginLeft: 10,
                                                marginRight: 5,
                                            }}
                                            source={require('../../../../../../../assets/images/bg_login_header.png')}
                                        ></Image>
                                    )}

                                    <AutoText fontSize={4}>
                                        {item.username}
                                    </AutoText>
                                </View>
                                {/*TODO:打卡率*/}
                                <AutoText fontSize={4}>
                                    {(item.rate * 100).toFixed(1)}%
                                </AutoText>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default memo(Ranking)
