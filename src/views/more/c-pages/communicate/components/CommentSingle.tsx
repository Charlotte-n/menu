import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'

interface IProps {
    children?: ReactNode
}

const CommentSingle: FC<IProps> = () => {
    return <View></View>
}

export default memo(CommentSingle)
