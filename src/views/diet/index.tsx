import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import SearchFilter from './components/search'
import HotRecommend from '../../components/hot-recommend'
import RecipeCategory from './components/recipe-catory'
import FoodCategoryByTime from './components/food-category'
import { ScrollView } from 'react-native'
import { FoodListByCategoryApi } from '../../apis/food'
import { FoodListByCategoryType } from '../../apis/types/food'
interface IProps {
    children?: ReactNode
}

const Diet: FC<IProps> = () => {
    //获取热门菜谱食物
    const [RecipeFood, setRecipeFood] = useState([] as FoodListByCategoryType)
    const getRecipeData = () => {
        FoodListByCategoryApi({ category_id: 8 }).then((res) => {
            setRecipeFood(res.data as FoodListByCategoryType)
        })
    }
    useEffect(() => {
        getRecipeData()
    }, [])
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
                <HotRecommend
                    title={'热门菜品'}
                    data={RecipeFood}
                ></HotRecommend>
            </View>
            <View style={{ minHeight: 400 }}>
                <FoodCategoryByTime></FoodCategoryByTime>
            </View>
        </ScrollView>
    )
}

export default memo(Diet)
