import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Tab, TabView } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import { FoodListByCategoryApi } from '../../../apis/food'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../../apis/types/food'
import FoodTab from './food-tab'
import { ActivityIndicator } from 'nativewind/dist/preflight'
import { View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../../store'
import { changeFoodList } from '../../../store/slice/diet'
import { shallowEqual } from 'react-redux'
interface IProps {
    children?: ReactNode
}

const FoodCategoryByTime: FC<IProps> = () => {
    const [index, setIndex] = React.useState(0)
    const [refresh, setRefresh] = useState(true)
    const pageLoading = useRef(false)
    const [pageLoadingFull, setPageLoadingFull] = useState(false)
    const pageNum = useRef(1)
    const [FoodNum, setFoodNum] = useState(0)
    const num = useRef(10)
    //上拉加载
    const loadMore = () => {
        //当这个食物大于总的食物的时候，就返回
        console.log(num.current, FoodNum)
        if (num.current >= FoodNum) {
            setPageLoadingFull(true)
            return
        }
        //计算有多少个食物
        num.current += 10
        pageLoading.current = true
        pageNum.current += 1
        getFoodList(activeId)
        pageLoading.current = false
    }
    //获取食物列表
    const [activeId, setActiveId] = useState(1)
    const activeIds = [
        {
            key: '0',
            id: 1,
        },
        {
            key: '1',
            id: 2,
        },
        {
            key: '2',
            id: 4,
        },
        {
            key: '3',
            id: 5,
        },
        {
            key: '4',
            id: 10,
        },
    ]

    //进行缓存
    const {
        breakFastFoodList,
        lunchFoodList,
        dinnerFoodList,
        fruitFoodList,
        otherFoodList,
    } = useAppSelector((state) => {
        return {
            breakFastFoodList: state.DietSlice.breakFastFoodList,
            lunchFoodList: state.DietSlice.lunchFastFoodList,
            dinnerFoodList: state.DietSlice.dinnerFastFoodList,
            fruitFoodList: state.DietSlice.fruitFoodList,
            otherFoodList: state.DietSlice.otherFoodList,
        }
    }, shallowEqual)
    const dispatch = useAppDispatch()
    const getFoodList = (index: number) => {
        const param = {
            pageNum: pageNum.current,
            pageSize: 10,
            category_id: index,
        }
        let fooList: SingleFoodListType[]
        switch (index) {
            case 1:
                fooList = breakFastFoodList
                break
            case 2:
                fooList = lunchFoodList
                break
            case 4:
                fooList = dinnerFoodList
                break
            case 5:
                fooList = fruitFoodList
                break
            case 10:
                fooList = otherFoodList
                break
        }
        setRefresh(true)
        FoodListByCategoryApi(param).then((res) => {
            setFoodNum((res.data as FoodListByCategoryType).num)
            if (fooList.length === 0) {
                dispatch(
                    changeFoodList({
                        index,
                        foods: (res.data as FoodListByCategoryType).foods,
                    }),
                )
            } else {
                dispatch(
                    changeFoodList({
                        index,
                        foods: [
                            ...new Set([
                                ...new Set([...fooList]),
                                ...(res.data as FoodListByCategoryType).foods,
                            ]),
                        ],
                    }),
                )
            }
        })
        setRefresh(false)
        return 123
    }
    useEffect(() => {
        Promise.all([
            getFoodList(1),
            getFoodList(2),
            getFoodList(4),
            getFoodList(5),
            getFoodList(10),
        ])
    }, [])
    useEffect(() => {
        console.log(pageNum.current)
        //恢复默认设置
        num.current = 10
        setPageLoadingFull(false)
        pageNum.current = 1
    }, [activeId])
    return (
        <>
            <Tab
                value={index}
                onChange={(e) => {
                    setIndex(e)
                    setActiveId(activeIds[e].id)
                }}
                indicatorStyle={{
                    backgroundColor: theme.colors.deep01Primary,
                    width: 20,
                    height: 5,
                    borderRadius: 20,
                    marginHorizontal: 35,
                }}
                scrollable={true}
                containerStyle={{
                    padding: 0,
                }}
                titleStyle={{
                    fontSize: 14,
                    color: 'black',
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
            >
                <Tab.Item title="早餐" />
                <Tab.Item title="午餐" />
                <Tab.Item title="晚餐" />
                <Tab.Item title="蔬菜" />
                <Tab.Item title="其他" />
            </Tab>

            <TabView
                value={index}
                onChange={(e) => {
                    setIndex(e)
                    setActiveId(activeIds[e].id)
                }}
                containerStyle={{
                    marginTop: 10,
                }}
                tabItemContainerStyle={{
                    paddingHorizontal: 8,
                }}
            >
                <TabView.Item
                    style={{
                        width: '100%',
                    }}
                >
                    {/*早餐:奶类*/}
                    {breakFastFoodList.length ? (
                        <FoodTab
                            index={1}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            FoodList={breakFastFoodList}
                            pageLoadingFull={pageLoadingFull}
                            pageLoading={pageLoading}
                        >
                            {{
                                getFoodList: getFoodList,
                                loadMore: loadMore,
                            }}
                        </FoodTab>
                    ) : (
                        <View className="h-[300] justify-center items-center text-center m-auto w-[100%]">
                            <ActivityIndicator
                                size="large"
                                color={theme.colors.deep01Primary}
                            />
                        </View>
                    )}
                </TabView.Item>
                {/*午餐*/}
                <TabView.Item
                    style={{
                        width: '100%',
                        margin: 'auto',
                    }}
                >
                    <FoodTab
                        index={2}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={lunchFoodList}
                        pageLoadingFull={pageLoadingFull}
                        pageLoading={pageLoading}
                    >
                        {{
                            getFoodList: getFoodList,
                            loadMore: loadMore,
                        }}
                    </FoodTab>
                </TabView.Item>
                <TabView.Item
                    style={{
                        width: '100%',
                        margin: 'auto',
                    }}
                >
                    <FoodTab
                        index={4}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={dinnerFoodList}
                        pageLoadingFull={pageLoadingFull}
                        pageLoading={pageLoading}
                    >
                        {{
                            getFoodList: getFoodList,
                            loadMore: loadMore,
                        }}
                    </FoodTab>
                </TabView.Item>

                <TabView.Item
                    style={{
                        width: '100%',
                        margin: 'auto',
                    }}
                >
                    <FoodTab
                        index={5}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={fruitFoodList}
                        pageLoadingFull={pageLoadingFull}
                        pageLoading={pageLoading}
                    >
                        {{
                            getFoodList: getFoodList,
                            loadMore: loadMore,
                        }}
                    </FoodTab>
                </TabView.Item>
                <TabView.Item
                    style={{
                        width: '100%',
                        margin: 'auto',
                    }}
                >
                    <FoodTab
                        index={10}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={otherFoodList}
                        pageLoadingFull={pageLoadingFull}
                        pageLoading={pageLoading}
                    >
                        {{
                            getFoodList: getFoodList,
                            loadMore: loadMore,
                        }}
                    </FoodTab>
                </TabView.Item>
            </TabView>
        </>
    )
}

export default memo(FoodCategoryByTime)
