import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Collect from '../mine/collect'

interface IProps {
    children?: ReactNode
}

const HealthMeal: FC<IProps> = () => {
    return <Collect></Collect>
}

export default memo(HealthMeal)
