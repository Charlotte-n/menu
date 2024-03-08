import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, View } from 'react-native'
import AutoText from '../../../../components/auto-text'

interface IProps {
    children?: ReactNode
}

const Empty: FC<IProps> = () => {
    return (
        <View
            className="h-[200]"
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                style={{
                    width: 100,
                    height: 100,
                }}
                source={require('../../../../../assets/images/search.png')}
            ></Image>
            <AutoText
                style={{
                    marginTop: 20,
                }}
            >
                没有搜索到该食物
            </AutoText>
        </View>
    )
}

export default memo(Empty)
