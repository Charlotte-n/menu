import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import AutoText from '../../../../../components/auto-text'
import { useNavigation } from '@react-navigation/native'
import {
    CommentsType,
    CommunicateSingleContentData,
} from '../../../../../apis/types/communicate'
import { topicMap } from '../../../../../data/communicate'
import theme from '../../../../../styles/theme/color'
import {
    doLike,
    getCommentApi,
    LogCommentApi,
    LogCommentSingleApi,
} from '../../../../../apis/communicate'
import { useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import { FoodCommentListData } from '../../../../../apis/types/food'
interface IProps {
    children?: any
    index: number
    data: CommunicateSingleContentData
}

enum LikeMap {
    NONE = 0,
    LIKE = 1,
    DISLIKE = 2,
}
const CommentCard: FC<IProps> = ({ index, data, children }) => {
    const navigation = useNavigation()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //获取评论
    const [comment, setComment] = useState([] as FoodCommentListData)
    const getComment = (logId: number) => {
        getCommentApi({ logId, userId: userInfo.id }).then((res) => {
            setComment(res.data)
        })
    }
    //用户对该记录的评价
    const [likes, setLikes] = useState([] as number[])
    const [currentType, setCurrentType] = useState(data.type)
    const logComment = (type?: number, lodId?: number) => {
        LogCommentApi(type!, userInfo.id, lodId!).then((res) => {
            setCurrentType(res.data[2]!)
            setLikes(res.data)
        })
    }
    //获取单个评价
    const logs = () => {
        LogCommentSingleApi(userInfo.id, data.id).then((res) => {
            setLikes(res.data)
        })
    }
    const gotoCommunicateDetail = () => {
        //@ts-ignore
        navigation.navigate('CommunicateDetail', {
            id: data.id,
            type: data.topicId,
            likeType: data.type,
        })
    }
    //获取喜欢
    const getLikes = (type?: number) => {
        logComment(type, data.id)
    }
    useEffect(() => {
        logs()
        getComment(data.id)
    }, [])

    return (
        <TouchableOpacity
            onPress={() => gotoCommunicateDetail()}
            className=" pl-[10] pr-[10] pt-[15] pb-[10]"
            style={[
                styles.container,
                index % 2 == 0
                    ? { backgroundColor: '#FBF1E4' }
                    : { backgroundColor: '#E1EEDD' },
            ]}
        >
            <View className="">
                <View className="flex-row items-center">
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                        source={{ uri: data.avatar }}
                    ></Image>
                    <AutoText>{data.username}</AutoText>
                </View>
            </View>
            <View className="mt-[10]">
                <Text selectable={true} numberOfLines={2}>
                    <Text
                        selectable={true}
                        style={{
                            fontSize: 15,
                            color: '#EABC68',
                            lineHeight: 25,
                        }}
                        numberOfLines={2}
                    >
                        #{topicMap[data.topicId - 1]}{' '}
                    </Text>
                    <Text
                        selectable={true}
                        style={{
                            lineHeight: 25,
                        }}
                        numberOfLines={2}
                    >
                        {data.content}
                    </Text>
                </Text>
                {/*有图片就展示图片*/}
                <View className="flex-row">
                    {data.images && data.images instanceof Array
                        ? (data.images as string[]).map((item, index) => {
                              return (
                                  <Image
                                      key={index}
                                      source={{
                                          uri: item,
                                      }}
                                      style={{
                                          height: 80,
                                          width:
                                              (Dimensions.get('window').width -
                                                  80) /
                                              4,
                                          marginRight: 5,
                                          borderRadius: 10,
                                      }}
                                  ></Image>
                              )
                          })
                        : null}
                </View>
            </View>
            {comment && (
                <View className="flex-row mt-[10] items-center">
                    <Text
                        className="mr-[10]"
                        style={{
                            fontSize: 12,
                            color: '#A9AAAF',
                        }}
                    >
                        {comment[0]?.username}:
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            flex: 1,
                            color: '#A9AAAF',
                        }}
                        numberOfLines={1}
                    >
                        {comment[0]?.content}
                    </Text>
                </View>
            )}

            <View className="mt-[20] flex-row items-center">
                <TouchableOpacity className="flex-row flex-1">
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                        }}
                        source={require('../../../../../../assets/icon/remark.png')}
                    ></Image>
                    <Text
                        style={{
                            fontSize: 12,
                        }}
                    >
                        {comment?.length}
                    </Text>
                </TouchableOpacity>
                <View className="flex-row">
                    <TouchableOpacity
                        onPress={() => {
                            getLikes(2)
                        }}
                        className="bg-white pl-[10] pr-[10] pt-[3] pb-[3]"
                        style={{
                            borderRadius: 10,
                            marginRight: 5,
                            backgroundColor:
                                LikeMap.DISLIKE === currentType
                                    ? theme.colors.deep01Primary
                                    : 'white',
                        }}
                    >
                        <AutoText
                            fontSize={4}
                            style={{
                                color:
                                    LikeMap.DISLIKE === currentType
                                        ? 'white'
                                        : 'black',
                            }}
                        >
                            要少吃 {likes.length ? likes[1] : 0}人
                        </AutoText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            getLikes(1)
                        }}
                        className="bg-white pl-[10] pr-[10] pt-[3] pb-[3]"
                        style={{
                            borderRadius: 10,
                            backgroundColor:
                                LikeMap.LIKE === currentType
                                    ? theme.colors.deep01Primary
                                    : 'white',
                        }}
                    >
                        <AutoText
                            fontSize={4}
                            style={{
                                color:
                                    LikeMap.LIKE === currentType
                                        ? 'white'
                                        : 'black',
                            }}
                        >
                            点个赞 {likes.length ? likes[0] : 0}人
                        </AutoText>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
    },
})
export default memo(CommentCard)
