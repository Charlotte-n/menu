import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Card } from '@rneui/themed'
import { SingleDish } from '../../apis/types/food'
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
interface IProps {
    children?: ReactNode
    data: SingleDish
}

const FoodCard: FC<IProps> = ({ data }) => {
    const navigation = useNavigation()
    const gotoRecipeDetail = () => {
        //@ts-ignore
        navigation.navigate('food-detail', { id: data.id })
    }
    return (
        <TouchableOpacity
            onPress={() => {
                gotoRecipeDetail()
            }}
        >
            <Card
                containerStyle={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                }}
                wrapperStyle={{
                    backgroundColor: 'white',
                }}
            >
                {data.image ? (
                    <Image
                        source={{ uri: data.image as string }}
                        style={{
                            width: '100%',
                            height: 150,
                        }}
                        resizeMode="stretch"
                        borderRadius={10}
                    ></Image>
                ) : null}

                <Text
                    style={{ fontSize: 16, fontWeight: '800' }}
                    className="mt-[10]"
                >
                    {data.name.trim()}
                </Text>
            </Card>
        </TouchableOpacity>
    )
}

export default memo(FoodCard)
