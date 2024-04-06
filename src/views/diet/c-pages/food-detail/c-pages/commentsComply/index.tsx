import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Image,
    ScrollView,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import CommentSingle from '../../components/comment-single'
import { useRoute } from '@react-navigation/native'
import { getCommentByIdApi, PostDoLikeApi } from '../../../../../../apis/food'
import { FoodCommentSingleData } from '../../../../../../apis/types/food'
import AutoText from '../../../../../../components/auto-text'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const CommentsComply: FC<IProps> = () => {
    const route = useRoute()
    const [commentListAll, setCommentListAll] = useState(
        {} as FoodCommentSingleData,
    )
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //根据这个id来获取评论
    const getCommentById = () => {
        getCommentByIdApi(
            (route.params as { id: number }).id,
            (route.params as { userid: number }).userid,
        ).then((res) => {
            setCommentListAll(res.data)
        })
    }
    //根据id来获取这条评论
    useEffect(() => {
        getCommentById()
    }, [])

    //#region 点赞
    const doLike = async (commentId: number) => {
        await PostDoLikeApi(userInfo.id, commentId)
        //重新获取评论
        getCommentById()
    }
    //取消点赞

    //#endregion

    return (
        <ScrollView className="bg-white pl-[15] pr-[15] flex-1">
            {/*主要的回复*/}
            {commentListAll.children ? (
                <View className="mt-[15]">
                    <CommentSingle
                        commentId={(route.params as { id: number }).id}
                        data={commentListAll}
                        width={40}
                        doLike={doLike}
                    ></CommentSingle>

                    {/*    别人的回复*/}
                    <View className="mt-[20]">
                        <AutoText fontSize={5.5}>
                            共{commentListAll.children?.length}条回复
                        </AutoText>
                        {commentListAll.children?.length !== 0
                            ? commentListAll.children.map((item, index) => {
                                  return (
                                      <View className="mt-[15]" key={index}>
                                          <CommentSingle
                                              commentId={item.id}
                                              width={30}
                                              data={item}
                                              doLike={doLike}
                                          ></CommentSingle>
                                      </View>
                                  )
                              })
                            : null}
                    </View>
                </View>
            ) : null}
        </ScrollView>
    )
}

export default memo(CommentsComply)
