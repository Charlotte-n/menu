import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { FoodCategory } from '../../../data/diet'
interface IProps {
    children?: ReactNode
}

const RecipeCategory: FC<IProps> = () => {
    const Item = ({ image, name }: any) => {
        return (
            <TouchableOpacity
                style={{
                    width: Dimensions.get('screen').width / 5,
                }}
                className="flex-col justify-center"
            >
                {image}
                <Text style={{ fontSize: 13 }}>{name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View className="flex-row">
            <FlatList
                data={FoodCategory}
                renderItem={({ item }) => (
                    <Item image={item.icon} name={item.name} />
                )}
                horizontal={true}
                keyExtractor={(item) => String(item.id)}
            ></FlatList>
        </View>
    )
}

export default memo(RecipeCategory)
