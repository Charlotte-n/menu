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
interface IProps {
    children?: ReactNode
}

const FoodCategoryByTime: FC<IProps> = () => {
    const [index, setIndex] = React.useState(0)
    const [refresh, setRefresh] = useState(true)
    const pageLoading = useRef(false)
    const [pageLoadingFull, setPageLoadingFull] = useState(false)
    const pageNum = useRef(0)
    const [FoodList, setFoodList] = useState([] as SingleFoodListType[])
    const [FoodNum, setFoodNum] = useState(0)
    const num = useRef(10)
    //上拉加载
    const loadMore = () => {
        if (num.current >= FoodNum) {
            setPageLoadingFull(true)
            return
        }
        //计算有多少个食物
        num.current += 10
        //当这个食物大于总的食物的时候，就返回
        pageLoading.current = true
        pageNum.current += 1
        getFoodList()
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
    const getFoodList = () => {
        const param = {
            pageNum: pageNum.current,
            pageSize: 10,
            category_id: activeId,
        }
        setRefresh(true)
        FoodListByCategoryApi(param).then((res) => {
            setFoodNum((res.data as FoodListByCategoryType).num)
            if (FoodList.length === 0) {
                setFoodList((res.data as FoodListByCategoryType).foods)
            } else {
                setFoodList((prevList) => [
                    ...prevList,
                    ...(res.data as FoodListByCategoryType).foods,
                ])
            }
        })
        setRefresh(false)
    }
    useEffect(() => {
        getFoodList()
    }, [])
    useEffect(() => {
        //恢复默认设置
        num.current = 10
        setPageLoadingFull(false)
        pageNum.current = 0
        setFoodList([])
        getFoodList()
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
                    marginHorizontal: 30,
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
                onChange={setIndex}
                animationType="spring"
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
                    {FoodList.length ? (
                        <FoodTab
                            refresh={refresh}
                            setRefresh={setRefresh}
                            FoodList={FoodList}
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
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={FoodList}
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
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={FoodList}
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
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={FoodList}
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
                        refresh={refresh}
                        setRefresh={setRefresh}
                        FoodList={FoodList}
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
