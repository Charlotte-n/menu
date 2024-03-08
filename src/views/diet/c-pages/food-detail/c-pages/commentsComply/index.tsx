import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, Text, View } from 'react-native'
import CommentSingle from '../../components/comment-single'

interface IProps {
    children?: ReactNode
}

const CommentsComply: FC<IProps> = () => {
    return (
        <View>
            {/*主要的回复*/}
            <CommentSingle></CommentSingle>
            {/*    别人的回复*/}
            <View>
                <Text>共2条回复</Text>
                <CommentSingle></CommentSingle>
            </View>
        </View>
    )
}

export default memo(CommentsComply)
