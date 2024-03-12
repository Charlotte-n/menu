import FoodCard from '../../components/food-card'
import { ActivityIndicator, ScrollView } from 'nativewind/dist/preflight'
import { RecipeListApi } from '../../apis/food'
import { useAppDispatch, useAppSelector } from '../../store'
import { RecipeListBody } from '../../apis/types/food'
import { shallowEqual } from 'react-redux'
import { changeMealListAction } from '../../store/slice/meal'
import { onMomentumScrollEnd } from '../../utils/load-more'
import { TouchableOpacity, View } from 'react-native'
import { Text } from '@rneui/themed'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import theme from '../../styles/theme/color'

interface IProps {
    children?: any
}

const HealthMeal: FC<IProps> = () => {
    const pageLoading = useRef(false)
    const [pageLoadingFull, setPageLoadingFull] = useState(true)
    const pageNum = useRef(1)
    const num = useRef(10)
    const dispatch = useAppDispatch()
    const [refresh, setRefresh] = useState(true)
    const { MealList } = useAppSelector((state) => {
        return {
            MealList: state.MealSlice.mealList,
        }
    }, shallowEqual)
    //加载更多食物
    const loadMore = () => {
        if (num.current >= 100) {
            setPageLoadingFull(true)
            return
        }
        //计算有多少个食物
        num.current += 10
        pageLoading.current = true
        pageNum.current += 1
        getRecipeList()
        pageLoading.current = false
    }

    //获取食谱列表
    const getRecipeList = (type?: string) => {
        let data: RecipeListBody = {
            pageNum: pageNum.current,
            pageSize: 10,
        }
        setRefresh(true)
        RecipeListApi(data).then((res) => {
            if (type) {
                dispatch(changeMealListAction(res.data.dishes))
                //进行重置
                pageNum.current = 1
                setPageLoadingFull(false)
                num.current = 10
                setRefresh(false)
                return
            }
            if (MealList.length == 0) {
                dispatch(changeMealListAction(res.data.dishes))
            } else {
                dispatch(
                    changeMealListAction([
                        ...new Set([...MealList, ...res.data.dishes]),
                    ]),
                )
            }
        })
        setRefresh(false)
    }
    useEffect(() => {
        getRecipeList()
    }, [])
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={(event) => {
                onMomentumScrollEnd(
                    event,
                    {
                        pageLoading: pageLoading.current,
                        pageLoadingFull: pageLoadingFull,
                    },
                    loadMore,
                )
            }}
            refreshControl={
                <RefreshControl
                    tintColor={theme.colors.deep01Primary}
                    colors={[theme.colors.deep01Primary]} //ios
                    refreshing={refresh}
                    onRefresh={() => {
                        //得到
                        getRecipeList('refresh')
                    }}
                />
            }
        >
            {MealList.map((item, index) => {
                return <FoodCard key={index} data={item}></FoodCard>
            })}

            {/*    加载更多*/}
            {MealList.length ? (
                <View
                    style={{
                        height: 40,
                        zIndex: 10,
                        paddingTop: 10,
                    }}
                >
                    {pageLoadingFull ? (
                        <Text
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            没有更多了
                        </Text>
                    ) : pageLoading.current ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                loadMore()
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>更多...</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : null}
        </ScrollView>
    )
}

export default memo(HealthMeal)
