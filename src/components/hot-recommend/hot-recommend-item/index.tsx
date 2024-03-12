import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { SingleFoodListType } from '../../../apis/types/food'
import AutoText from '../../auto-text'

interface IProps {
    children?: ReactNode
    data: any
}

const HotRecommendItem: FC<IProps> = ({ data }) => {
    return (
        <View>
            <Image
                source={{
                    uri: data.image,
                }}
                style={{
                    height: 60,
                    width: 88,
                    borderRadius: 10,
                }}
            ></Image>
            <AutoText
                numberOfLines={2}
                fontSize={4}
                style={{
                    fontSize: 11,
                    marginTop: 5,
                    width: Dimensions.get('window').width / 4,
                }}
            >
                {data.name?.trim()}
            </AutoText>
        </View>
    )
}

export default memo(HotRecommendItem)
