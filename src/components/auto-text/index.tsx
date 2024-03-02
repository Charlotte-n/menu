import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, PixelRatio, Dimensions } from 'react-native'
import { transformAdaption } from '../../utils/adaptation'

interface IProps {
    children?: ReactNode
    style?: any
    fontSize?: number
}

const AutoText = ({ children, style, fontSize, ...props }: any) => {
    const size = PixelRatio.get() * transformAdaption(fontSize ? fontSize : 5)
    return (
        <Text style={[style, { fontSize: size }]} {...props}>
            {children}
        </Text>
    )
}

export default memo(AutoText)
