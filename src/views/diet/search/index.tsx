import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import SearchFilter from '../components/search'
import { ScrollView } from 'nativewind/dist/preflight'
import OverViewFood from './components/show-food'
import HotRecommend from '../../../components/hot-recommend'
import SearchResult from './components/search-result'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../../apis/types/food'
import Empty from './components/empty'
import { FoodListByCategoryApi } from '../../../apis/food'
import { randomFood } from '../../../apis/diet'
import { RandomFoodDataType } from '../../../apis/types/diet'

interface IProps {
    children?: ReactNode
}

const Search: FC<IProps> = () => {
    const [showRecommendFood, setRecommendShowFood] = useState(true)
    const [searchFoodResult, setSearchFoodResult] = useState(
        [] as SingleFoodListType[],
    )
    const [empty, setEmpty] = useState(false)
    //获取热门菜谱食物
    const [RecipeFood, setRecipeFood] = useState([] as SingleFoodListType[])
    const getRecipeData = () => {
        FoodListByCategoryApi({ category_id: 8 }).then((res) => {
            setRecipeFood((res.data as FoodListByCategoryType).foods)
        })
    }
    //获取随机食物
    const [randomFoodData, setRandomFoodData] = useState(
        [] as RandomFoodDataType[],
    )
    const getRandomFood = () => {
        randomFood().then((res) => {
            setRandomFoodData(res.data)
        })
    }
    useEffect(() => {
        getRecipeData()
        getRandomFood()
    }, [])
    return (
        <ScrollView
            style={{
                flex: 1,
            }}
            className="pl-[20] pr-[20] bg-white"
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <SearchFilter type={'search'}>
                    {{
                        setRecommendShowFood: setRecommendShowFood,
                        setSearchFoodResult,
                        setEmpty: setEmpty,
                    }}
                </SearchFilter>
                {showRecommendFood ? (
                    <View
                        style={{
                            flex: 1,
                            height: 300,
                        }}
                    >
                        <OverViewFood data={randomFoodData}></OverViewFood>
                    </View>
                ) : empty ? (
                    <Empty></Empty>
                ) : (
                    <View className="mt-[20]  flex-1 min-h-[300]">
                        <SearchResult
                            FoodData={searchFoodResult}
                        ></SearchResult>
                    </View>
                )}

                <View
                    style={{
                        flex: 2,
                        marginTop: 10,
                    }}
                >
                    <HotRecommend
                        title={'热门菜品'}
                        data={RecipeFood}
                    ></HotRecommend>
                </View>
            </View>
        </ScrollView>
    )
}

export default memo(Search)
