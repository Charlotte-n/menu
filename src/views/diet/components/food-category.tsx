import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native'
import { Icon, Tab, TabView, Text } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import { RefreshControl } from 'react-native-gesture-handler'
import { ActivityIndicator} from 'nativewind/dist/preflight'
import { onMomentumScrollEnd } from '../../../utils/load-more'
interface IProps {
    children?: ReactNode
}

const Item = () => {
    return (
        <View
            className="flex-row  items-end border rounded mt-[15] pt-[10] pb-[10] pl-[5] pr-[5]"
            style={{ borderColor: theme.colors.primary }}
        >
            <View className="flex-1 flex-row items-center">
                <Image
                    source={require('../../../../assets/images/bg_login_header.png')}
                    style={{
                        width: 75,
                        height: 70,
                        borderRadius: 20,
                        marginRight: 10,
                    }}
                ></Image>
                <View>
                    <Text>米饭</Text>
                    <Text style={{ fontSize: 12 }}>116.00Kcal/100g</Text>
                </View>
            </View>
            <View className="flex-row items-center ">
                <Text className="">100g</Text>
                <Icon
                    type={'antdesign'}
                    name={'pluscircle'}
                    size={15}
                    color={theme.colors.deep01Primary}
                    style={{
                        marginLeft: 5,
                    }}
                ></Icon>
            </View>
        </View>
    )
}
const FoodCategoryByTime: FC<IProps> = () => {
    const [index, setIndex] = React.useState(0)
    const [refresh, setRefresh] = useState(false)
    const pageLoading = useRef(false)
    const pageLoadingFull = useRef(false)
    const Data = [
        {
            title: 'Main dishes',
            data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
            title: 'Sides',
            data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
        {
            title: 'Drinks',
            data: ['Water', 'Coke', 'Beer'],
        },
        {
            title: 'Desserts',
            data: ['Cheese Cake', 'Ice Cream'],
        },
    ]
    //上拉加载
    const loadMore = () => {
        pageLoading.current = true
        console.log(123)
        pageLoadingFull.current = true
        pageLoading.current = false
    }
    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
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
                    <View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    tintColor={theme.colors.deep01Primary}
                                    colors={[theme.colors.deep01Primary]} //ios
                                    refreshing={refresh}
                                    onRefresh={() => {
                                        setRefresh(true)
                                        console.log(123)
                                        setRefresh(false)
                                    }}
                                />
                            }
                        >
                            {[1, 2, 3, 4].map((item) => (
                                <Item key={item}></Item>
                            ))}
                        </ScrollView>
                    </View>
                </TabView.Item>
                <TabView.Item
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <View>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    tintColor={theme.colors.deep01Primary}
                                    colors={[theme.colors.deep01Primary]} //ios
                                    refreshing={refresh}
                                    onRefresh={() => {
                                        setRefresh(true)
                                        console.log(123)
                                        setRefresh(false)
                                    }}
                                />
                            }
                            onScrollEndDrag={(event) => {
                                onMomentumScrollEnd(
                                    event,
                                    {
                                        pageLoading: pageLoading.current,
                                        pageLoadingFull:
                                            pageLoadingFull.current,
                                    },
                                    loadMore,
                                )
                            }}
                        >
                            {[1, 2, 3, 4].map((item) => (
                                <Item key={item}></Item>
                            ))}
                            <View
                                style={{
                                    height: 40,
                                    zIndex: 10,
                                    justifyContent: 'center',
                                }}
                            >
                                {pageLoadingFull.current ? (
                                    <Text style={{ textAlign: 'center' }}>
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
                                        <Text style={{ textAlign: 'center' }}>
                                            更多...
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: 'green', width: '100%' }}
                >
                    <Text h1>Cart</Text>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: 'green', width: '100%' }}
                >
                    <Text h1>Cart</Text>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: 'green', width: '100%' }}
                >
                    <Text h1>Cart</Text>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: 'green', width: '100%' }}
                >
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>
        </>
    )
}

export default memo(FoodCategoryByTime)
