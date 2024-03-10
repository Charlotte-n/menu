import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import AutoText from '../../../components/auto-text'

interface IProps {
    children?: any
}

const Collect: FC<IProps> = () => {
    return (
        <View className="bg-white flex-1">
            {/*    食物和食谱的分类*/}
            <View>
                <AutoText>食物收藏</AutoText>
            </View>
            <View>
                <AutoText>食谱收藏</AutoText>
            </View>
        </View>
    )
}

export default memo(Collect)
