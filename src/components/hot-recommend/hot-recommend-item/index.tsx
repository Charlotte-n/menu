import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, Text, View } from 'react-native'

interface IProps {
    children?: ReactNode
}

const HotRecommendItem: FC<IProps> = () => {
    return (
        <View>
            <Image
                source={require('../../../../assets/images/bg_welcome_header.png')}
                style={{
                    height: 60,
                    width: 88,
                    borderRadius: 10,
                }}
            ></Image>
            <Text
                style={{
                    fontSize: 14,
                }}
            >
                口水鸡
            </Text>
            <Text
                style={{
                    fontSize: 11,
                }}
            >
                115kcal
            </Text>
        </View>
    )
}

export default memo(HotRecommendItem)
