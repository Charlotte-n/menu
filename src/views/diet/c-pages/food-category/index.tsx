import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import SearchFilter from '../../components/search'
import FoodContent from './components/food-content'
import { FoodCategoryApi, FoodListByCategoryApi } from '../../../../apis/food'
import {
    FoodCategoryType,
    FoodListByCategoryType,
} from '../../../../apis/types/food'
import { Skeleton } from '@rneui/base'
import { LinearGradient } from 'react-native-svg'

interface IProps {
    children?: ReactNode
}

const FoodCategory: FC<IProps> = () => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [FoodCategory, setFoodCategory] = useState<FoodCategoryType>(
        [] as FoodCategoryType,
    )
    const [FoodList, setFoodList] = useState([] as FoodListByCategoryType)
    //获取分类列表
    const getFoodCategory = () => {
        FoodCategoryApi().then((res) => {
            setFoodCategory(res.data.slice(0, 8))
        })
    }
    //获取分类下的食物列表
    const getFoodList = () => {
        FoodListByCategoryApi({ category_id: activeIndex }).then((res) => {
            setFoodList(res.data as FoodListByCategoryType)
        })
    }

    useEffect(() => {
        // 获取列表
        getFoodCategory()
        getFoodList()
    }, [])
    useEffect(() => {
        getFoodList()
    }, [activeIndex])

    return (
        <View className="flex-row">
            <View
                className="bg-white"
                style={{
                    height: Dimensions.get('screen').height,
                }}
            >
                {FoodCategory.length !== 0
                    ? FoodCategory.map((item, index) => {
                          return (
                              <TouchableOpacity
                                  key={item.id}
                                  className="pl-[12] pr-[12] pt-[20] pb-[20]"
                                  style={
                                      item.id === activeIndex
                                          ? styles.active
                                          : null
                                  }
                                  onPress={() => {
                                      setActiveIndex(item.id)
                                  }}
                              >
                                  <Text>{item.title}</Text>
                              </TouchableOpacity>
                          )
                      })
                    : new Array(8).fill(0).map((item, index) => (
                          <Skeleton
                              key={index}
                              LinearGradientComponent={LinearGradient}
                              animation="wave"
                              width={94}
                              height={50}
                              style={{
                                  marginBottom: 10,
                              }}
                          ></Skeleton>
                      ))}
            </View>
            <View
                className="ml-[10] mt-[5]"
                style={{
                    width: 250,
                }}
            >
                <SearchFilter type={''}></SearchFilter>
                <View className="mt-[10] mb-[160]">
                    <FoodContent FoodList={FoodList}></FoodContent>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    active: {
        backgroundColor: '#F2F2F2',
    },
})

export default memo(FoodCategory)
