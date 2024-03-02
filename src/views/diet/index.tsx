import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import SearchFilter from './components/search'
import HotRecommend from '../../components/hot-recommend'
import RecipeCategory from './components/recipe-catory'
import FoodCategoryByTime from './components/food-category'
import { ScrollView } from 'react-native'
interface IProps {
    children?: ReactNode
}

const Diet: FC<IProps> = () => {
    return (
        <ScrollView
            style={{ flex: 1, overflow: 'hidden' }}
            className="pl-[20] pr-[20] bg-white"
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        >
            <View>
                <SearchFilter type={'home'}></SearchFilter>
            </View>
            <View className="mt-[20] mb-[20]">
                <RecipeCategory></RecipeCategory>
            </View>
            <View>
                <HotRecommend title={'热门菜品'}></HotRecommend>
            </View>
            <View style={{ minHeight: 400 }}>
                <FoodCategoryByTime></FoodCategoryByTime>
            </View>
        </ScrollView>
    )
}

export default memo(Diet)
