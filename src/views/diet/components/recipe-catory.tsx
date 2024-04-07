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
import { useNavigation } from '@react-navigation/native'
interface IProps {
    children?: ReactNode
}

const RecipeCategory: FC<IProps> = () => {
    const navigation = useNavigation()
    const Item = ({ image, name, index }: any) => {
        return (
            <TouchableOpacity
                style={{
                    width: Dimensions.get('screen').width / 5,
                }}
                className="flex-col justify-center items-center"
                onPress={() => {
                    //@ts-ignore
                    navigation.navigate('category', {
                        activeIndex: index,
                        type: 0,
                    })
                }}
            >
                {image}
                <Text style={{ fontSize: 13, textAlign: 'center' }}>
                    {name}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View className="flex-row">
            <FlatList
                data={FoodCategory}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Item image={item.icon} name={item.name} index={item.id} />
                )}
                horizontal={true}
                keyExtractor={(item) => String(item.id)}
            ></FlatList>
        </View>
    )
}

export default memo(RecipeCategory)
