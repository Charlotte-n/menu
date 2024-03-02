import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import SearchFilter from '../components/search'
import { ScrollView } from 'nativewind/dist/preflight'
import OverViewFood from './components/show-food'
import HotRecommend from '../../../components/hot-recommend'
import SearchResult from './components/search-result'
import { FoodListByCategoryType } from '../../../apis/types/food'

interface IProps {
    children?: ReactNode
}

const Search: FC<IProps> = () => {
    const [showRecommendFood, setRecommendShowFood] = useState(true)
    const [searchFoodResult, setSearchFoodResult] = useState(
        [] as FoodListByCategoryType,
    )
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
                    }}
                </SearchFilter>
                {showRecommendFood ? (
                    <View
                        style={{
                            flex: 1,
                            height: 300,
                        }}
                    >
                        <OverViewFood></OverViewFood>
                    </View>
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
                    <HotRecommend title={'热门菜品'}></HotRecommend>
                </View>
            </View>
        </ScrollView>
    )
}

export default memo(Search)
