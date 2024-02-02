import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'

interface IProps {
    children?: ReactNode
}

const Home: FC<IProps> = () => {
    return (
        <View>
            <Text>首页</Text>
        </View>
    )
}

export default memo(Home)
