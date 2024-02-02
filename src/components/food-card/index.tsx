import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View, Image } from 'react-native'
import { Card } from '@rneui/themed'
interface IProps {
    children?: ReactNode
}

const FoodCard: FC<IProps> = () => {
    return (
        <View>
            <Card
                containerStyle={{
                    borderRadius: 10,
                }}
            >
                <Image
                    source={require('../../../assets/images/bg_welcome_header.png')}
                    style={{
                        width: '100%',
                        height: 150,
                    }}
                    resizeMode="stretch"
                    borderRadius={10}
                ></Image>
                <Text
                    style={{ fontSize: 16, fontWeight: '800' }}
                    className="mt-[10]"
                >
                    鲜蔬乳酪鸡
                </Text>
                <Text style={{ fontSize: 12, color: '#666' }}>451kcal/份</Text>
            </Card>
        </View>
    )
}

export default memo(FoodCard)
