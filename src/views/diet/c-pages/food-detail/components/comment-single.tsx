import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, View } from 'react-native'
import AutoText from '../../../../../components/auto-text'

interface IProps {
    children?: ReactNode
}

const CommentSingle: FC<IProps> = () => {
    return (
        <View className="flex-row">
            <Image
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                }}
                source={require('../../../../../../assets/images/bg_login_header.png')}
            ></Image>
            <View className="ml-[10]">
                <AutoText
                    numberOfLines={1}
                    fontSize={5.5}
                    style={{
                        color: '#cccccc',
                        marginBottom: 10,
                    }}
                >
                    下厨房用户
                </AutoText>
                <AutoText fontSize={4.8}>可以放陶瓷盘子吗</AutoText>
            </View>
        </View>
    )
}

export default memo(CommentSingle)
