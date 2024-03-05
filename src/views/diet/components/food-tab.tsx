import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import theme from '../../../styles/theme/color'
import { ActivityIndicator } from 'nativewind/dist/preflight'
import { Text } from '@rneui/themed'
import { SingleFoodListType } from '../../../apis/types/food'
import { Item } from './food-category'
import { onMomentumScrollEnd } from '../../../utils/load-more'

interface IProps {
    children?: any
    refresh: boolean
    setRefresh: any
    FoodList: SingleFoodListType[]
    pageLoadingFull: boolean
    pageLoading: any
}

const FoodTab: FC<IProps> = ({
    refresh,
    setRefresh,
    FoodList,
    pageLoadingFull,
    pageLoading,
    children,
}) => {
    const { getFoodList } = children
    const { loadMore } = children
    return (
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
                            getFoodList()
                            setRefresh(false)
                        }}
                    />
                }
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
            >
                {FoodList.length ? (
                    FoodList.map((item, index) => (
                        <Item key={index} data={item}></Item>
                    ))
                ) : (
                    <ActivityIndicator
                        className="h-[300]"
                        size="large"
                        color={theme.colors.deep01Primary}
                    />
                )}
                <View
                    style={{
                        height: 80,
                        zIndex: 10,
                        paddingTop: 10,
                        marginBottom: 10,
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
            </ScrollView>
        </View>
    )
}

export default memo(FoodTab)
