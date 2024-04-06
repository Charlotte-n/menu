import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import AutoText from '../../../../../components/auto-text'
import CommentSingle from '../../../../diet/c-pages/food-detail/components/comment-single'
import { FoodCommentSingleData } from '../../../../../apis/types/food'

interface IProps {
    children?: ReactNode
}

const CommunicateComment: FC<IProps> = () => {
    const data = {
        avatar: '',
        content: '我是减肥标兵',
        username: '用户啊',
    } as FoodCommentSingleData
    return (
        <View>
            <AutoText
                style={{
                    fontWeight: 700,
                }}
            >
                评论 24
            </AutoText>
            {/*	评论的内容*/}
            <View className="mt-[10]">
                <CommentSingle data={data} width={30}></CommentSingle>
            </View>
        </View>
    )
}

export default memo(CommunicateComment)
