import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import AutoText from '../../../components/auto-text'
import theme from '../../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: any
}

const Collect: FC<IProps> = () => {
    enum TYPE {
        FOOD = 0,
        RECIPE = 1,
    }
    //跳转到页面
    const navigation = useNavigation()
    const gotoRecipeCollect = (type: number) => {
        //@ts-ignore
        navigation.navigate('RecipeCollect', { type })
    }
    return (
        <View className="bg-white flex-1 pl-[15] pr-[15] pt-[15]">
            {/*    食物和食谱的分类*/}
            <TouchableOpacity
                className="h-[80] w-[100%] justify-center item-center mb-[20] pl-[10]"
                style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: theme.colors.deep01Primary,
                }}
                onPress={() => {
                    gotoRecipeCollect(TYPE.FOOD)
                }}
            >
                <AutoText>食物收藏</AutoText>
            </TouchableOpacity>
            <TouchableOpacity
                className="h-[80] w-[100%] justify-center item-center pl-[10]"
                style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: theme.colors.deep01Primary,
                }}
                onPress={() => {
                    gotoRecipeCollect(TYPE.RECIPE)
                }}
            >
                <AutoText>食谱收藏</AutoText>
            </TouchableOpacity>
        </View>
    )
}

export default memo(Collect)
