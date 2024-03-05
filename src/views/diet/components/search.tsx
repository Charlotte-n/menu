import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'
import { FoodListByCategoryApi } from '../../../apis/food'
import { FoodListByCategoryType } from '../../../apis/types/food'

interface IProps {
    children?: any
    type: string
    category_id?: number
}

const SearchFilter: FC<IProps> = ({ type, children, category_id }) => {
    const setRecommendShowFood = children?.setRecommendShowFood
    const setSearchFoodResult = children?.setSearchFoodResult
    const setEmpty = children?.setEmpty
    const [search, setSearch] = useState('')
    const navigation = useNavigation()
    const [searchFood, setSearchFood] = useState<FoodListByCategoryType>()
    const clearAll = () => {
        setSearch('')
    }
    //获取到图片
    const gotoCamera = () => {
        //@ts-ignore
        navigation.navigate('camera')
    }
    //获取到搜索的食物
    const searchFoodData = () => {
        FoodListByCategoryApi({ title: search }).then((res: any) => {
            setRecommendShowFood(false)
            //什么也没有搜索到
            if (res.data.length === 0) {
                setEmpty(true)
            } else {
                setEmpty(false)
            }
            setSearchFoodResult(res.data as FoodListByCategoryType)
        })
    }
    //种类 + 文字搜索食物
    const searchFoodByCategoryTitle = (category: number) => {
        FoodListByCategoryApi({ title: search, category_id: category }).then(
            (res: any) => {
                setEmpty(false)
                if (res.data.length === 0) {
                    //搜索为空的时候
                    setEmpty(true)
                }
                setSearchFoodResult(res.data as FoodListByCategoryType)
            },
        )
    }
    const searchFoodByCategory = (category: number) => {
        FoodListByCategoryApi({ category_id: category }).then((res) => {
            setEmpty(false)
            setSearchFoodResult(res.data)
        })
    }

    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderColor: '#E1E1E1',
                borderStyle: 'solid',
                borderWidth: 1,
            }}
            className="flex-row items-center pl-[13] pr-[13] pt-[10] pb-[10]  rounded-[10px]"
        >
            <TouchableOpacity
                onPress={() => {
                    if (type === 'search') {
                        if (search) {
                            searchFoodData()
                        }
                    }
                    if (type === 'category') {
                        if (search) {
                            searchFoodByCategoryTitle(category_id as number)
                        } else {
                            searchFoodByCategory(category_id as number)
                        }
                    }
                }}
            >
                <Icon
                    name={'search'}
                    type={'fontAwesome'}
                    color={theme.colors.deep01Primary}
                    style={{
                        marginRight: 10,
                    }}
                ></Icon>
            </TouchableOpacity>
            {/*搜索栏*/}
            <TextInput
                placeholder={'搜索相关菜品食物的热量'}
                style={{
                    width: (Dimensions.get('screen').width - 40) / 1.4,
                }}
                onChangeText={(value) => setSearch(value)}
                value={search}
                onFocus={() => {
                    if (type === 'home') {
                        //@ts-ignore
                        navigation.navigate('search')
                    }
                }}
            ></TextInput>
            {search && (
                <TouchableOpacity onPress={() => clearAll()}>
                    <Icon
                        name={'close'}
                        type={'FontAwesome'}
                        color={theme.colors.deep01Primary}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            )}
            {type === 'search' && search === '' ? (
                <TouchableOpacity
                    onPress={() => {
                        gotoCamera()
                    }}
                >
                    <Icon
                        name={'camera'}
                        type={'entypo'}
                        color={theme.colors.deep01Primary}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

export default memo(SearchFilter)
