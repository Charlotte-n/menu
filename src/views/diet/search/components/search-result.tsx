import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import theme from '../../../../styles/theme/color'
import { Icon } from '@rneui/themed'
import { FoodListByCategoryType } from '../../../../apis/types/food'
import AutoText from '../../../../components/auto-text'
import RecordFood from '../../../../components/record-food'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: ReactNode
    FoodData: FoodListByCategoryType
}

const SearchResult: FC<IProps> = ({ FoodData }) => {
    const [showEdit, setShowEdit] = useState(false)
    const [id, setId] = useState(0)
    const navigation = useNavigation()
    const handleEdit = (id: number) => {
        setId(id)
        setShowEdit(true)
    }
    const gotoFoodDetail = () => {
        //@ts-ignore
        navigation.navigate('food-nutrients', { id })
    }
    return (
        <View>
            <AutoText fontSize={5} style={{ marginBottom: 10 }}>
                食物
            </AutoText>
            {/*显示搜索结果*/}
            {FoodData.map((item) => {
                return (
                    <TouchableOpacity
                        onPress={() => gotoFoodDetail()}
                        key={item.id}
                        className="flex-row justify-between items-center border rounded mb-[10] pt-[10] pb-[10] pl-[5] pr-[5]"
                        style={{ borderColor: theme.colors.primary }}
                    >
                        <View>
                            <AutoText
                                fontSize={4.5}
                                numberOfLines={1}
                                style={{
                                    width: 200,
                                    marginBottom: 5,
                                }}
                            >
                                {item.title}
                            </AutoText>
                            <AutoText fontSize={4}>
                                {item.calories?.toFixed(2)}Kcal/100g
                            </AutoText>
                        </View>
                        <View className="flex-row items-center">
                            <AutoText
                                fontSize={4}
                                style={{
                                    paddingHorizontal: 10,
                                }}
                            >
                                100g
                            </AutoText>
                            <TouchableOpacity
                                onPress={() => handleEdit(item.id)}
                            >
                                <Icon
                                    type={'antdesign'}
                                    name={'pluscircle'}
                                    size={18}
                                    color={theme.colors.deep01Primary}
                                ></Icon>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            })}
            {/*记录饮食*/}
            {showEdit ? (
                <RecordFood isVisible={showEdit} id={id}>
                    {{
                        cancel: () => {
                            setShowEdit(false)
                        },
                    }}
                </RecordFood>
            ) : null}
        </View>
    )
}

export default memo(SearchResult)
