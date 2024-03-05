import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Icon, Tab, TabView, Text } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'nativewind/dist/preflight'
import { onMomentumScrollEnd } from '../../../utils/load-more'
import RecordFood from '../../../components/record-food'
import { FoodListByCategoryApi } from '../../../apis/food'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../../apis/types/food'
import AutoText from '../../../components/auto-text'
import FoodTab from './food-tab'
interface IProps {
    children?: ReactNode
}

export const Item = ({ data }: { data: SingleFoodListType }) => {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <View
            className="flex-row  items-end border rounded mt-[15] pt-[10] pb-[10] pl-[5] pr-[5]"
            style={{ borderColor: theme.colors.primary }}
        >
            <View className="flex-1 flex-row items-center">
                {/*TODO:进行更改默认图片*/}
                {data?.image ? (
                    <Image
                        source={{ uri: data.image }}
                        style={{
                            width: 75,
                            height: 70,
                            borderRadius: 20,
                            marginRight: 10,
                        }}
                    ></Image>
                ) : (
                    <Text>loadings</Text>
                )}
                <View>
                    <AutoText
                        numberOfLines={1}
                        className="w-[50]"
                        style={{
                            width: 120,
                        }}
                    >
                        {data?.title}
                    </AutoText>
                    <Text style={{ fontSize: 12 }}>123Kcal/100g</Text>
                </View>
            </View>
            <View className="flex-row items-center ">
                <Text className="">100g</Text>
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(true)
                    }}
                >
                    <Icon
                        type={'antdesign'}
                        name={'pluscircle'}
                        size={15}
                        color={theme.colors.deep01Primary}
                        style={{
                            marginLeft: 5,
                        }}
                    ></Icon>
                </TouchableOpacity>
            </View>
            {isVisible ? (
                <RecordFood isVisible={isVisible} id={414}>
                    {{
                        cancel: () => {
                            setIsVisible(false)
                        },
                    }}
                </RecordFood>
            ) : null}
        </View>
    )
}
const FoodCategoryByTime: FC<IProps> = () => {
    const [index, setIndex] = React.useState(0)
    const [refresh, setRefresh] = useState(false)
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
            id: 4,
        },
        {
            key: '5',
            id: 10,
        },
    ]
    const getFoodList = () => {
        const param = {
            pageNum: pageNum.current,
            pageSize: 10,
            category_id: activeId,
        }
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
                    marginHorizontal: 15,
                }}
                scrollable={true}
                containerStyle={{
                    padding: 0,
                }}
                titleStyle={{
                    fontSize: 14,
                    color: 'black',
                    paddingHorizontal: 0,
                    paddingRight: 20,
                }}
            >
                <Tab.Item title="早餐" />
                <Tab.Item title="午餐" />
                <Tab.Item title="晚餐" />
                <Tab.Item title="小清新" />
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
                {/*午餐*/}
                <TabView.Item
                    style={{
                        width: '100%',
                        overflow: 'hidden',
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
                <TabView.Item style={{ width: '100%' }}>
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
                <TabView.Item style={{ width: '100%' }}>
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
                <TabView.Item style={{ width: '100%' }}>
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
                <TabView.Item style={{ width: '100%' }}>
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
