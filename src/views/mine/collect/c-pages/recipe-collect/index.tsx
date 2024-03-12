import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { getCollectContentApi } from '../../../../../apis/common'
import { useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import { Card } from '@rneui/themed'
import AutoText from '../../../../../components/auto-text'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RefreshControl } from 'react-native-gesture-handler'
import theme from '../../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const RecipeCollect: FC<IProps> = () => {
    enum Type {
        FOOD = 0,
        RECIPE = 1,
    }

    const [refresh, setRefresh] = useState(true)
    const navigation = useNavigation()
    const route = useRoute()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //获取收藏的食谱信息
    const [dishes, setDishes] = useState<any>()
    const getRecipeCollectData = () => {
        setRefresh(true)
        getCollectContentApi(userInfo.id).then((res) => {
            if ((route.params as { type: number }).type === Type.RECIPE) {
                setDishes(res.data.dishes)
            } else {
                setDishes(res.data.foods)
            }
            setRefresh(false)
        })
    }
    const gotoRecipeDetail = (id: number) => {
        if ((route.params as { type: number }).type === Type.RECIPE) {
            //@ts-ignore
            navigation.navigate('food-detail', { id })
        } else {
            //@ts-ignore
            navigation.navigate('food-nutrients', { id })
        }
    }
    useEffect(() => {
        getRecipeCollectData()
    }, [])
    return (
        <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    tintColor={theme.colors.deep01Primary}
                    colors={[theme.colors.deep01Primary]} //ios
                    refreshing={refresh}
                    onRefresh={() => {
                        getRecipeCollectData()
                    }}
                />
            }
        >
            {dishes?.map((item: any) => {
                return (
                    <Card
                        key={item.id}
                        containerStyle={{
                            borderRadius: 15,
                            marginBottom: 10,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                gotoRecipeDetail(item.id)
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    borderRadius: 15,
                                    marginBottom: 15,
                                }}
                            ></Image>
                            <AutoText>
                                {item.name?.trim() || item.title?.trim()}
                            </AutoText>
                        </TouchableOpacity>
                    </Card>
                )
            })}
        </ScrollView>
    )
}

export default memo(RecipeCollect)
