import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import AutoText from '../../../components/auto-text'
import theme from '../../../styles/theme/color'
import { transformAdaption } from '../../../utils/adaptation'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: ReactNode
    baseData: any
    image: ReactNode
    type?: number
}

const FoodByTime: FC<IProps> = ({ baseData, image, type }) => {
    const { name, recommend } = baseData
    const navigation = useNavigation()
    const gotoFoodCategory = () => {
        //@ts-ignore
        navigation.navigate('category', { type })
    }
    return (
        <View
            className="flex-row items-center border-b"
            style={{
                borderColor: theme.colors.secondary,
                marginTop: transformAdaption(5),
                paddingVertical: transformAdaption(15),
                paddingHorizontal: transformAdaption(5),
            }}
        >
            {image}
            <View className="flex-1">
                <AutoText
                    fontSize={5}
                    style={{
                        marginBottom: 5,
                    }}
                >
                    {name}
                </AutoText>
                <AutoText
                    style={{
                        color: '#B6B5BB',
                    }}
                    fontSize={4.3}
                >
                    推荐{recommend}千卡
                </AutoText>
            </View>
            <TouchableOpacity
                onPress={() => {
                    gotoFoodCategory()
                }}
            >
                <Icon
                    type={'antdesign'}
                    name={'pluscircle'}
                    size={transformAdaption(28)}
                    color={theme.colors.deep01Primary}
                    style={{
                        marginLeft: 5,
                    }}
                ></Icon>
            </TouchableOpacity>
        </View>
    )
}

export default memo(FoodByTime)
