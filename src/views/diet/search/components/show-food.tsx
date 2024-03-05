import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { searchFoodCategory } from '../../../../data/diet'
import theme from '../../../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'
import { RandomFoodDataType } from '../../../../apis/types/diet'

interface IProps {
    children?: ReactNode
    data: RandomFoodDataType[]
}

const OverViewFood: FC<IProps> = ({ data }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View className="flex-row items-center mb-[10]">
                <Text
                    style={{
                        marginRight: 2,
                        width: 2,
                        height: 10,
                        borderWidth: 2,
                        borderColor: theme.colors.deep01Primary,
                        borderRadius: 20,
                    }}
                />
                <Text
                    className=""
                    style={{
                        fontSize: 15,
                    }}
                >
                    食物
                </Text>
            </View>
            <View
                className="flex-row flex-wrap pl-[10] pr-[10]"
                style={{
                    width: Dimensions.get('window').width - 40,
                }}
            >
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                                //@ts-ignore
                                navigation.navigate('food-nutrients', {
                                    id: item.id,
                                })
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                className="mr-[10] mb-[10] pl-[8] pr-[8] pt-[5] pb-[5] bg-[#E1E1E1]"
                                style={{
                                    ...(index === data.length - 1 && {
                                        marginRight: 0,
                                    }),
                                    borderRadius: 32,
                                    maxWidth: 200,
                                }}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    food: {},
})

export default memo(OverViewFood)
