import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import theme from '../../../../../../styles/theme/color'
import CommentAll from '../../../../../../components/comment-all/commentAll'
import { GetRecordDetail } from '../../../../../../apis/types/communicate'
import { BottomSheet, Button, Card, Icon } from '@rneui/themed'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import {
    getCommentApi,
    getRecordDetailApi,
    LogCommentApi,
    LogCommentSingleApi,
    postCommentApi,
    PostCommentParam,
} from '../../../../../../apis/communicate'
import { topicMap } from '../../../../../../data/communicate'
import { FoodCommentListData } from '../../../../../../apis/types/food'

interface IProps {
    children?: ReactNode
}
enum LikeMap {
    NONE = 0,
    LIKE = 1,
    DISLIKE = 2,
}
const CommunicateDetail: FC<IProps> = () => {
    const route = useRoute()
    const topicId = (route.params as { type: number }).type
    const [isShow, setIsShow] = useState(false)
    const [text, setText] = useState('')
    const textInputRef = useRef<any>()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //获取详情页面
    const [RecordDetail, setRecordDetail] = useState({} as GetRecordDetail)
    const getRecordDetail = () => {
        getRecordDetailApi((route.params as { id: number }).id)
            .then((res) => {
                const result = res.data.logImages
                    ? (res.data.logImages as string).split('|')
                    : null
                res.data.logImages = result
                    ? result.slice(0, result.length - 1)
                    : null
                setRecordDetail(res.data)
            })
            .catch((e) => {
                console.log(e, '出错了')
            })
    }
    useEffect(() => {
        getRecordDetail()
    }, [])
    //发表评论
    const [parentId, setParentId] = useState()
    const uploadComment = () => {
        const postParam: PostCommentParam = {
            logId: (route.params as { id: number }).id,
            userId: userInfo.id,
            content: text,
            parentCommentId: parentId ? parentId : undefined,
        }
        postCommentApi(postParam)
            .then(() => {
                //进行清空和消失
                setText('')
                getComment()
                disShow()
                setParentId(undefined)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    //获取评论
    const [comments, setComments] = useState([] as FoodCommentListData)
    const getComment = () => {
        const param = {
            logId: (route.params as { id: number }).id,
            userId: userInfo.id,
            parentCommentId: parentId,
        }
        getCommentApi(param).then((res) => {
            setComments(res.data)
        })
    }

    const disShow = () => {
        setIsShow(false)
    }
    const show = (parentId?: any) => {
        setParentId(parentId)
        setIsShow(true)
        setTimeout(() => {
            ;(textInputRef.current as any).focus()
        }, 300)
    }
    useEffect(() => {
        getComment()
    }, [])
    //获取likes
    const [likes, setLikes] = useState([] as number[])
    const getCommentSingle = () => {
        LogCommentSingleApi(
            userInfo.id,
            (route.params as { id: number }).id,
        ).then((res) => {
            setLikes(res.data)
        })
    }
    //评价的状态
    const [currentType, setCurrentType] = useState(
        () => (route.params as { likeType: number }).likeType,
    )
    const logComment = (type: number) => {
        LogCommentApi(
            type!,
            userInfo.id,
            (route.params as { id: number }).id,
        ).then((res) => {
            setCurrentType(res.data[2]!)
            setLikes(res.data)
        })
    }
    const getLikes = (type: number) => {
        logComment(type)
    }

    useEffect(() => {
        getCommentSingle()
    }, [])
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View className="flex-1 pl-[10] pr-[10] pt-[10] pb-[10] bg-white">
                <View className="flex-row items-center">
                    {RecordDetail.avatar ? (
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 100,
                                marginRight: 10,
                            }}
                            source={{ uri: RecordDetail.avatar }}
                        ></Image>
                    ) : (
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 100,
                                marginRight: 10,
                            }}
                            source={require('../../../../../../../assets/images/bg_welcome_header.png')}
                        ></Image>
                    )}

                    <AutoText
                        fontSize={4.5}
                        style={{
                            fontWeight: 600,
                        }}
                    >
                        {RecordDetail.username}
                    </AutoText>
                </View>
                {/*    内容*/}
                <View className="mt-[10]">
                    <AutoText
                        selectable={true}
                        fontSize={4.6}
                        style={{
                            lineHeight: 22,
                        }}
                    >
                        {RecordDetail.logContent}
                    </AutoText>
                    <View className="flex-row flex-wrap">
                        {RecordDetail.logImages
                            ? (RecordDetail.logImages as string[]).map(
                                  (item, index) => {
                                      return (
                                          <TouchableOpacity key={index}>
                                              <Image
                                                  style={{
                                                      marginTop: 12,
                                                      marginRight: 12,
                                                      width:
                                                          (Dimensions.get(
                                                              'window',
                                                          ).width -
                                                              60) /
                                                          3,
                                                      height: 100,
                                                      borderRadius: 10,
                                                  }}
                                                  source={{ uri: item }}
                                              ></Image>
                                          </TouchableOpacity>
                                      )
                                  },
                              )
                            : null}
                    </View>
                    <AutoText
                        fontSize={4.5}
                        style={{
                            marginTop: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: theme.colors.deep01Primary,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            width:
                                topicId == 1
                                    ? Dimensions.get('window').width / 4.5
                                    : Dimensions.get('window').width / 4,
                            color: theme.colors.deep01Primary,
                        }}
                    >
                        #{topicMap[topicId - 1]}
                    </AutoText>
                </View>
                {/*    饮食圈评论*/}

                <ScrollView
                    className="mt-[15]"
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <AutoText>评论:</AutoText>
                    </View>
                    {comments && (
                        <CommentAll
                            logId={(route.params as { id: number }).id}
                            comments={comments}
                            open={show}
                            width={40}
                            getComment={getComment}
                        ></CommentAll>
                    )}
                </ScrollView>
                {/*    底部固定*/}
            </View>
            {/*底部固定*/}
            <View className="flex-row bg-[#E0EDDC] h-[90] pl-[10] pr-[10] pt-[20]">
                <TouchableOpacity
                    onPress={() => show()}
                    style={{
                        height: 35,
                        flex: 1,
                    }}
                >
                    <TextInput
                        editable={false}
                        placeholder={'说点什么...'}
                        style={{
                            borderWidth: 1,
                            borderRadius: 20,
                            height: 35,
                            backgroundColor: 'white',
                            borderColor: 'white',
                            flex: 1,
                            fontSize: 12,
                            paddingHorizontal: 2,
                            marginRight: 10,
                        }}
                    ></TextInput>
                </TouchableOpacity>

                <View className="flex-row">
                    <TouchableOpacity
                        onPress={() => {
                            getLikes(2)
                        }}
                        className="bg-white pl-[10] pr-[10] pt-[3] pb-[3] h-[35] justify-center"
                        style={{
                            borderRadius: 20,
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
                            要少吃{likes ? likes[1] : null}人
                        </AutoText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            getLikes(1)
                        }}
                        className="bg-white pl-[10] pr-[10] pt-[3] pb-[3] h-[35] justify-center
                        "
                        style={{
                            borderRadius: 20,
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
                            点个赞{likes ? likes[0] : null}人
                        </AutoText>
                    </TouchableOpacity>
                </View>
            </View>
            {/*    显示底部发表评论的*/}
            <BottomSheet isVisible={isShow}>
                <Card
                    containerStyle={{
                        paddingHorizontal: 0,
                        marginHorizontal: 0,
                        paddingVertical: 0,
                        width: '100%',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        height: Dimensions.get('window').height / 2.5,
                    }}
                >
                    <View
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: theme.colors.secondary,
                        }}
                    >
                        <TouchableOpacity
                            className="flex-row justify-end"
                            onPress={() => disShow()}
                            style={{}}
                        >
                            <Icon
                                type={'antdesign'}
                                name={'close'}
                                size={20}
                            ></Icon>
                        </TouchableOpacity>
                    </View>

                    {/*    评论*/}
                    <TextInput
                        value={text}
                        onChangeText={(value) => setText(value)}
                        style={{
                            paddingHorizontal: 10,
                            backgroundColor: theme.colors.secondary,
                        }}
                        ref={textInputRef}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical={'top'}
                        placeholder={'请输入评论'}
                    ></TextInput>
                    <View className="m-auto mt-[20]">
                        <Button
                            onPress={() => {
                                uploadComment()
                            }}
                            title="发送"
                            containerStyle={{
                                borderRadius: 20,
                                width: Dimensions.get('window').width / 2.5,
                            }}
                            color={theme.colors.deep01Primary}
                        ></Button>
                    </View>
                </Card>
            </BottomSheet>
        </View>
    )
}

export default memo(CommunicateDetail)
