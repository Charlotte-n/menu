import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
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
            <AutoText>没有搜索到该食物</AutoText>
        </View>
    )
}

export default memo(Empty)
