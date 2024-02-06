import React, { memo, useState } from 'react'
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

interface IProps {
    children?: ReactNode
}

const FoodCategory: FC<IProps> = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <View className="flex-row">
            <View
                className="bg-white"
                style={{
                    height: Dimensions.get('screen').height,
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            className="pl-[30] pr-[30] pt-[20] pb-[20]"
                            style={index === activeIndex ? styles.active : null}
                            onPress={() => {
                                setActiveIndex(index)
                            }}
                        >
                            <Text>谷类</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View
                className="ml-[10] mt-[5]"
                style={{
                    width: 250,
                }}
            >
                <SearchFilter type={''}></SearchFilter>
                <View className="mt-[10]">
                    <FoodContent></FoodContent>
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
