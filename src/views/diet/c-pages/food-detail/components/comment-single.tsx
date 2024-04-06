import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import AutoText from '../../../../../components/auto-text'
import {
    FoodCommentChildren,
    FoodCommentSingleData,
} from '../../../../../apis/types/food'

interface IProps {
    children?: any
    data: FoodCommentSingleData | FoodCommentChildren
    width: number
    doLike: any
    commentId: number
}

const CommentSingle: FC<IProps> = ({ data, width, doLike, commentId }) => {
    //点赞
    const [isShowZan, setIsShowZan] = useState(false)
    const showZan = () => {
        setIsShowZan(!isShowZan)
    }
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
            ) : (
                <Image
                    style={{
                        width: width,
                        height: width,
                        borderRadius: 100,
                    }}
                    source={require('../../../../../../assets/images/bg_login_header.png')}
                ></Image>
            )}

            <View className="ml-[10] flex-1">
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
                <TouchableOpacity>
                    <AutoText fontSize={4.8}>{data.content}</AutoText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    doLike(commentId)
                }}
                className="flex-row"
            >
                {data.isLike ? (
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            marginTop: 30,
                        }}
                        source={require('../../../../../../assets/icon/zan2.png')}
                    ></Image>
                ) : (
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            marginTop: 30,
                        }}
                        source={require('../../../../../../assets/icon/zan1.png')}
                    ></Image>
                )}
                <AutoText
                    style={{
                        marginTop: 30,
                        marginHorizontal: 10,
                    }}
                >
                    {data.likeNum}
                </AutoText>
            </TouchableOpacity>
        </View>
    )
}

export default memo(CommentSingle)
