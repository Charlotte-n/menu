import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, Text, View } from 'react-native'
import CommentSingle from '../../components/comment-single'
import { useRoute } from '@react-navigation/native'
import { getCommentByIdApi } from '../../../../../../apis/food'
import { FoodCommentSingleData } from '../../../../../../apis/types/food'
import AutoText from '../../../../../../components/auto-text'

interface IProps {
    children?: ReactNode
}

const CommentsComply: FC<IProps> = () => {
    const route = useRoute()
    const [commentListAll, setCommentListAll] = useState(
        {} as FoodCommentSingleData,
    )
    //根据这个id来获取评论
    const getCommentById = () => {
        getCommentByIdApi((route.params as { id: number }).id).then((res) => {
            setCommentListAll(res.data)
        })
    }
    //根据id来获取这条评论
    useEffect(() => {
        console.log((route.params as { id: number }).id)
        getCommentById()
    }, [])
    return (
        <ScrollView className="bg-white pl-[15] pr-[15] flex-1">
            {/*主要的回复*/}
            {commentListAll.children ? (
                <View className="mt-[15]">
                    <CommentSingle
                        data={commentListAll}
                        width={40}
                    ></CommentSingle>
                    {/*    别人的回复*/}
                    <View className="mt-[20]">
                        <AutoText fontSize={5.5}>
                            共{commentListAll.children?.length}条回复
                        </AutoText>
                        {commentListAll.children.length !== 0
                            ? commentListAll.children.map((item, index) => {
                                  return (
                                      <View className="mt-[15]" key={index}>
                                          <CommentSingle
                                              width={30}
                                              data={item}
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
