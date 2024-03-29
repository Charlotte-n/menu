import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'
import SearchFilter from './components/search'
import HotRecommend from '../../components/hot-recommend'
import RecipeCategory from './components/recipe-catory'
import FoodCategoryByTime from './components/food-category'
import { ScrollView } from 'react-native'
import { getRandomRecipeApi } from '../../apis/food'
import { SingleFoodListType } from '../../apis/types/food'
import { Skeleton } from '@rneui/base'
import theme from '../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const Diet: FC<IProps> = () => {
    //获取热门菜谱食物
    const [RecipeFood, setRecipeFood] = useState([] as SingleFoodListType[])
    const [loading, setLoading] = useState(true)
    const getRecipeData = async () => {
        setLoading(true)
        const res = await getRandomRecipeApi()
        setRecipeFood(res.data as any)
        setLoading(false)
    }
    return (
        <ScrollView
            style={{ flex: 1, overflow: 'hidden' }}
            className="pl-[20] pr-[20] bg-white"
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        >
            <View>
                <SearchFilter type={'home'} isEdit={false}></SearchFilter>
            </View>
            <View className="mt-[20] mb-[20]">
                <RecipeCategory></RecipeCategory>
            </View>
            <View>
                {loading ? (
                    <View>
                        <View className="flex-row items-center mb-2">
                            <Text
                                style={{
                                    marginRight: 2,
                                    width: 2,
                                    height: 10,
                                    borderWidth: 2,
                                    borderColor: theme.colors.deep01Primary,
                                    borderRadius: 20,
                                }}
                            />
                            <Text
                                className=""
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                热门菜品
                            </Text>
                        </View>
                        {/*骨架屏*/}
                        <View className="flex flex-row justify-around">
                            {[1, 2, 3].map((item) => (
                                <Skeleton
                                    key={item}
                                    animation="wave"
                                    width={89}
                                    height={70}
                                />
                            ))}
                        </View>
                        <View className="flex-row-reverse mt-[10]">
                            <Text>更多 &gt;</Text>
                        </View>
                    </View>
                ) : (
                    <HotRecommend
                        title={'热门菜品'}
                        data={RecipeFood}
                    ></HotRecommend>
                )}
            </View>
            <View style={{ minHeight: 400 }}>
                <FoodCategoryByTime>
                    {{
                        getRecipeData: getRecipeData,
                    }}
                </FoodCategoryByTime>
            </View>
        </ScrollView>
    )
}

export default memo(Diet)
