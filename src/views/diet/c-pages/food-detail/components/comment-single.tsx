import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, View } from 'react-native'
import AutoText from '../../../../../components/auto-text'
import {
    FoodCommentChildren,
    FoodCommentSingleData,
} from '../../../../../apis/types/food'

interface IProps {
    children?: ReactNode
    data: FoodCommentSingleData | FoodCommentChildren
    width: number
}

const CommentSingle: FC<IProps> = ({ data, width }) => {
    return (
        <View className="flex-row">
            {data.avatar ? (
                <Image
                    style={{
                        width: width,
                        height: width,
                        borderRadius: 100,
                    }}
                    source={{ uri: data.avatar }}
                ></Image>
            ) : null}

            <View className="ml-[10]">
                <AutoText
                    numberOfLines={1}
                    fontSize={5.5}
                    style={{
                        color: '#cccccc',
                        marginBottom: 10,
                    }}
                >
                    {data.username}
                </AutoText>
                <AutoText fontSize={4.8}>{data.content}</AutoText>
            </View>
        </View>
    )
}

export default memo(CommentSingle)
