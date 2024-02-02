import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import FoodCard from '../../../components/food-card'
import { ScrollView } from 'nativewind/dist/preflight'

interface IProps {
    children?: ReactNode
}

const Collect: FC<IProps> = () => {
    const res = [1, 2, 3, 4]
    return (
        <ScrollView>
            {res.map((item, index) => {
                return <FoodCard key={index}></FoodCard>
            })}
        </ScrollView>
    )
}

export default memo(Collect)
