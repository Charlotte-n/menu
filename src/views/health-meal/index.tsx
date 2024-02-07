import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Collect from '../mine/collect'

interface IProps {
    children?: ReactNode
}

const HealthMeal: FC<IProps> = () => {
    return <Collect></Collect>
}

export default memo(HealthMeal)
