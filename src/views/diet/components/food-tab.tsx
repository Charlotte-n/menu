import React, { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import theme from '../../../styles/theme/color'
import { ActivityIndicator } from 'nativewind/dist/preflight'
import { Icon, Text } from '@rneui/themed'
import { SingleFoodListType } from '../../../apis/types/food'
import { onMomentumScrollEnd } from '../../../utils/load-more'
import AutoText from '../../../components/auto-text'
import RecordFood from '../../../components/record-food'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: any
    refresh: boolean
    setRefresh: any
    FoodList: SingleFoodListType[]
    pageLoadingFull: boolean
    pageLoading: any
    index: number
}

export const Item = ({ data }: { data: SingleFoodListType }) => {
    const [isVisible, setIsVisible] = useState(false)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => {
                //@ts-ignore
                navigation.navigate('food-nutrients', {
                    id: data.id,
                })
            }}
        >
            <View
                className="flex-row  items-end border rounded mt-[15] pt-[10] pb-[10] pl-[5] pr-[5]"
                style={{ borderColor: theme.colors.primary }}
            >
                <View className="flex-1 flex-row items-center">
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
                        <Text style={{ fontSize: 12 }}>
                            {data?.calories}Kcal/100g
                        </Text>
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
                            size={20}
                            color={theme.colors.deep01Primary}
                            style={{
                                marginLeft: 5,
                            }}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                {isVisible ? (
                    <RecordFood isVisible={isVisible} id={data.id as number}>
                        {{
                            cancel: () => {
                                setIsVisible(false)
                            },
                        }}
                    </RecordFood>
                ) : null}
            </View>
        </TouchableOpacity>
    )
}
const FoodTab: FC<IProps> = ({
    refresh,
    FoodList,
    pageLoadingFull,
    pageLoading,
    children,
    index,
}) => {
    const { getFoodList } = children
    const { loadMore } = children

    return (
        <View>
            <ScrollView
                className="overflow-hidden"
                style={{
                    height: Dimensions.get('window').height - 400,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        tintColor={theme.colors.deep01Primary}
                        colors={[theme.colors.deep01Primary]} //ios
                        refreshing={refresh}
                        onRefresh={() => {
                            getFoodList(index, 'refresh')
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
                        <Item data={item} key={index}></Item>
                    ))
                ) : (
                    <ActivityIndicator
                        className="h-[240] overflow-hidden"
                        size="large"
                        color={theme.colors.deep01Primary}
                    />
                )}
                {FoodList.length ? (
                    <View
                        style={{
                            height: 50,
                            zIndex: 10,
                            paddingTop: 5,
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
                                <Text style={{ textAlign: 'center' }}>
                                    更多...
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : null}
            </ScrollView>
        </View>
    )
}

export default memo(FoodTab)
