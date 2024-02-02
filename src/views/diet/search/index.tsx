import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import SearchFilter from '../components/search'
import { ScrollView } from 'nativewind/dist/preflight'
import OverViewFood from './components/show-food'
import HotRecommend from '../../../components/hot-recommend'

interface IProps {
    children?: ReactNode
}

const Search: FC<IProps> = () => {
    return (
        <ScrollView
            style={{
                flex: 1,
            }}
            className="pl-[20] pr-[20] bg-white"
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <SearchFilter type={'search'}></SearchFilter>
                <View
                    style={{
                        flex: 1,
                        height: 300,
                    }}
                >
                    <OverViewFood></OverViewFood>
                </View>
                <View style={{}}>
                    <HotRecommend></HotRecommend>
                </View>
            </View>
        </ScrollView>
    )
}

export default memo(Search)
